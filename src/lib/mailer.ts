import nodemailer from "nodemailer";

const SMTP_EMAIL = process.env.EMAIL_USER;
const SMTP_PASSWORD = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
    },
});

export const getMailOptions = (subject: string, text: string) => {
    return {
        from: SMTP_EMAIL,
        to: EMAIL_TO,
        subject,
        text,
    };
};

export function checkEmailConfig() {
    if (!SMTP_EMAIL || !SMTP_PASSWORD || !EMAIL_TO) {
        console.warn(
            "⚠️ Email variables (EMAIL_USER, EMAIL_PASS, EMAIL_TO) are not fully configured in your .env.local file. Emails will not be sent."
        );
        return false;
    }
    return true;
}
