import { useTranslations } from "next-intl";
import { TrendingUp, Gift, Sparkles, PieChart } from "lucide-react";

export default function Benefits() {
    const t = useTranslations("Benefits");

    const items = [
        { title: t("benefit1"), icon: <TrendingUp className="w-8 h-8 text-emerald-400" /> },
        { title: t("benefit2"), icon: <Gift className="w-8 h-8 text-amber-400" /> },
        { title: t("benefit3"), icon: <Sparkles className="w-8 h-8 text-emerald-400" /> },
        { title: t("benefit4"), icon: <PieChart className="w-8 h-8 text-amber-400" /> },
    ];

    return (
        <section id="benefits" className="py-32 bg-[#0d1620] relative">
            <div className="container mx-auto px-6 max-w-6xl text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-20 text-white tracking-tight">
                    {t("title")}
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 transition-colors flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-slate-900/60 flex items-center justify-center mb-6 shadow-inner border border-slate-800">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-200 leading-snug">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
