import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react'; // For dynamic icons

interface EntityStat {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
}

interface EntityStatsCardProps {
  title: string;
  stats: EntityStat[];
  className?: string;
}

const EntityStatsCard: React.FC<EntityStatsCardProps> = ({ title, stats, className }) => {
  console.log("Rendering EntityStatsCard with title:", title);
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              {stat.icon && <stat.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
            <span className="font-semibold">
              {stat.value} {stat.unit}
            </span>
          </div>
        ))}
        {stats.length === 0 && <p className="text-sm text-muted-foreground">No statistics available.</p>}
      </CardContent>
    </Card>
  );
};
export default EntityStatsCard;