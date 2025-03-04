
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { trainers } from "@/data/trainers";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('/lovable-uploads/f662b4c5-66d3-4211-8cbe-970970311a37.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
      }}
    >
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:px-6">
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-guinea-gradient">
              À propos de The Trading Matrix Académie
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Une académie dédiée à l'excellence dans la formation au trading et à l'analyse des marchés financiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-guinea-green">Notre Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Chez The Trading Matrix Académie, notre mission est de démocratiser l'accès aux connaissances financières et de former la prochaine génération de traders professionnels. Nous croyons que chacun devrait avoir la possibilité d'apprendre les compétences nécessaires pour réussir sur les marchés financiers, indépendamment de son expérience ou de ses antécédents.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Nous nous engageons à fournir une éducation de haute qualité, basée sur des méthodes éprouvées et des stratégies qui fonctionnent dans les conditions réelles du marché. Notre approche pédagogique combine théorie et pratique, avec un accent particulier sur la gestion des risques et la psychologie du trading.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-guinea-green">Notre Vision</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Notre vision est de devenir la référence en matière de formation au trading en Afrique de l'Ouest et au-delà. Nous aspirons à créer une communauté de traders disciplinés, informés et rentables qui peuvent naviguer avec confiance dans les complexités des marchés financiers.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Nous visons à transformer la vie de nos étudiants en leur donnant les outils, les connaissances et la confiance nécessaires pour atteindre l'indépendance financière par le trading. Notre objectif ultime est de voir nos diplômés devenir des traders autonomes et rentables, capables de vivre de leur passion pour les marchés.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        <section id="trainers" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-guinea-gradient">
              Nos Formateurs Experts
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez les professionnels expérimentés qui vous guideront dans votre parcours d'apprentissage
            </p>
          </div>

          {trainers.map((trainer, index) => (
            <div 
              key={trainer.id} 
              id={trainer.id}
              className={`mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex items-center gap-8`}
            >
              <div className="md:w-1/3">
                <div className="rounded-2xl overflow-hidden shadow-lg max-w-xs mx-auto">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-guinea-green">{trainer.name}</h3>
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">{trainer.role}</p>
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                    {trainer.bio}
                  </p>
                  {trainer.id === "scriptrader" && (
                    <>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Scriptrader a commencé sa carrière de trader en 2016 et s'est rapidement distingué par sa maîtrise exceptionnelle de l'analyse technique. Sa capacité à identifier les configurations de prix et à prévoir les mouvements du marché lui a valu une reconnaissance dans la communauté du trading.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Spécialisé dans le trading des paires de devises majeures et des indices, Scriptrader a développé une méthodologie unique qui combine les principes de l'analyse technique traditionnelle avec des indicateurs avancés et l'étude du sentiment du marché.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        En tant que formateur à The Trading Matrix Académie, il partage sa passion pour les graphiques et aide les étudiants à maîtriser l'art de l'analyse technique, en enseignant comment identifier les opportunités de trading à haut potentiel tout en minimisant les risques.
                      </p>
                    </>
                  )}
                  {trainer.id === "yotraderfx" && (
                    <>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        YotraderFx est un analyste financier chevronné avec une formation en économie et en finance. Sa compréhension approfondie des fondamentaux économiques et des facteurs macroéconomiques qui influencent les marchés lui permet d'avoir une vision globale du trading.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Il excelle particulièrement dans l'analyse des corrélations entre les différentes classes d'actifs et comprend comment les événements sur un marché peuvent affecter les autres. Cette vision holistique est au cœur de son approche d'enseignement.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Dans ses cours à The Trading Matrix Académie, YotraderFx aide les étudiants à comprendre comment intégrer l'analyse fondamentale dans leur stratégie de trading, comment interpréter les données économiques et comment anticiper les réactions du marché aux actualités importantes.
                      </p>
                    </>
                  )}
                </div>
                <div className="flex space-x-4">
                  {trainer.socialLinks?.linkedin && (
                    <a 
                      href={trainer.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-guinea-green transition-colors"
                    >
                      <Linkedin className="mr-2" size={20} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {trainer.socialLinks?.twitter && (
                    <a 
                      href={trainer.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-guinea-green transition-colors"
                    >
                      <Twitter className="mr-2" size={20} />
                      <span>Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        <Separator className="my-16" />

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-guinea-gradient">
              Notre Méthodologie
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Une approche complète et éprouvée pour vous guider vers le succès
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-guinea-green">Fondamentaux solides</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous commençons par établir une base solide de connaissances en trading, couvrant les concepts essentiels, la terminologie, et les principes fondamentaux des marchés financiers.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-guinea-green">Analyse technique avancée</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Maîtrisez l'art de lire les graphiques et d'identifier les configurations de prix efficaces pour prendre des décisions de trading informées et précises.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-guinea-green">Analyse fondamentale</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Apprenez à interpréter les données économiques, les actualités et les événements mondiaux qui influencent les mouvements du marché à court et à long terme.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-guinea-green">Gestion des risques</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Développez des compétences essentielles en gestion du capital et des risques pour protéger votre capital et assurer une croissance constante de votre compte.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-guinea-green">Psychologie du trading</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Maîtrisez vos émotions et développez une mentalité de trader discipliné, patient et confiant pour surmonter les défis psychologiques du trading.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-guinea-green">Trading en conditions réelles</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mettez en pratique vos connaissances dans des sessions de trading en direct et sur des comptes de démonstration pour développer vos compétences dans un environnement réaliste.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-guinea-gradient">
              Notre Engagement
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Ce qui nous distingue des autres académies de trading
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-guinea-green">Support personnalisé</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chez The Trading Matrix Académie, nous croyons qu'une formation efficace va au-delà des cours et des vidéos. C'est pourquoi nous offrons un support personnalisé à tous nos étudiants :
                </p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Sessions de mentorat individuelles avec nos formateurs experts</li>
                  <li>Groupe de discussion privé pour le partage d'idées et l'entraide</li>
                  <li>Analyses de vos trades et feedback personnalisé</li>
                  <li>Assistance rapide pour répondre à vos questions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-guinea-green">Contenu actualisé</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Les marchés financiers évoluent constamment, et notre formation évolue avec eux. Nous nous engageons à :
                </p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Mettre à jour régulièrement notre contenu pour refléter les conditions actuelles du marché</li>
                  <li>Incorporer les nouvelles techniques et stratégies qui émergent</li>
                  <li>Proposer des analyses hebdomadaires des marchés</li>
                  <li>Organiser des webinaires sur les sujets d'actualité</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center bg-guinea-green bg-opacity-10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-guinea-green">Rejoignez The Trading Matrix Académie</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Prêt à transformer votre approche du trading et à développer les compétences nécessaires pour réussir sur les marchés financiers ? Notre équipe de formateurs experts est prête à vous guider à chaque étape de votre parcours.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-guinea-green text-white px-6 py-3 text-lg font-medium transition-colors hover:bg-guinea-green/90"
              >
                Découvrir nos formations
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-guinea-green text-guinea-green px-6 py-3 text-lg font-medium transition-colors hover:bg-guinea-green/10"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+224 663 29 32 80" />
    </div>
  );
};

export default About;
