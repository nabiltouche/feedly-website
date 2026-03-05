import { useTranslations, useLocale } from "next-intl";
import DemoButton from "../ui/DemoButton";

export default function Hero() {
    const t = useTranslations("Hero");
    const locale = useLocale();
    const heroSrc = `/hero/hero-${locale}.png`; // Placeholder for now

    return (
        <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* TEXT */}
                    <div className="space-y-8 relative z-10">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white tracking-tight">
                            {t("title")}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                            {t("subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <DemoButton className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-full transition-transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-emerald-500/20">
                                {t("primaryCTA")}
                            </DemoButton>
                            <a
                                href="#how-it-works"
                                className="group flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-full transition-colors"
                            >
                                {t("secondaryCTA")}
                            </a>
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="relative z-10 w-full aspect-[4/3] md:aspect-[16/10] xl:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/20 bg-slate-800/50 flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                        <img
                            src={heroSrc}
                            alt="Feedly Demo App"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* BACKGROUND GRADIENT DECORATION */}
            <div className="absolute top-1/4 left-1/2 -z-10 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 -z-10 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
