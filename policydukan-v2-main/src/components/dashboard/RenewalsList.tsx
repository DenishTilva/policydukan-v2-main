import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, RefreshCw, Bell } from 'lucide-react';

interface Renewal {
  id: string;
  customerName: string;
  policyNo: string;
  company: string;
  expiryDate: string;
  daysLeft: number;
  premium: number;
  phone: string;
}

const renewals: Renewal[] = [
  {
    id: '1',
    customerName: 'Amit Sharma',
    policyNo: 'ICICI-2024-001234',
    company: 'ICICI Lombard',
    expiryDate: '05 Feb 2026',
    daysLeft: 1,
    premium: 15420,
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    customerName: 'Priya Patel',
    policyNo: 'HDFC-2024-005678',
    company: 'HDFC ERGO',
    expiryDate: '06 Feb 2026',
    daysLeft: 2,
    premium: 28500,
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    customerName: 'Suresh Reddy',
    policyNo: 'BAJAJ-2024-009012',
    company: 'Bajaj Allianz',
    expiryDate: '08 Feb 2026',
    daysLeft: 4,
    premium: 12800,
    phone: '+91 98765 43212',
  },
  {
    id: '4',
    customerName: 'Neha Singh',
    policyNo: 'TATA-2024-003456',
    company: 'Tata AIG',
    expiryDate: '10 Feb 2026',
    daysLeft: 6,
    premium: 45000,
    phone: '+91 98765 43213',
  },
];

export function RenewalsList() {
  const getDaysLeftBadge = (days: number) => {
    if (days <= 1) return <Badge className="bg-destructive-muted text-destructive">Today</Badge>;
    if (days <= 3) return <Badge className="bg-warning-muted text-warning">{days} days</Badge>;
    return <Badge className="bg-info-muted text-info">{days} days</Badge>;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Renewals Due</h3>
          <p className="text-sm text-muted-foreground">Policies expiring in next 7 days</p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Policy Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Premium
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {renewals.map((renewal) => (
              <tr key={renewal.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{renewal.customerName}</p>
                    <p className="text-sm text-muted-foreground">{renewal.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{renewal.policyNo}</p>
                    <p className="text-sm text-muted-foreground">{renewal.company}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">{renewal.expiryDate}</span>
                    {getDaysLeftBadge(renewal.daysLeft)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-foreground">
                    ₹{renewal.premium.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="gap-1">
                      <RefreshCw className="w-3 h-3" />
                      Renew
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
