
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
  const isScriptrader = trainer.id === "scriptrader";
  const isYotraderFx = trainer.id === "yotraderfx";
  
  return (
    <Card hover className="h-full overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
          <div className={`absolute inset-0 ${
            isScriptrader 
              ? "bg-gradient-to-b from-guinea-green/10 to-guinea-red/10 dark:from-guinea-green/20 dark:to-guinea-red/20" 
              : isYotraderFx 
                ? "bg-gradient-to-b from-guinea-yellow/10 to-guinea-red/10 dark:from-guinea-yellow/20 dark:to-guinea-red/20"
                : ""
          }`}></div>
          <img 
            src={trainer.image} 
            alt={trainer.name}
            className={`w-full h-full ${
              isScriptrader || isYotraderFx 
                ? "object-contain p-4" 
                : "object-cover"
            } transition-transform duration-300 hover:scale-105`}
          />
        </div>
        <div className="md:w-2/3">
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
            <Link to={`/about#${trainer.id}`}>
              <Button variant="ghost" className="text-guinea-green hover:text-guinea-green/80 p-0 flex items-center gap-1">
                En savoir plus
                <ArrowRight size={16} />
              </Button>
            </Link>
          </Card.Footer>
        </div>
      </div>
    </Card>
  );
};

export default TrainerCard;
