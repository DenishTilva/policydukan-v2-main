import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Aug', premium: 245000 },
  { month: 'Sep', premium: 312000 },
  { month: 'Oct', premium: 289000 },
  { month: 'Nov', premium: 378000 },
  { month: 'Dec', premium: 425000 },
  { month: 'Jan', premium: 398000 },
  { month: 'Feb', premium: 456000 },
];

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

export function PremiumChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Premium Trend</h3>
        <p className="text-sm text-muted-foreground">Monthly premium collection over time</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 32%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Premium']}
            />
            <Area
              type="monotone"
              dataKey="premium"
              stroke="hsl(221, 83%, 53%)"
              strokeWidth={2}
              fill="url(#premiumGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
