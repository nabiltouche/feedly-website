"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Globe, ChevronDown } from "lucide-react";

const LOCALES = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "ar", label: "AR" },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fermer si clic à l'extérieur
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function selectLocale(nextLocale: string) {
        setIsOpen(false);
        if (nextLocale === locale) return;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    const currentLabel = LOCALES.find(l => l.code === locale)?.label || "FR";

    return (
        <div className="relative inline-block text-start" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
                className={clsx(
                    "flex items-center gap-2.5 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 rounded-full px-4 py-2.5 transition-all text-slate-200 hover:text-white font-bold text-sm select-none",
                    isPending && "opacity-50 cursor-not-allowed",
                    isOpen && "bg-slate-800 ring-2 ring-emerald-500/50 border-emerald-500/50"
                )}
            >
                <Globe className="w-4.5 h-4.5 text-emerald-500" />
                <span>{currentLabel}</span>
                <ChevronDown className={clsx("w-4 h-4 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 end-0 w-36 rounded-xl bg-slate-800 border border-slate-700 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <ul className="py-1.5 flex flex-col">
                        {LOCALES.map((l) => (
                            <li key={l.code}>
                                <button
                                    onClick={() => selectLocale(l.code)}
                                    className={clsx(
                                        "w-full text-start px-5 py-3 text-sm font-semibold transition-colors flex items-center gap-3",
                                        locale === l.code ? "text-emerald-400 bg-slate-700/40" : "text-slate-300 hover:bg-slate-700 hover:text-white"
                                    )}
                                >
                                    {l.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
