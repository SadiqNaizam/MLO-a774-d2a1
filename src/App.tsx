import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import EntityDetailPage from "./pages/EntityDetailPage";
import ComparativeAnalysisPage from "./pages/ComparativeAnalysisPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* For EntityDetailPage, using a param for dynamic content. 
              If no specific entity is passed, the page can show a default or a selection list.
              The component itself handles the default 'spacex' if no param.
          */}
          <Route path="/entity/:entityId" element={<EntityDetailPage />} />
          <Route path="/entity-detail-page" element={<EntityDetailPage />} /> {/* Fallback or generic link */}
          <Route path="/comparative-analysis" element={<ComparativeAnalysisPage />} />
          <Route path="/news-feed" element={<NewsFeedPage />} />
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;