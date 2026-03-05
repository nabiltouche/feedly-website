"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { rdvSchema } from "@/lib/validation";

export default function RdvForm({ onSuccess }: { onSuccess: () => void }) {
    const t = useTranslations("ScheduleModal");
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Zod validation
        const parsed = rdvSchema.safeParse(data);
        if (!parsed.success) {
            setStatus("error");
            setErrorMessage(parsed.error.issues[0].message);
            return;
        }

        try {
            const res = await fetch("/api/forms/rdv", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });

            if (res.ok) {
                onSuccess();
            } else if (res.status === 429) {
                setStatus("error");
                setErrorMessage("Trop de requêtes. Veuillez réessayer plus tard.");
            } else {
                setStatus("error");
                setErrorMessage("Une erreur est survenue lors de la réservation.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Impossible de joindre le serveur.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full animate-in fade-in duration-300">
            {/* Honeypot Field */}
            <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="schedule-name" className="text-sm font-medium text-slate-300">{t("name")}</label>
                    <input required id="schedule-name" name="name" type="text" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all placeholder:text-slate-600" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="schedule-email" className="text-sm font-medium text-slate-300">{t("email")}</label>
                    <input required id="schedule-email" name="email" type="email" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all placeholder:text-slate-600" />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="schedule-phone" className="text-sm font-medium text-slate-300">{t("phone")}</label>
                    <input required id="schedule-phone" name="phone" type="tel" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all placeholder:text-slate-600" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="schedule-timeslot" className="text-sm font-medium text-slate-300">{t("timePref")}</label>
                    <select
                        required
                        id="schedule-timeslot"
                        name="timeslot"
                        defaultValue=""
                        className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2.5 text-white outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled className="text-slate-500">{t("timePref")}...</option>
                        <option value="8h-12h" className="text-slate-900 bg-white">{t("timeSlot1")}</option>
                        <option value="12h-16h" className="text-slate-900 bg-white">{t("timeSlot2")}</option>
                        <option value="16h-20h" className="text-slate-900 bg-white">{t("timeSlot3")}</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="schedule-message" className="text-sm font-medium text-slate-300">Message (Optionnel)</label>
                <textarea id="schedule-message" name="message" rows={3} className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all resize-none"></textarea>
            </div>

            {status === "error" && (
                <p className="text-rose-400 text-sm animate-in shake">{errorMessage}</p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/10"
            >
                {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                {t("submit")}
            </button>
        </form>
    );
}
