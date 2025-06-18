import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import EntityStatsCard from '@/components/EntityStatsCard';
import MissionTimelineViewer from '@/components/MissionTimelineViewer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartLegend, ChartTooltipContent } from '@/components/ui/chart'; // Assuming these are part of shadcn/ui chart
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'; // For the actual chart
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Rocket, CalendarCheck, DollarSign, Users, Info, ListChecks, Newspaper as NewspaperIcon, BarChart2 } from 'lucide-react';

// Placeholder data - in a real app, this would be fetched based on entityId
const entityData = {
  spacex: {
    name: 'SpaceX',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/SpaceX_Logo_Black.svg/2560px-SpaceX_Logo_Black.svg.png',
    country: 'USA',
    founded: '2002',
    overview: 'Space Exploration Technologies Corp. (SpaceX) is an American aerospace manufacturer, space launch provider, and satellite communications company. It was founded by Elon Musk with the goal of reducing space transportation costs to enable the colonization of Mars.',
    stats: [
      { label: 'Total Launches', value: '350+', icon: Rocket },
      { label: 'Successful Landings', value: '300+', icon: CalendarCheck },
      { label: 'Est. Valuation', value: '$180B', icon: DollarSign, unit: '' },
      { label: 'Employees', value: '13,000+', icon: Users },
    ],
    missions: [
      { id: 1, date: '2024-05-20', title: 'Starlink Group 8-1 Launch', description: 'Successful deployment of 23 Starlink satellites.', status: 'success', tags: ['Starlink', 'Falcon 9'] },
      { id: 2, date: '2024-06-15', title: 'Polaris Dawn Crewed Mission', description: 'First private spacewalk.', status: 'upcoming', tags: ['Crew Dragon', 'Human Spaceflight'] },
      { id: 3, date: '2023-04-20', title: 'Starship IFT-1', description: 'Integrated flight test of Starship, ended in RUD.', status: 'failure', tags: ['Starship', 'Test Flight'] },
    ],
    launchVehicles: [
      { name: 'Falcon 9', status: 'Active', firstFlight: '2010', launches: '300+', successRate: '99%' },
      { name: 'Falcon Heavy', status: 'Active', firstFlight: '2018', launches: '10+', successRate: '100%' },
      { name: 'Starship', status: 'In Development', firstFlight: '2023 (orbital attempts)', launches: '4 (test flights)', successRate: 'N/A' },
    ],
    launchHistoryData: [ // For chart
      { year: '2020', launches: 26 }, { year: '2021', launches: 31 }, { year: '2022', launches: 61 }, { year: '2023', launches: 96 }, { year: '2024', launches: 70 }, // Placeholder for current year
    ],
    faq: [
      { q: 'What is Starlink?', a: 'Starlink is a satellite internet constellation operated by SpaceX, providing satellite Internet access coverage to over 70 countries.' },
      { q: 'What is Starship?', a: 'Starship is a fully reusable super heavy-lift launch vehicle under development by SpaceX. It is intended to replace all of the company\'s existing launch vehicles.' },
    ]
  },
  // Add more entities like NASA, ISRO, CNSA with similar structure
};


const EntityDetailPage = () => {
  const { entityId = 'spacex' } = useParams<{ entityId?: keyof typeof entityData }>(); // Default to spacex if no id
  const currentEntity = entityData[entityId] || entityData.spacex; // Fallback to SpaceX if entityId is invalid

  console.log(`EntityDetailPage loaded for: ${currentEntity.name}`);

  const chartConfig = {
    launches: { label: "Launches", color: "hsl(var(--primary))" },
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            {/* In a real app, "Entities" would be a link */}
            <BreadcrumbItem><BreadcrumbLink>Entities</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{currentEntity.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8 p-6 bg-card rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={currentEntity.logoUrl} alt={`${currentEntity.name} logo`} />
              <AvatarFallback>{currentEntity.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{currentEntity.name}</h1>
              <div className="mt-2 space-x-2">
                <Badge variant="secondary">{currentEntity.country}</Badge>
                <Badge variant="outline">Founded: {currentEntity.founded}</Badge>
              </div>
               <p className="mt-3 text-muted-foreground max-w-2xl">{currentEntity.overview}</p>
            </div>
          </div>
        </header>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="overview"><Info className="mr-2 h-4 w-4" />Overview</TabsTrigger>
            <TabsTrigger value="missions"><ListChecks className="mr-2 h-4 w-4" />Missions</TabsTrigger>
            <TabsTrigger value="vehicles"><Rocket className="mr-2 h-4 w-4" />Launch Vehicles</TabsTrigger>
            <TabsTrigger value="statistics"><BarChart2 className="mr-2 h-4 w-4" />Statistics</TabsTrigger>
            <TabsTrigger value="faq"><NewspaperIcon className="mr-2 h-4 w-4" />FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <EntityStatsCard title="Key Statistics" stats={currentEntity.stats} className="shadow"/>
            <section className="p-6 bg-card rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-3">About {currentEntity.name}</h2>
                <p className="text-muted-foreground leading-relaxed">
                    {currentEntity.overview || "Detailed information about this entity is not yet available."}
                    Further details about programs, technological advancements, and future goals would be presented here.
                </p>
            </section>
          </TabsContent>

          <TabsContent value="missions">
            <MissionTimelineViewer title={`${currentEntity.name} Mission Highlights`} events={currentEntity.missions} />
          </TabsContent>

          <TabsContent value="vehicles">
             <section className="p-6 bg-card rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Launch Vehicle Fleet</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>First Flight</TableHead>
                      <TableHead>Total Launches</TableHead>
                      <TableHead>Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentEntity.launchVehicles.map((vehicle) => (
                      <TableRow key={vehicle.name}>
                        <TableCell className="font-medium">{vehicle.name}</TableCell>
                        <TableCell><Badge variant={vehicle.status === 'Active' ? 'default' : 'secondary'}>{vehicle.status}</Badge></TableCell>
                        <TableCell>{vehicle.firstFlight}</TableCell>
                        <TableCell>{vehicle.launches}</TableCell>
                        <TableCell>{vehicle.successRate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </section>
          </TabsContent>

          <TabsContent value="statistics">
             <section className="p-6 bg-card rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Annual Launch Cadence</h2>
                <ChartContainer config={chartConfig} className="w-full h-[300px]">
                  <BarChart accessibilityLayer data={currentEntity.launchHistoryData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegend />} />
                    <Bar dataKey="launches" fill="var(--color-launches)" radius={4} />
                  </BarChart>
                </ChartContainer>
            </section>
          </TabsContent>
          
          <TabsContent value="faq">
            <section className="p-6 bg-card rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {currentEntity.faq.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.q}</AccordionTrigger>
                            <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                     {currentEntity.faq.length === 0 && <p className="text-muted-foreground">No FAQs available for {currentEntity.name}.</p>}
                </Accordion>
            </section>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default EntityDetailPage;