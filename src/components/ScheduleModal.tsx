"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { X, Loader2 } from "lucide-react";

export default function ScheduleModal() {
    const t = useTranslations("ScheduleModal");
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setStatus("idle");
        };
        window.addEventListener("open-schedule", handleOpen);
        return () => window.removeEventListener("open-schedule", handleOpen);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/schedule-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            {/* Overlay backdrop with smooth fade in */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog with smooth zoom in */}
            <div
                ref={modalRef}
                className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white tracking-tight">{t("title")}</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 relative min-h-[300px] flex items-center justify-center">
                    {status === "success" ? (
                        <div className="py-8 text-center text-emerald-400 font-medium animate-in zoom-in-50 duration-500 w-full">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                                <svg className="w-10 h-10 animate-[pulse_2s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-xl px-4">{t("success")}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 w-full animate-in fade-in duration-300">
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

                            <div className="space-y-1">
                                <label htmlFor="schedule-phone" className="text-sm font-medium text-slate-300">{t("phone")}</label>
                                <input required id="schedule-phone" name="phone" type="tel" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all placeholder:text-slate-600" />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="schedule-company" className="text-sm font-medium text-slate-300">{t("company")}</label>
                                    <input required id="schedule-company" name="company" type="text" className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2 text-white outline-none transition-all placeholder:text-slate-600" />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="schedule-timePref" className="text-sm font-medium text-slate-300">{t("timePref")}</label>
                                    <select
                                        required
                                        id="schedule-timePref"
                                        name="timePref"
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

                            {status === "error" && (
                                <p className="text-rose-400 text-sm animate-in shake">Une erreur est survenue, veuillez réessayer.</p>
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
                    )}
                </div>
            </div>
        </div>
    );
}
