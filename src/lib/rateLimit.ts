// Simple in-memory rate limiting map
// Keys are IP addresses, values are objects containing count and reset time.

interface RateLimitTracker {
    count: number;
    resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitTracker>();

const MAX_REQUESTS = 5; // 5 requests
const WINDOW_MS = 60 * 1000; // per minute

export function applyRateLimit(ip: string): boolean {
    const now = Date.now();
    const tracker = rateLimitMap.get(ip);

    if (!tracker) {
        // First request for this IP
        rateLimitMap.set(ip, {
            count: 1,
            resetAt: now + WINDOW_MS,
        });
        return true;
    }

    // If window expired, reset
    if (now > tracker.resetAt) {
        tracker.count = 1;
        tracker.resetAt = now + WINDOW_MS;
        return true;
    }

    // Inside window, increment and check
    if (tracker.count >= MAX_REQUESTS) {
        return false; // Rate limit exceeded
    }

    tracker.count += 1;
    return true;
}
