
import React from "react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <Card hover className="h-full overflow-hidden">
      <div className="h-64 overflow-hidden">
        <img 
          src={trainer.image} 
          alt={trainer.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <Card.Header>
        <Card.Title>{trainer.name}</Card.Title>
        <p className="text-sm font-semibold text-guinea-green">{trainer.role}</p>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-700 dark:text-gray-300">{trainer.bio}</p>
      </Card.Content>
      <Card.Footer className="flex justify-between items-center">
        <div className="flex space-x-2">
          {trainer.socialLinks?.linkedin && (
            <a 
              href={trainer.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-guinea-green transition-colors"
            >
              <Linkedin size={20} />
            </a>
          )}
          {trainer.socialLinks?.twitter && (
            <a 
              href={trainer.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-guinea-green transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
        </div>
        <Link to={`/formateur/${trainer.id}`}>
          <Button variant="ghost" className="text-guinea-green hover:text-guinea-green/80 p-0 flex items-center gap-1">
            En savoir plus
            <ArrowRight size={16} />
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default TrainerCard;
