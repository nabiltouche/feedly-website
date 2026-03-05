import { useTranslations } from "next-intl";
import { XCircle } from "lucide-react";

export default function Problem() {
    const t = useTranslations("Problem");

    const points = [
        t("point1"),
        t("point2"),
        t("point3"),
        t("point4"),
    ];

    return (
        <section id="problem" className="py-24 bg-[#0a0f18] relative border-t border-slate-800/50">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {points.map((point, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 transition-colors hover:border-slate-700"
                        >
                            <XCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 opacity-80" />
                            <p className="text-lg text-slate-300 font-medium">{point}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
