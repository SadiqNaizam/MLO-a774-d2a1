import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import EntityStatsCard from '@/components/EntityStatsCard';
import NewsArticleCard from '@/components/NewsArticleCard';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Rocket, TrendingUp, Users, Newspaper } from 'lucide-react';

const Homepage = () => {
  console.log('Homepage loaded');

  const featuredEntities = [
    { name: 'SpaceX', stats: [{ label: 'Total Launches', value: 250, icon: Rocket }, { label: 'Active Satellites', value: '5,000+', icon: TrendingUp }] },
    { name: 'NASA', stats: [{ label: 'Years Active', value: 65, icon: Users }, { label: 'Mars Rovers', value: 3, icon: Rocket }] },
    { name: 'ISRO', stats: [{ label: 'Moon Missions', value: 3, icon: Rocket }, { label: 'Budget (Est.)', value: '$1.9B', icon: TrendingUp }] },
    { name: 'CNSA (China)', stats: [{ label: 'Space Station Modules', value: 3, icon: Rocket }, { label: 'Lunar Samples Returned', value: 'Yes', icon: TrendingUp }] },
  ];

  const recentNews = [
    {
      title: 'SpaceX Announces Next Starship Test Flight',
      description: 'The next high-altitude test flight of the Starship prototype is scheduled for next month, aiming to reach orbit.',
      imageUrl: 'https://images.unsplash.com/photo-1633740099969-af0e5a6e0975?q=80&w=800&auto=format&fit=crop',
      articleUrl: '#',
      date: 'August 5, 2024',
      source: 'SpaceNews',
    },
    {
      title: 'NASA’s Artemis Program: Next Steps to the Moon',
      description: 'An update on the Artemis program, detailing the upcoming missions and technological advancements for lunar exploration.',
      imageUrl: 'https://images.unsplash.com/photo-1633740099969-af0e5a6e0975?q=80&w=800&auto=format&fit=crop',
      articleUrl: '#',
      date: 'August 3, 2024',
      source: 'NASA Official',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Explore the Frontiers of Space
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Dive into the world of space exploration. Track leading agencies, compare their progress, and stay updated with the latest news in the global space race.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link to="/comparative-analysis">Compare Entities</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/news-feed">Latest News</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Entities Section */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">Key Space Entities</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Get quick insights into the major players shaping the future of space exploration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEntities.map((entity) => (
                <EntityStatsCard
                  key={entity.name}
                  title={entity.name}
                  stats={entity.stats.map(stat => ({...stat, unit: stat.unit || ''}))}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="secondary" asChild>
                 {/* Placeholder: Link to a page listing all entities */}
                <Link to="/entity-detail-page">View All Entities</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured News Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">Recent Headlines</h2>
             <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Stay informed with the latest developments and breakthroughs from around the cosmos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map((article) => (
                <NewsArticleCard
                  key={article.title}
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
             <div className="text-center mt-10">
              <Button variant="secondary" asChild>
                <Link to="/news-feed">More News <Newspaper className="ml-2 h-4 w-4"/></Link>
              </Button>
            </div>
          </div>
        </section>

         {/* Call to Action for Comparison Tool */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-2xl mx-auto p-6 md:p-10 shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">Ready to Compare?</CardTitle>
                <CardDescription className="text-md text-muted-foreground mt-2">
                  Use our interactive tool to analyze space agencies side-by-side based on various metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" asChild className="mt-4">
                  <Link to="/comparative-analysis">Launch Comparison Tool</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;