import { useTranslations } from "next-intl";

export default function HowItWorks() {
    const t = useTranslations("HowItWorks");

    const steps = [
        t("step1"),
        t("step2"),
        t("step3"),
        t("step4"),
        t("step5"),
    ];

    return (
        <section id="how-it-works" className="py-32 bg-[#0f172a] relative border-t border-slate-800/30">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        {t("title")}
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical line for desktop */}
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-800 -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((step, i) => {
                            const isEven = i % 2 !== 0; // 0-indexed, so 1, 3 are even blocks visually

                            return (
                                <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="md:w-5/12 hidden md:block" />

                                    {/* Number bubble */}
                                    <div className="w-16 h-16 shrink-0 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center relative z-10 text-emerald-400 font-bold text-xl mb-6 md:mb-0 shadow-xl shadow-slate-900/50">
                                        {i + 1}
                                    </div>

                                    <div className="md:w-5/12 w-full">
                                        <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                                            <p className="text-lg text-slate-300 font-medium">
                                                {step}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
