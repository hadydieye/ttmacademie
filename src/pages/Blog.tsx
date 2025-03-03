
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, Calendar, User, Tag, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import Card from "@/components/ui/card";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    document.title = "Blog - The Trading Matrix Académie";
    
    // Add animation to elements when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Les fondamentaux du trading sur les marchés africains",
      excerpt: "Découvrez les principes de base pour trader efficacement sur les marchés financiers africains, en tenant compte des spécificités locales.",
      date: "10 mai 2024",
      author: "Amadou Diallo",
      category: "débutant",
      image: "/lovable-uploads/6c4774b3-6602-45b0-9a72-b682325cdfd4.png",
      tags: ["trading", "afrique", "débutant"]
    },
    {
      id: 2,
      title: "Analyse technique des indices boursiers africains",
      excerpt: "Comment utiliser les outils d'analyse technique pour identifier les tendances sur les marchés boursiers de Casablanca, Lagos et Johannesburg.",
      date: "5 mai 2024",
      author: "Fatou Camara",
      category: "analyse",
      image: "/lovable-uploads/72d3ecf6-692c-439e-a697-97f482443862.png",
      tags: ["analyse technique", "bourse", "indices"]
    },
    {
      id: 3,
      title: "Trading de devises : focus sur le Franc Guinéen",
      excerpt: "Stratégies pour trader le Franc Guinéen face aux principales devises mondiales et comprendre les facteurs qui influencent son évolution.",
      date: "28 avril 2024",
      author: "Mohamed Sylla",
      category: "devises",
      image: "/lovable-uploads/60c4dc83-6733-4b61-bf3b-a31ad902bbde.png",
      tags: ["forex", "GNF", "devises"]
    },
    {
      id: 4,
      title: "Gestion du risque pour les traders africains",
      excerpt: "Comment protéger votre capital dans le contexte des marchés africains, plus volatils et moins liquides que les marchés occidentaux.",
      date: "20 avril 2024",
      author: "Aminata Touré",
      category: "stratégie",
      image: "/lovable-uploads/3a80c4e7-bf3e-47a9-8d60-6812985952df.png",
      tags: ["risque", "money management", "trading"]
    },
    {
      id: 5,
      title: "Impact des événements géopolitiques sur les matières premières africaines",
      excerpt: "Analyse de l'influence des tensions géopolitiques sur le cours des matières premières stratégiques pour le continent africain.",
      date: "15 avril 2024",
      author: "Jean-Paul Koné",
      category: "matières premières",
      image: "/lovable-uploads/5c385599-f359-4f79-8935-30da7331f454.png",
      tags: ["commodities", "géopolitique", "trading"]
    },
    {
      id: 6,
      title: "Psychologie du trading : surmonter les biais culturels",
      excerpt: "Comment les spécificités culturelles africaines peuvent influencer votre comportement de trading et comment les gérer efficacement.",
      date: "10 avril 2024",
      author: "Kofi Mensah",
      category: "psychologie",
      image: "/lovable-uploads/3a80c4e7-bf3e-47a9-8d60-6812985952df.png",
      tags: ["psychologie", "biais", "comportement"]
    },
    {
      id: 7,
      title: "Les opportunités offertes par la ZLECAF pour les traders africains",
      excerpt: "Comment la Zone de libre-échange continentale africaine ouvre de nouvelles perspectives pour les traders et investisseurs du continent.",
      date: "5 avril 2024",
      author: "Sarah Ouédraogo",
      category: "économie",
      image: "/lovable-uploads/377c789a-9c7e-4517-9499-fb2097c2647a.png",
      tags: ["ZLECAF", "économie", "opportunités"]
    },
    {
      id: 8,
      title: "Trading algorithmique accessible aux traders africains",
      excerpt: "Introduction aux solutions de trading automatisé adaptées aux marchés africains et accessibles sans compétences avancées en programmation.",
      date: "1 avril 2024",
      author: "Ibrahim Keita",
      category: "technologie",
      image: "/lovable-uploads/7807fc3d-8178-4bb4-8601-2375fa79ec42.png",
      tags: ["algorithme", "automatisation", "technologie"]
    },
    {
      id: 9,
      title: "Les cryptomonnaies en Afrique : opportunités et défis",
      excerpt: "Panorama des cryptomonnaies sur le continent africain, leur adoption et leur potentiel pour résoudre certains défis financiers locaux.",
      date: "25 mars 2024",
      author: "Mariama Bah",
      category: "crypto",
      image: "/lovable-uploads/60c4dc83-6733-4b61-bf3b-a31ad902bbde.png",
      tags: ["crypto", "blockchain", "finance"]
    }
  ];

  // Filter posts by category and search term
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Categories
  const categories = [
    { id: "all", name: "Tous les articles" },
    { id: "débutant", name: "Débutants" },
    { id: "analyse", name: "Analyse" },
    { id: "devises", name: "Devises" },
    { id: "stratégie", name: "Stratégie" },
    { id: "matières premières", name: "Matières premières" },
    { id: "psychologie", name: "Psychologie" },
    { id: "économie", name: "Économie" },
    { id: "technologie", name: "Technologie" },
    { id: "crypto", name: "Crypto" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-green/10 text-guinea-green dark:bg-guinea-green/20 dark:text-guinea-green/90 mb-4">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
                Actualités et analyses du trading africain
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Restez informé des dernières tendances, stratégies et opportunités sur les marchés financiers en Afrique.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-12">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-fade-in">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto">
                    <img 
                      src="/lovable-uploads/377c789a-9c7e-4517-9499-fb2097c2647a.png" 
                      alt="Featured post" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-guinea-yellow/10 text-guinea-yellow dark:bg-guinea-yellow/20 dark:text-guinea-yellow/90 mb-4">
                      À la une
                    </span>
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Le trading en Afrique : état des lieux et perspectives</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Un panorama complet des marchés financiers africains, leur évolution récente et les opportunités à saisir pour les traders locaux.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">15 mai 2024</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>Dr. Ousmane Bah</span>
                    </div>
                    <Button className="bg-guinea-green hover:bg-guinea-green/90 text-white self-start">
                      Lire l'article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`
                    ${activeCategory === category.id 
                      ? "bg-guinea-green hover:bg-guinea-green/90 text-white" 
                      : "border-guinea-green text-guinea-green hover:bg-guinea-green/5"
                    }
                    text-sm
                  `}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            {currentPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentPosts.map((post) => (
                  <Card key={post.id} hover className="animate-fade-in h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <Card.Header>
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-guinea-green/10 text-guinea-green dark:bg-guinea-green/20 dark:text-guinea-green/90">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <Card.Title className="hover:text-guinea-green transition-colors">
                        <a href="#">{post.title}</a>
                      </Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    </Card.Content>
                    <Card.Footer>
                      <Button variant="outline" className="w-full border-guinea-green text-guinea-green hover:bg-guinea-green/5">
                        Lire l'article
                      </Button>
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Aucun article ne correspond à votre recherche.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="border-guinea-green text-guinea-green hover:bg-guinea-green/5"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Précédent
                  </Button>
                  <div className="flex items-center px-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      Page {currentPage} sur {totalPages}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-guinea-green text-guinea-green hover:bg-guinea-green/5"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Recevez nos articles dans votre boîte mail</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Abonnez-vous à notre newsletter pour ne manquer aucune actualité du trading africain.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="px-5 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Button className="bg-guinea-green hover:bg-guinea-green/90 text-white whitespace-nowrap">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
