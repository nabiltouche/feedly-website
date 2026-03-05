import { NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rateLimit";
import { rdvSchema } from "@/lib/validation";
import { transporter, getMailOptions, checkEmailConfig } from "@/lib/mailer";

export async function POST(req: Request) {
    // 1. Check Rate Limiter
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!applyRateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    try {
        const body = await req.json();

        // 2. Validate input and check Honeypot
        const parsed = rdvSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data", details: parsed.error.issues }, { status: 400 });
        }

        const data = parsed.data;

        // Honeypot check
        if (data.website && data.website.length > 0) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // 3. Prepare Email
        const validConfig = checkEmailConfig();
        if (!validConfig) {
            console.error("Email config missing, cannot send RDV form.");
            return NextResponse.json({ success: true, warning: "Email not sent (missing config)" }, { status: 200 });
        }

        const subject = `Nouveau Rendez-vous planifié - ${data.name}`;
        const messageText = `
Vous avez reçu une nouvelle demande de prise de rendez-vous téléphonique.

--- Détails ---
Nom: ${data.name}
Email: ${data.email}
Téléphone: ${data.phone || "Non renseigné"}
Créneau souhaité: ${data.timeslot}

Message: 
${data.message || "Aucun message"}
        `;

        await transporter.sendMail(getMailOptions(subject, messageText));

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("RDV API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
