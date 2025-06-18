import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, children, className }) => {
  console.log("Rendering Sidebar with title:", title);
  return (
    <aside className={`h-full border-r bg-muted/40 ${className}`}>
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <div className="space-y-4 pl-6">
          {title && (
            <>
              <h3 className="mb-2 text-lg font-semibold tracking-tight">
                {title}
              </h3>
              <Separator className="my-4" />
            </>
          )}
          {children ? children : (
            <div className="text-sm text-muted-foreground">
              Sidebar content goes here.
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};
export default Sidebar;