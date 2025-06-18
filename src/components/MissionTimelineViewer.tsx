import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"; // For mission status, etc.
import { CalendarDays, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'; // Example icons

interface TimelineEvent {
  id: string | number;
  date: string; // e.g., "2024-07-20" or "July 20, 2024"
  title: string;
  description?: string;
  status?: 'success' | 'failure' | 'upcoming' | 'in-progress';
  tags?: string[];
}

interface MissionTimelineViewerProps {
  events: TimelineEvent[];
  title?: string;
  className?: string;
}

const MissionTimelineViewer: React.FC<MissionTimelineViewerProps> = ({
  events,
  title = "Mission Timeline",
  className,
}) => {
  console.log("Rendering MissionTimelineViewer with events:", events.length);

  const getStatusIcon = (status?: TimelineEvent['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failure': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'upcoming': return <CalendarDays className="h-4 w-4 text-blue-500" />;
      case 'in-progress': return <AlertTriangle className="h-4 w-4 text-yellow-500" />; // Or a loading spinner
      default: return <CalendarDays className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={`p-4 border rounded-lg bg-card ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">No mission events to display.</p>
      ) : (
        <ScrollArea className="h-[400px] pr-3"> {/* Adjust height as needed */}
          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border ml-[7px]"></div>
            
            {events.map((event, index) => (
              <div key={event.id} className="mb-8 relative">
                {/* Dot on the timeline */}
                <div className="absolute left-[-21px] top-[3px] h-4 w-4 rounded-full bg-primary border-2 border-card"></div>
                
                <div className="flex items-center mb-1">
                  {getStatusIcon(event.status)}
                  <span className="ml-2 text-xs font-medium text-muted-foreground">{event.date}</span>
                </div>
                <h4 className="font-semibold text-sm">{event.title}</h4>
                {event.description && (
                  <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                )}
                {event.tags && event.tags.length > 0 && (
                  <div className="mt-2 space-x-1">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}
                {index < events.length - 1 && <Separator className="mt-4 md:hidden" />} {/* Separator for mobile */}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
export default MissionTimelineViewer;