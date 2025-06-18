import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import ComparativeDataChart from '@/components/ComparativeDataChart';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal, AlertTriangle } from 'lucide-react';

// Mock data - replace with actual data fetching and state management
const allEntities = [
  { id: 'spacex', name: 'SpaceX', color: '#005288' }, // Blue
  { id: 'nasa', name: 'NASA', color: '#FC3D21' },   // Red
  { id: 'isro', name: 'ISRO', color: '#FF9933' },   // Orange
  { id: 'cnsa', name: 'CNSA', color: '#DE2910' },   // China Red
  { id: 'roscosmos', name: 'Roscosmos', color: '#0039A6' }, // Russian Blue
];

const metrics = [
  { id: 'launch_count', name: 'Annual Launch Count' },
  { id: 'success_rate', name: 'Launch Success Rate (%)' },
  { id: 'budget', name: 'Annual Budget (USD Billions)' },
];

const sampleComparisonData = {
  launch_count: [
    { name: '2020', spacex: 26, nasa: 5, isro: 2, cnsa: 39, roscosmos: 17 },
    { name: '2021', spacex: 31, nasa: 6, isro: 2, cnsa: 55, roscosmos: 25 },
    { name: '2022', spacex: 61, nasa: 7, isro: 5, cnsa: 64, roscosmos: 21 },
    { name: '2023', spacex: 96, nasa: 8, isro: 7, cnsa: 67, roscosmos: 19 },
  ],
  success_rate: [ // Fictional success rates for demo
    { name: 'Overall', spacex: 98, nasa: 96, isro: 94, cnsa: 95, roscosmos: 92 },
  ],
  budget: [ // Fictional budgets for demo
    { name: '2023', spacex: 5, nasa: 25.4, isro: 1.9, cnsa: 11, roscosmos: 2.2 }, // SpaceX budget is private, this is an estimate of R&D
  ],
};

