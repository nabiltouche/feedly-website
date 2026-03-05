import { useTranslations } from "next-intl";
import { QrCode, Gamepad2, LineChart } from "lucide-react";

export default function Solution() {
    const t = useTranslations("Solution");

    const cards = [
        {
            title: t("card1Title"),
            text: t("card1Text"),
            icon: <QrCode className="w-8 h-8 text-emerald-400" />,
        },
        {
            title: t("card2Title"),
            text: t("card2Text"),
            icon: <Gamepad2 className="w-8 h-8 text-amber-400" />,
        },
        {
            title: t("card3Title"),
            text: t("card3Text"),
            icon: <LineChart className="w-8 h-8 text-emerald-400" />,
        },
    ];

    return (
        <section id="solution" className="py-32 bg-[#0d1620] relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        {t("title")}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className="group relative p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 overflow-hidden hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-500">
                                {card.icon}
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-slate-900/50 flex items-center justify-center mb-8 border border-slate-700">
                                {card.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                {card.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 w-full h-[500px] -translate-x-1/2 -translate-y-1/2 bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
        </section>
    );
}
