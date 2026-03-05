import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage() {
    const t = useTranslations("Footer"); // Reusing Footer translation key for "legal"

    return (
        <main className="min-h-screen flex flex-col pt-32">
            <Navbar />

            <div className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                        {t("legal")}
                    </h1>

                    <div className="space-y-6 text-slate-300 antialiased leading-relaxed">
                        <p className="text-emerald-400 font-medium pb-4 border-b border-slate-800">
                            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Éditeur du site</h2>
                        <p>
                            Le présent site internet, accessible à l’URL <strong>feedly.com</strong> (le "Site"), est édité par :<br /><br />
                            <strong>Feedly SAS</strong>, société par actions simplifiée au capital de 10 000 euros.<br />
                            <strong>Siège social :</strong> 123 Avenue des Champs-Élysées, 75008 Paris, France.<br />
                            <strong>Immatriculation :</strong> RCS de Paris sous le numéro 123 456 789.<br />
                            <strong>Numéro de TVA intracommunautaire :</strong> FR 12 3456789.<br />
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Contact</h2>
                        <p>
                            Pour toute demande de renseignements, vous pouvez contacter l'Éditeur :<br />
                            - Par téléphone : +33 (0)1 23 45 67 89 (du lundi au vendredi de 9h à 18h).<br />
                            - Par e-mail : contact@feedly.com<br />
                            - Par courrier : à l'adresse du siège social indiquée ci-dessus.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Directeur de la publication</h2>
                        <p>
                            Le Directeur de la publication du Site est <strong>M. Jean Dupont</strong>, en sa qualité de Président de Feedly SAS.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Hébergement du site</h2>
                        <p>
                            Le Site est hébergé par la société <strong>Vercel Inc.</strong><br />
                            <strong>Siège social :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA.<br />
                            <strong>Contact :</strong> privacy@vercel.com
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Propriété intellectuelle</h2>
                        <p>
                            La structure générale du Site, ainsi que ses logiciels, textes, images animées ou non, bases de données, sons, savoir-faire, et tous les autres éléments composant le Site sont la propriété exclusive de l'Éditeur ou de ses partenaires. Toute représentation totale ou partielle de ce Site par quelque personne que ce soit, sans l'autorisation expresse de l'Éditeur est interdite et constituerait une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Cookies et données personnelles</h2>
                        <p>
                            La navigation sur le Site est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Pour plus d'informations concernant la manière dont nous traitons vos données personnelles et l'utilisation des cookies, veuillez consulter notre <a href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">Politique de Confidentialité</a>.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Responsabilité</h2>
                        <p>
                            L'Éditeur s'efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