const ComparativeAnalysisPage = () => {
  console.log('ComparativeAnalysisPage loaded');
  const [selectedEntityIds, setSelectedEntityIds] = useState<string[]>(['spacex', 'nasa']);
  const [selectedMetricId, setSelectedMetricId] = useState<string>('launch_count');
  const [chartData, setChartData] = useState<any[]>(sampleComparisonData.launch_count);
  const [activeEntitiesForChart, setActiveEntitiesForChart] = useState<{key: string; name: string; color: string}[]>([
    { key: 'spacex', name: 'SpaceX', color: '#005288' },
    { key: 'nasa', name: 'NASA', color: '#FC3D21' },
  ]);


  const handleEntityToggle = (entityId: string) => {
    setSelectedEntityIds((prev) =>
      prev.includes(entityId) ? prev.filter((id) => id !== entityId) : [...prev, entityId]
    );
  };

  const handleGenerateComparison = () => {
    const currentMetricData = (sampleComparisonData as any)[selectedMetricId] || [];
    setChartData(currentMetricData);
    
    const active = allEntities.filter(e => selectedEntityIds.includes(e.id)).map(e => ({key: e.id, name: e.name, color: e.color}));
    setActiveEntitiesForChart(active);
    console.log("Generating comparison for entities:", selectedEntityIds, "metric:", selectedMetricId);
  };

  const selectedMetricName = metrics.find(m => m.id === selectedMetricId)?.name || "Selected Metric";
  const yAxisLabel = selectedMetricId === 'budget' ? 'USD Billions' : (selectedMetricId === 'success_rate' ? '%' : 'Count');


  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
        <Sidebar title="Comparison Setup" className="hidden md:block">
          <div className="space-y-6 p-4">
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Select Entities ({selectedEntityIds.length})</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {allEntities.map((entity) => (
                  <div key={entity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`entity-${entity.id}`}
                      checked={selectedEntityIds.includes(entity.id)}
                      onCheckedChange={() => handleEntityToggle(entity.id)}
                    />
                    <Label htmlFor={`entity-${entity.id}`} className="text-sm font-normal cursor-pointer" style={{ color: entity.color }}>
                      {entity.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-foreground">Select Metric</h4>
              <Select value={selectedMetricId} onValueChange={setSelectedMetricId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a metric" />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map((metric) => (
                    <SelectItem key={metric.id} value={metric.id}>
                      {metric.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerateComparison} className="w-full" disabled={selectedEntityIds.length === 0}>
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Generate Comparison
            </Button>
             {selectedEntityIds.length < 2 && (
                <p className="text-xs text-destructive mt-2 text-center">Please select at least two entities to compare.</p>
            )}
          </div>
        </Sidebar>

        <main className="flex-grow p-6 bg-muted/20">
          <h1 className="text-3xl font-bold text-foreground mb-6">Comparative Analysis</h1>
          
          {/* Mobile configuration (could be a Drawer or Accordion) */}
          <div className="md:hidden mb-6">
            <Accordion type="single" collapsible>
                <AccordionItem value="config">
                    <AccordionTrigger className="text-lg font-semibold">
                        <SlidersHorizontal className="mr-2 h-5 w-5" /> Configure Comparison
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-card rounded-b-md">
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold mb-2 text-foreground">Select Entities ({selectedEntityIds.length})</h4>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {allEntities.map((entity) => (
                                    <div key={entity.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`mobile-entity-${entity.id}`}
                                        checked={selectedEntityIds.includes(entity.id)}
                                        onCheckedChange={() => handleEntityToggle(entity.id)}
                                    />
                                    <Label htmlFor={`mobile-entity-${entity.id}`} className="text-sm font-normal cursor-pointer" style={{ color: entity.color }}>
                                        {entity.name}
                                    </Label>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-foreground">Select Metric</h4>
                                <Select value={selectedMetricId} onValueChange={setSelectedMetricId}>
                                <SelectTrigger><SelectValue placeholder="Choose a metric" /></SelectTrigger>
                                <SelectContent>
                                    {metrics.map((metric) => (
                                    <SelectItem key={metric.id} value={metric.id}>{metric.name}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleGenerateComparison} className="w-full" disabled={selectedEntityIds.length === 0}>
                                Apply Filters
                            </Button>
                            {selectedEntityIds.length < 2 && (
                                <p className="text-xs text-destructive mt-2 text-center">Please select at least two entities to compare.</p>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>

          {activeEntitiesForChart.length > 0 ? (
            <div className="space-y-6">
              <ComparativeDataChart
                title={`${selectedMetricName} Comparison`}
                description={`Comparing ${activeEntitiesForChart.map(e => e.name).join(', ')}`}
                data={chartData}
                entities={activeEntitiesForChart}
                chartType={selectedMetricId === 'success_rate' ? 'bar' : 'line'}
                yAxisLabel={yAxisLabel}
                className="shadow-lg"
              />

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Raw Data: {selectedMetricName}</CardTitle>
                  <CardDescription>Detailed figures for the selected entities and metric.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{chartData[0]?.name && typeof chartData[0]?.name === 'string' ? 'Year/Category' : 'Category'}</TableHead>
                        {activeEntitiesForChart.map(entity => (
                          <TableHead key={entity.key} style={{color: entity.color}}>{entity.name}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chartData.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell className="font-medium">{row.name}</TableCell>
                          {activeEntitiesForChart.map(entity => (
                            <TableCell key={entity.key}>
                              {row[entity.key] !== undefined ? row[entity.key] : 'N/A'}
                              {selectedMetricId === 'success_rate' && row[entity.key] !== undefined ? '%' : ''}
                              {selectedMetricId === 'budget' && row[entity.key] !== undefined ? 'B' : ''}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><AlertTriangle className="mr-2 h-6 w-6 text-amber-500" /> No Data to Display</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Please select at least one entity and a metric, then click "Generate Comparison" to view data.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ComparativeAnalysisPage;