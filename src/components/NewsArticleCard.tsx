import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from 'lucide-react';

interface NewsArticleCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  articleUrl: string;
  date?: string; // e.g., "July 20, 2024"
  source?: string;
  className?: string;
}

const NewsArticleCard: React.FC<NewsArticleCardProps> = ({
  title,
  description,
  imageUrl,
  articleUrl,
  date,
  source,
  className,
}) => {
  console.log("Rendering NewsArticleCard with title:", title);
  return (
    <Card className={`overflow-hidden flex flex-col ${className}`}>
      {imageUrl && (
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
          />
        </AspectRatio>
      )}
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        {date && <CardDescription className="text-xs">{source ? `${source} • ${date}` : date}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <a href={articleUrl} target="_blank" rel="noopener noreferrer">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default NewsArticleCard;