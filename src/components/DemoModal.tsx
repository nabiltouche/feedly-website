"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import DemoForm from "./forms/DemoForm";

export default function DemoModal() {
    const t = useTranslations("Modal");
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-demo", handleOpen);
        return () => window.removeEventListener("open-demo", handleOpen);
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

    // Removed redundant handleSubmit since DemoForm handles it internally

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            {/* Overlay backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog */}
            <div
                ref={modalRef}
                className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white tracking-tight">{t("title")}</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors p-1"
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
                        <DemoForm onSuccess={() => setStatus("success")} />
                    )}
                </div>
            </div>
        </div>
    );
}
