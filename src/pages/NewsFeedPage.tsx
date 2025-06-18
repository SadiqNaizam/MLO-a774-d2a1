import React, { useState, useMemo } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import NewsArticleCard from '@/components/NewsArticleCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Filter } from 'lucide-react';

const allNewsArticles = [
  { id: 1, title: 'SpaceX Starship Achieves New Altitude Record', description: 'The latest Starship prototype soared to new heights in a successful test flight over Texas.', imageUrl: 'https://images.unsplash.com/photo-1633740099969-af0e5a6e0975?q=80&w=800&auto=format&fit=crop', articleUrl: '#', date: 'August 1, 2024', source: 'SpaceTech Today', entity: 'SpaceX', topic: 'Launch Vehicles' },
  { id: 2, title: 'NASA Unveils Plans for Lunar Gateway Phase 2', description: 'Details emerge for the next phase of the Lunar Gateway space station, a key component of the Artemis program.', imageUrl: 'https://images.unsplash.com/photo-1583342614800-6a372c307031?q=80&w=800&auto=format&fit=crop', articleUrl: '#', date: 'July 28, 2024', source: 'NASA Press', entity: 'NASA', topic: 'Moon Exploration' },
  { id: 3, title: 'ISRO\'s Chandrayaan-4 Mission Approved', description: 'India\'s space agency gets the green light for its fourth lunar mission, focusing on sample return.', imageUrl: 'https://images.unsplash.com/photo-1517976547714-7202265864c1?q=80&w=800&auto=format&fit=crop', articleUrl: '#', date: 'July 25, 2024', source: 'The Indian Express', entity: 'ISRO', topic: 'Moon Exploration' },
  { id: 4, title: 'China\'s Tiangong Space Station Fully Operational', description: 'CNSA announces that the Tiangong space station has completed assembly and is now fully operational.', imageUrl: 'https://images.unsplash.com/photo-1614728261737-90480a559936?q=80&w=800&auto=format&fit=crop', articleUrl: '#', date: 'July 22, 2024', source: 'Xinhua News', entity: 'CNSA', topic: 'Space Stations' },
  { id: 5, title: 'Private Space Companies Eye Asteroid Mining', description: 'A consortium of private firms is exploring the feasibility of asteroid mining missions in the next decade.', imageUrl: 'https://images.unsplash.com/photo-1532477769138-6ea8d569ed97?q=80&w=800&auto=format&fit=crop', articleUrl: '#', date: 'July 20, 2024', source: 'FutureSpace', entity: 'Commercial', topic: 'Space Industry' },
  { id: 6, title: 'Breakthrough in Fusion Rocket Technology Reported', description: 'Researchers claim a significant step forward in developing viable fusion propulsion for deep space travel.', imageUrl: 'https://images.unsplash.com/photo-1639900501934-23363989e5a2?q=80&w=800&auto=format&fit=crop', articleUrl: '#', date: 'July 18, 2024', source: 'Advanced Propulsion Review', entity: 'Research', topic: 'Technology' },
  { id: 7, title: 'SpaceX Deploys New Batch of Starlink Satellites', description: 'Another successful Falcon 9 launch adds more satellites to the Starlink constellation.', articleUrl: '#', date: 'August 3, 2024', source: 'SpaceNews', entity: 'SpaceX', topic: 'Satellites' },
  { id: 8, title: 'James Webb Telescope Discovers Most Distant Galaxy Yet', description: 'The JWST continues to break records, identifying a galaxy from the early universe.', articleUrl: '#', date: 'August 2, 2024', source: 'NASA Science', entity: 'NASA', topic: 'Astronomy' },
];

const ITEMS_PER_PAGE = 6;

const NewsFeedPage = () => {
  console.log('NewsFeedPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const entities = useMemo(() => ['all', ...new Set(allNewsArticles.map(a => a.entity))], []);
  const topics = useMemo(() => ['all', ...new Set(allNewsArticles.map(a => a.topic))], []);

  const filteredArticles = useMemo(() => {
    return allNewsArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEntity = selectedEntity === 'all' || article.entity === selectedEntity;
      const matchesTopic = selectedTopic === 'all' || article.topic === selectedTopic;
      return matchesSearch && matchesEntity && matchesTopic;
    });
  }, [searchTerm, selectedEntity, selectedTopic]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground">Space News Feed</h1>
          <p className="text-lg text-muted-foreground mt-2">Stay updated with the latest from the cosmos.</p>
        </header>

        {/* Filters Section */}
        <div className="mb-8 p-4 bg-card rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="pl-10 w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="entity-filter" className="text-sm font-medium">Filter by Entity</Label>
                    <Select value={selectedEntity} onValueChange={(value) => { setSelectedEntity(value); setCurrentPage(1); }}>
                        <SelectTrigger id="entity-filter" className="w-full">
                            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="All Entities" />
                        </SelectTrigger>
                        <SelectContent>
                            {entities.map(entity => <SelectItem key={entity} value={entity}>{entity === 'all' ? 'All Entities' : entity}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="topic-filter" className="text-sm font-medium">Filter by Topic</Label>
                    <Select value={selectedTopic} onValueChange={(value) => { setSelectedTopic(value); setCurrentPage(1); }}>
                        <SelectTrigger id="topic-filter" className="w-full">
                            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="All Topics" />
                        </SelectTrigger>
                        <SelectContent>
                            {topics.map(topic => <SelectItem key={topic} value={topic}>{topic === 'all' ? 'All Topics' : topic}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>

        {/* Articles Grid */}
        {currentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <NewsArticleCard
                key={article.id}
                title={article.title}
                description={article.description}
                imageUrl={article.imageUrl}
                articleUrl={article.articleUrl}
                date={article.date}
                source={article.source}
                className="h-full"
              />
            ))}
          </div>
        ) : (
            <div className="text-center py-12">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground">No Articles Found</h2>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
            </div>
        )}
        

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  if (totalPages <= 5 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1 || (currentPage <= 3 && page <=3) || (currentPage >= totalPages - 2 && page >= totalPages -2 ) ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page); }} isActive={currentPage === page}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <PaginationEllipsis key={`ellipsis-${page}`} />;
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NewsFeedPage;