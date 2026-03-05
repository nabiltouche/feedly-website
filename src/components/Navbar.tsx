"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import clsx from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./ui/Logo";

export default function Navbar() {
    const t = useTranslations("Nav");
    const pathname = usePathname();
    const isHome = pathname === "/";
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
                isScrolled ? "bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-800 py-3" : "bg-transparent py-8 border-b border-transparent"
            )}
        >
            <div className="container mx-auto px-6 h-28 flex items-center justify-between">
                {/* LOGO */}
                <Logo />

                {/* CENTER NAV */}
                <nav className="hidden lg:flex gap-8 items-center text-base font-semibold text-slate-300">
                    <Link href={isHome ? "#solution" : "/#solution"} className="hover:text-emerald-400 transition-colors">{t("solution")}</Link>
                    <Link href={isHome ? "#how-it-works" : "/#how-it-works"} className="hover:text-emerald-400 transition-colors">{t("howItWorks")}</Link>
                    <Link href={isHome ? "#businesses" : "/#businesses"} className="hover:text-emerald-400 transition-colors">{t("businesses")}</Link>
                    <Link href={isHome ? "#benefits" : "/#benefits"} className="hover:text-emerald-400 transition-colors">{t("benefits")}</Link>
                    <Link href={isHome ? "#contact" : "/#contact"} className="hover:text-emerald-400 transition-colors">{t("contact")}</Link>
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-6">
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
