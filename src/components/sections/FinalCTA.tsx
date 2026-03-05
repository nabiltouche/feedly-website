import { useTranslations } from "next-intl";
import ScheduleButton from "../ui/ScheduleButton";

export default function FinalCTA() {
    const t = useTranslations("FinalCTA");

    return (
        <section id="contact" className="py-32 bg-[#0a0f18] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto rounded-[3rem] p-12 md:p-20 bg-emerald-900/20 border border-emerald-500/20 text-center backdrop-blur-md relative overflow-hidden shadow-2xl shadow-emerald-900/20">

                    {/* Inner Glow */}
                    <div className="absolute top-1/2 left-1/2 -z-10 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

                    <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white tracking-tight">
                        {t("title")}
                    </h2>
                    <p className="text-xl text-emerald-100/80 mb-12 max-w-2xl mx-auto">
                        {t("text")}
                    </p>

                    <ScheduleButton
                        id="cta-footer"
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-10 py-5 text-lg rounded-full transition-transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-emerald-500/25"
                    >
                        {t("button")}
                    </ScheduleButton>
                </div>
            </div>
        </section>
    );
}
