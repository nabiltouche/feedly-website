"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import clsx from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./ui/Logo";

export default function Navbar() {
    const t = useTranslations("Nav");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-800 py-3" : "bg-transparent py-6 border-b border-transparent"
            )}
        >
            <div className="container mx-auto px-6 h-24 flex items-center justify-between">
                {/* LOGO */}
                <Logo />

                {/* CENTER NAV */}
                <nav className="hidden lg:flex gap-8 items-center text-base font-semibold text-slate-300">
                    <a href="#solution" className="hover:text-emerald-400 transition-colors">{t("solution")}</a>
                    <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">{t("howItWorks")}</a>
                    <a href="#businesses" className="hover:text-emerald-400 transition-colors">{t("businesses")}</a>
                    <a href="#benefits" className="hover:text-emerald-400 transition-colors">{t("benefits")}</a>
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-6">
                    <LanguageSwitcher />
                    <a href="#contact" className="hidden md:inline-flex items-center justify-center bg-white hover:bg-slate-200 text-slate-950 text-base font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm">
                        {t("contact")}
                    </a>
                </div>
            </div>
        </header>
    );
}
