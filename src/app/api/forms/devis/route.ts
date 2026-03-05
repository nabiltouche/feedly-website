import { NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rateLimit";
import { demoDevisSchema } from "@/lib/validation";
import { transporter, getMailOptions, checkEmailConfig } from "@/lib/mailer";

export async function POST(req: Request) {
    // 1. Check Rate Limiter based on simple IP headers
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!applyRateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    try {
        const body = await req.json();

        // 2. Validate input and check Honeypot
        const parsed = demoDevisSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data", details: parsed.error.issues }, { status: 400 });
        }

        const data = parsed.data;

        // Honeypot check: If the hidden 'website' field is filled, it's a bot
        if (data.website && data.website.length > 0) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // 3. Prepare Email
        const validConfig = checkEmailConfig();
        if (!validConfig) {
            console.error("Email environment variables missing, cannot send Demo/Devis form.");
            // We simulate success so UI isn't broken for the developer before env setup
            return NextResponse.json({ success: true, warning: "Email not sent (missing config)" }, { status: 200 });
        }

        const subject = `Nouvelle demande de ${data.type === "demo" ? "Démo" : "Devis"} - ${data.company}`;
        const messageText = `
Vous avez reçu une nouvelle demande de ${data.type === "demo" ? "Démo" : "Devis"}.

--- Détails du prospect ---
Nom: ${data.name}
Email: ${data.email}
Téléphone: ${data.phone || "Non renseigné"}
Entreprise: ${data.company}
Type: ${data.type}

Message: 
${data.message || "Aucun message"}
        `;

        await transporter.sendMail(getMailOptions(subject, messageText));

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Demo API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
