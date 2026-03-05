import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Logo from "./ui/Logo";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

                    <div className="text-center md:text-left">
                        <div className="inline-block mb-4">
                            <Logo />
                        </div>
                        <p className="max-w-xs text-sm">
                            {t("description")}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium">
                        <a href="#!" className="hover:text-emerald-400 transition-colors">{t("legal")}</a>
                        <a href="#!" className="hover:text-emerald-400 transition-colors">{t("privacy")}</a>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-slate-900 text-sm text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© {new Date().getFullYear()} Feedly. All rights reserved.</p>

                    <div className="flex gap-4">
                        <Link href="/" locale="fr" className="hover:text-emerald-400 transition-colors">FR</Link>
                        <Link href="/" locale="en" className="hover:text-emerald-400 transition-colors">EN</Link>
                        <Link href="/" locale="ar" className="hover:text-emerald-400 transition-colors">AR</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
