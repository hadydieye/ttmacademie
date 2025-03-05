
// Testimonial data structure
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  bgImage: string;
}

// Testimonial data with images of African professionals and students
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mariama Diallo",
    role: "Trader Indépendante, Conakry",
    content: "TTM Académie a complètement transformé ma façon d'aborder le trading. Les cours sont adaptés à notre contexte guinéen et m'ont permis de développer une stratégie qui tient compte des réalités de notre marché.",
    avatar: "/lovable-uploads/363f58a3-3e8b-4091-89d0-d1b466177e21.png",
    rating: 5,
    bgImage: "/lovable-uploads/71cfb6c0-4863-4687-85e2-2ee0854b8f4f.png"
  },
  {
    id: 2,
    name: "Ibrahim Camara",
    role: "Entrepreneur, Kankan",
    content: "Après plusieurs tentatives infructueuses d'investissement, j'ai découvert TTM Académie. La qualité de l'enseignement et le support de la communauté m'ont aidé à comprendre comment investir efficacement malgré les défis de notre économie.",
    avatar: "/lovable-uploads/8e016688-a288-459d-bd7a-330cfba461d0.png",
    rating: 5,
    bgImage: "/lovable-uploads/6c4774b3-6602-45b0-9a72-b682325cdfd4.png"
  },
  {
    id: 3,
    name: "Fatoumata Barry",
    role: "Analyste Financière, Dakar",
    content: "En tant que professionnelle de la finance travaillant entre le Sénégal et la Guinée, les outils d'analyse de TTM Académie sont inestimables. Ils prennent en compte les spécificités des marchés ouest-africains que les plateformes internationales ignorent.",
    avatar: "/lovable-uploads/5c385599-f359-4f79-8935-30da7331f454.png",
    rating: 5,
    bgImage: "/lovable-uploads/72d3ecf6-692c-439e-a697-97f482443862.png"
  },
  {
    id: 4,
    name: "Mamadou Sylla",
    role: "Étudiant en Finance, Université de Conakry",
    content: "TTM Académie a comblé le fossé entre la théorie financière enseignée à l'université et les réalités pratiques du trading en Guinée. Les webinaires hebdomadaires avec des traders expérimentés sont particulièrement enrichissants.",
    avatar: "/lovable-uploads/f662b4c5-66d3-4211-8cbe-970970311a37.png",
    rating: 4,
    bgImage: "/lovable-uploads/3a80c4e7-bf3e-47a9-8d60-6812985952df.png"
  },
  {
    id: 5,
    name: "Aïssatou Baldé",
    role: "Commerçante, Labé",
    content: "Je n'avais aucune connaissance en trading avant TTM Académie. Grâce à leurs cours en français et aux explications claires sur les marchés africains, j'ai réussi à diversifier mes revenus au-delà de mon commerce traditionnel.",
    avatar: "/lovable-uploads/854c6010-6c34-45db-841e-c4a02e4f7b10.png",
    rating: 5,
    bgImage: "/lovable-uploads/60c4dc83-6733-4b61-bf3b-a31ad902bbde.png"
  },
  {
    id: 6,
    name: "Ousmane Konaté",
    role: "Trader à Temps Plein, Abidjan",
    content: "Après avoir essayé plusieurs formations internationales, j'ai enfin trouvé avec TTM Académie une approche adaptée aux marchés africains. Leurs stratégies tiennent compte de nos horaires et de nos contraintes spécifiques.",
    avatar: "/lovable-uploads/4446a15b-62d8-4d0a-b038-9e984054f2e3.png",
    rating: 5,
    bgImage: "/lovable-uploads/7d1ef882-2f70-4dc0-b257-ec51c2aaf9fc.png"
  },
  {
    id: 7,
    name: "Fatou Ndiaye",
    role: "Professeure d'Économie, Université de Bamako",
    content: "J'intègre maintenant les ressources de TTM Académie dans mes cours. Leur approche pratique du trading et de l'analyse de marché complète parfaitement l'enseignement théorique que nous dispensons à l'université.",
    avatar: "/lovable-uploads/45badc4a-1db3-4805-bd99-4ad83c3ddb0b.png",
    rating: 5,
    bgImage: "/lovable-uploads/9b285d2e-d2cd-4ce7-bc61-e4d2c63c3a12.png"
  },
  {
    id: 8,
    name: "Sekou Touré",
    role: "Ingénieur & Trader Particulier, Abidjan",
    content: "La formation TTM Académie m'a permis de créer une source de revenus complémentaire tout en conservant mon emploi d'ingénieur. Leur flexibilité et leur méthodologie sont parfaitement adaptées aux professionnels actifs.",
    avatar: "/lovable-uploads/64617320-161a-4c65-b082-31d0193db414.png",
    rating: 4,
    bgImage: "/lovable-uploads/6c119f27-4e1b-4cf3-964b-c9cf552747f2.png"
  },
  {
    id: 9,
    name: "Aminata Diop",
    role: "Étudiante & Trader, Université de Dakar",
    content: "Grâce à TTM Académie, j'ai pu commencer à trader avec un petit capital pendant mes études. La communauté d'étudiants africains qui tradent ensemble est une ressource inestimable pour progresser.",
    avatar: "/lovable-uploads/d5e1460f-a93a-4ed4-82ac-120e03b71d96.png",
    rating: 5,
    bgImage: "/lovable-uploads/cf0eb5fe-f5ce-4ab2-bd59-396580002628.png"
  },
  {
    id: 10,
    name: "Jean-Pierre Kaboré",
    role: "Analyste Financier, Ouagadougou",
    content: "TTM Académie offre une perspective unique sur les marchés internationaux avec une sensibilité africaine. Leurs analyses des impacts des événements mondiaux sur les économies africaines sont particulièrement pertinentes.",
    avatar: "/lovable-uploads/13aff269-29ab-4b50-956a-dcd5d76a9068.png",
    rating: 5,
    bgImage: "/lovable-uploads/d7319208-2335-4578-9eaa-e3cbe86a5661.png"
  }
];
