import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.name || !body.email || !body.phone || !body.company || !body.timePref) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Process the scheduling (e.g., save to DB, send to Calendly webhook, etc)
        console.log("New Schedule Request:", body);

        return NextResponse.json({ success: true, message: "Schedule request received successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
