import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'ICICI Lombard', value: 35, color: 'hsl(221, 83%, 53%)' },
  { name: 'HDFC ERGO', value: 25, color: 'hsl(142, 76%, 36%)' },
  { name: 'Bajaj Allianz', value: 20, color: 'hsl(38, 92%, 50%)' },
  { name: 'Tata AIG', value: 12, color: 'hsl(199, 89%, 48%)' },
  { name: 'Others', value: 8, color: 'hsl(262, 83%, 58%)' },
];

export function CompanyDistribution() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Company Distribution</h3>
        <p className="text-sm text-muted-foreground">Premium distribution by insurance company</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 32%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`${value}%`, 'Share']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span style={{ color: 'hsl(222, 47%, 11%)', fontSize: '12px' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
