import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    const t = useTranslations("Footer");

    return (
        <main className="min-h-screen flex flex-col pt-32">
            <Navbar />

            <div className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                        {t("privacy")}
                    </h1>

                    <div className="space-y-6 text-slate-300 antialiased leading-relaxed">
                        <p className="text-emerald-400 font-medium pb-4 border-b border-slate-800">
                            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
                        </p>

                        <p>
                            La présente politique de confidentialité a pour but d'informer les utilisateurs du site <strong>feedly.com</strong> sur la collecte, le traitement et l’utilisation de leurs données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Responsable du traitement</h2>
                        <p>
                            Le responsable du traitement des données à caractère personnel est la société <strong>Feedly SAS</strong>, située au 123 Avenue des Champs-Élysées, 75008 Paris, France. Vous pouvez nous contacter à l'adresse e-mail suivante : <strong>privacy@feedly.com</strong>.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Données collectées</h2>
                        <p>
                            Nous collectons les données suivantes :<br />
                            - <strong>Via les formulaires de contact/démo :</strong> Nom, prénom, adresse e-mail, numéro de téléphone, nom de l'entreprise et la tranche horaire préférée d'appel.<br />
                            - <strong>Lors de la navigation :</strong> Adresse IP, type de navigateur, pages consultées et durée de la visite (via des cookies d'analyse, sous réserve de votre consentement).
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Finalités du traitement</h2>
                        <p>
                            Vos données sont traitées pour les finalités suivantes :<br />
                            - Répondre à vos demandes de démo et planifier des rendez-vous.<br />
                            - Assurer un suivi commercial et vous proposer nos solutions SaaS.<br />
                            - Améliorer l'expérience utilisateur et l'ergonomie de notre plateforme web.<br />
                            - Satisfaire à nos obligations légales et réglementaires.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Durée de conservation</h2>
                        <p>
                            Nous conservons vos données personnelles uniquement pendant la durée strictement nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées, et au maximum pendant <strong>3 ans</strong> à compter de notre dernier contact.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Partage des données</h2>
                        <p>
                            Vos données personnelles ne sont jamais vendues à des tierces parties. Elles peuvent être transmises à nos sous-traitants (par exemple, notre hébergeur Vercel ou des outils CRM internes) uniquement dans le but de réaliser les services visés ci-dessus. Tous nos prestataires sont tenus au respect strict du RGPD.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Vos droits</h2>
                        <p>
                            Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données :<br />
                            - Droit d'accès, de rectification et d'effacement.<br />
                            - Droit à la limitation du traitement et à l'opposition.<br />
                            - Droit à la portabilité des données.<br /><br />
                            Pour exercer ces droits, veuillez envoyer un e-mail à <strong>privacy@feedly.com</strong> avec une pièce d’identité valide. Vous avez également le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Sécurité</h2>
                        <p>
                            Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté au risque afin de protéger vos données contre la destruction, la perte, l'altération ou la divulgation non autorisée.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
