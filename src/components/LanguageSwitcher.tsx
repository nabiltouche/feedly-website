"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChangeEvent, useTransition } from "react";
import clsx from "clsx";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <div className="relative flex items-center bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 rounded-full px-3 py-1.5 transition-colors">
            <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <select
                defaultValue={locale}
                onChange={onSelectChange}
                disabled={isPending}
                className={clsx(
                    "bg-transparent cursor-pointer outline-none font-bold text-sm text-slate-200 hover:text-white transition-colors appearance-none pr-4",
                    "focus-visible:ring-0",
                    isPending && "opacity-50"
                )}
            >
                <option value="fr" className="text-slate-900 bg-white font-medium">FR</option>
                <option value="en" className="text-slate-900 bg-white font-medium">EN</option>
                <option value="ar" className="text-slate-900 bg-white font-medium">AR</option>
            </select>
            {/* Custom chevron to replace default browser one */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}
