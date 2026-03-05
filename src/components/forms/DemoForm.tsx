"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { demoDevisSchema } from "@/lib/validation";

export default function DemoForm({ onSuccess }: { onSuccess: () => void }) {
    const t = useTranslations("Modal");
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Client-side Zod Validation
        const parsed = demoDevisSchema.safeParse(data);
        if (!parsed.success) {
            setStatus("error");
            setErrorMessage(parsed.error.issues[0].message);
            return;
        }

        try {
            const res = await fetch("/api/forms/devis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });

            if (res.ok) {
                onSuccess(); // Trigger success animation in parent modal
            } else if (res.status === 429) {
                setStatus("error");
                setErrorMessage("Trop de requêtes. Veuillez réessayer plus tard.");
            } else {
                setStatus("error");
                setErrorMessage("Une erreur est survenue lors de l'envoi.");
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
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">{t("name")}</label>
                    <input required id="name" name="name" type="text" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300">{t("email")}</label>
                    <input required id="email" name="email" type="email" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all" />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-slate-300">{t("phone")}</label>
                <input required id="phone" name="phone" type="tel" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="company" className="text-sm font-medium text-slate-300">Entreprise</label>
                    <input required id="company" name="company" type="text" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="type" className="text-sm font-medium text-slate-300">Type de demande</label>
                    <select
                        required
                        id="type"
                        name="type"
                        defaultValue=""
                        className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2.5 text-white outline-none transition-all appearance-none"
                    >
                        <option value="" disabled className="text-slate-500">Choisir...</option>
                        <option value="demo" className="text-slate-900 bg-white">Démo</option>
                        <option value="devis" className="text-slate-900 bg-white">Devis</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message (Optionnel)</label>
                <textarea id="message" name="message" rows={3} className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all resize-none"></textarea>
            </div>

            {status === "error" && (
                <p className="text-rose-400 text-sm animate-in shake">{errorMessage}</p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                {t("submit")}
            </button>
        </form>
    );
}
