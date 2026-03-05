import { useTranslations } from "next-intl";

export default function Businesses() {
    const t = useTranslations("Businesses");

    const tags: string[] = t.raw("tags");

    return (
        <section id="businesses" className="py-24 bg-[#0a0f18] relative border-t border-slate-800/50">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-14 text-white tracking-tight">
                    {t("title")}
                </h2>

                <div className="flex flex-wrap justify-center gap-4">
                    {tags.map((tag, i) => (
                        <div
                            key={i}
                            className="px-6 py-3 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 font-medium hover:border-emerald-500/50 hover:bg-emerald-900/20 hover:text-emerald-400 transition-all cursor-default shadow-sm"
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
