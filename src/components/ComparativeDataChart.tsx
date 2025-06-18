import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Example data structure. Adapt as needed.
interface ChartDataItem {
  name: string; // e.g., Year or Category
  [key: string]: number | string; // Dynamically add entity values, e.g., China: 50, SpaceX: 60
}

interface ComparativeDataChartProps {
  data: ChartDataItem[];
  entities: { key: string; name: string; color: string }[]; // Keys match data item keys
  chartType?: 'bar' | 'line';
  title: string;
  description?: string;
  className?: string;
  xAxisDataKey?: string; // The key in data for X-axis labels, defaults to 'name'
  yAxisLabel?: string;
}

const ComparativeDataChart: React.FC<ComparativeDataChartProps> = ({
  data,
  entities,
  chartType = 'bar',
  title,
  description,
  className,
  xAxisDataKey = 'name',
  yAxisLabel
}) => {
  console.log("Rendering ComparativeDataChart titled:", title, "with type:", chartType);

  if (!data || data.length === 0 || !entities || entities.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No data available for comparison or entities not selected.</p>
        </CardContent>
      </Card>
    );
  }

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;
  const ChartSeriesComponent = chartType === 'line' ? Line : Bar;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartComponent data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 0, style: {textAnchor: 'middle', fontSize: 12}} : undefined} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            {entities.map(entity => (
              <ChartSeriesComponent
                key={entity.key}
                type="monotone"
                dataKey={entity.key}
                name={entity.name}
                fill={entity.color}
                stroke={entity.color} // For LineChart
                dot={chartType === 'line' ? { r: 4 } : undefined} // For LineChart
                activeDot={chartType === 'line' ? { r: 6 } : undefined} // For LineChart
              />
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
export default ComparativeDataChart;