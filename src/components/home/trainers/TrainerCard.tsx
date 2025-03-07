
import React from "react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export interface TrainerProps {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

interface TrainerCardProps {
  trainer: TrainerProps;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLearnMore = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate('/register?redirect=about');
      toast({
        title: "Inscription requise",
        description: "Veuillez vous inscrire pour en savoir plus sur nos formateurs",
        duration: 3000,
      });
    }
  };
  
  return (
    <Card className="h-full overflow-hidden border-0 shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* Image section - occupe tout l'espace disponible sans fond visible */}
        <div className="md:w-2/5 h-96 md:h-auto relative flex items-center justify-center">
          <img 
            src={trainer.image} 
            alt={trainer.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {/* Content section - on the right */}
        <div className="md:w-3/5 bg-gradient-to-br from-[#1F2937] to-[#111827] text-white">
          <Card.Header className="pb-2">
            <Card.Title className="text-2xl font-bold text-white">{trainer.name}</Card.Title>
            <p className="text-sm font-semibold text-blue-400">{trainer.role}</p>
          </Card.Header>
          
          <Card.Content>
            <p className="text-gray-300">{trainer.bio}</p>
          </Card.Content>
          
          <Card.Footer className="flex justify-between items-center border-t border-gray-700 pt-4 mt-2">
            <div className="flex space-x-3">
              {trainer.socialLinks?.linkedin && (
                <a 
                  href={trainer.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {trainer.socialLinks?.twitter && (
                <a 
                  href={trainer.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>
            {user ? (
              <Link to={`/about#${trainer.id}`}>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 flex items-center gap-1">
                  En savoir plus
                  <ArrowRight size={16} />
                </Button>
              </Link>
            ) : (
              <Link to={`/about#${trainer.id}`} onClick={handleLearnMore}>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 flex items-center gap-1">
                  En savoir plus
                  <ArrowRight size={16} />
                </Button>
              </Link>
            )}
          </Card.Footer>
        </div>
      </div>
    </Card>
  );
};

export default TrainerCard;
