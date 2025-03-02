
import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "text-guinea-yellow fill-guinea-yellow" : "text-gray-300"
            }`}
          />
        ))}
    </div>
  );
};

export default RatingStars;
