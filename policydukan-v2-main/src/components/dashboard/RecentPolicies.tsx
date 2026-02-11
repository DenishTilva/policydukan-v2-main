import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';

interface Policy {
  id: string;
  policyNo: string;
  customerName: string;
  company: string;
  type: string;
  premium: number;
  status: 'active' | 'pending' | 'expired';
  issueDate: string;
}

const policies: Policy[] = [
  {
    id: '1',
    policyNo: 'ICICI-2026-012345',
    customerName: 'Vikram Malhotra',
    company: 'ICICI Lombard',
    type: 'Motor - Comprehensive',
    premium: 24500,
    status: 'active',
    issueDate: '04 Feb 2026',
  },
  {
    id: '2',
    policyNo: 'HDFC-2026-067890',
    customerName: 'Ananya Desai',
    company: 'HDFC ERGO',
    type: 'Health - Family Floater',
    premium: 35000,
    status: 'active',
    issueDate: '03 Feb 2026',
  },
  {
    id: '3',
    policyNo: 'BAJAJ-2026-011223',
    customerName: 'Kiran Rao',
    company: 'Bajaj Allianz',
    type: 'Motor - Third Party',
    premium: 8900,
    status: 'pending',
    issueDate: '03 Feb 2026',
  },
  {
    id: '4',
    policyNo: 'TATA-2026-044556',
    customerName: 'Deepak Gupta',
    company: 'Tata AIG',
    type: 'Life - Term',
    premium: 18000,
    status: 'active',
    issueDate: '02 Feb 2026',
  },
  {
    id: '5',
    policyNo: 'SBI-2026-077889',
    customerName: 'Meera Krishnan',
    company: 'SBI General',
    type: 'Home Insurance',
    premium: 12500,
    status: 'active',
    issueDate: '01 Feb 2026',
  },
];

const statusStyles = {
  active: 'bg-success-muted text-success',
  pending: 'bg-warning-muted text-warning',
  expired: 'bg-destructive-muted text-destructive',
};

export function RecentPolicies() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Policies</h3>
          <p className="text-sm text-muted-foreground">Latest policies added to the system</p>
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
                Policy No
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Premium
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {policies.map((policy) => (
              <tr key={policy.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{policy.policyNo}</p>
                    <p className="text-xs text-muted-foreground">{policy.issueDate}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{policy.customerName}</p>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-foreground">{policy.type}</p>
                    <p className="text-xs text-muted-foreground">{policy.company}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-foreground">
                    ₹{policy.premium.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge className={statusStyles[policy.status]}>
                    {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
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
