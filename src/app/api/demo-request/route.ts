import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic server-side validation
        if (!body.name || !body.email || !body.phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // In a real application, save to DB or send via Email/Slack here.
        console.log("New Demo Request:", body);

        return NextResponse.json({ success: true, message: "Demo request received successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
