import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddLeadDialog } from '@/components/leads/AddLeadDialog';
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MoreHorizontal,
  User,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
  source: string;
  value: number;
  createdAt: string;
  nextFollowUp?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  leads: Lead[];
}

const columns: KanbanColumn[] = [
  {
    id: 'new',
    title: 'New',
    color: 'bg-info',
    leads: [
      {
        id: '1',
        name: 'Arun Mehta',
        email: 'arun@email.com',
        phone: '+91 98765 11111',
        insuranceType: 'Motor Insurance',
        source: 'Website',
        value: 25000,
        createdAt: '04 Feb 2026',
      },
      {
        id: '2',
        name: 'Sneha Kapoor',
        email: 'sneha@email.com',
        phone: '+91 98765 22222',
        insuranceType: 'Health Insurance',
        source: 'Referral',
        value: 45000,
        createdAt: '03 Feb 2026',
      },
    ],
  },
  {
    id: 'contacted',
    title: 'Contacted',
    color: 'bg-warning',
    leads: [
      {
        id: '3',
        name: 'Rohit Jain',
        email: 'rohit@email.com',
        phone: '+91 98765 33333',
        insuranceType: 'Life Insurance',
        source: 'Cold Call',
        value: 80000,
        createdAt: '02 Feb 2026',
        nextFollowUp: '06 Feb 2026',
      },
    ],
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'bg-primary',
    leads: [
      {
        id: '4',
        name: 'Pooja Singh',
        email: 'pooja@email.com',
        phone: '+91 98765 44444',
        insuranceType: 'Home Insurance',
        source: 'Website',
        value: 35000,
        createdAt: '01 Feb 2026',
        nextFollowUp: '05 Feb 2026',
      },
      {
        id: '5',
        name: 'Manish Kumar',
        email: 'manish@email.com',
        phone: '+91 98765 55555',
        insuranceType: 'Motor Insurance',
        source: 'Referral',
        value: 18000,
        createdAt: '31 Jan 2026',
        nextFollowUp: '07 Feb 2026',
      },
    ],
  },
  {
    id: 'converted',
    title: 'Converted',
    color: 'bg-success',
    leads: [
      {
        id: '6',
        name: 'Kavita Sharma',
        email: 'kavita@email.com',
        phone: '+91 98765 66666',
        insuranceType: 'Health Insurance',
        source: 'Website',
        value: 52000,
        createdAt: '28 Jan 2026',
      },
    ],
  },
  {
    id: 'lost',
    title: 'Lost',
    color: 'bg-destructive',
    leads: [
      {
        id: '7',
        name: 'Amit Verma',
        email: 'amit@email.com',
        phone: '+91 98765 77777',
        insuranceType: 'Life Insurance',
        source: 'Cold Call',
        value: 100000,
        createdAt: '25 Jan 2026',
      },
    ],
  },
];

function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{lead.name}</p>
            <p className="text-xs text-muted-foreground">{lead.source}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Lead</DropdownMenuItem>
            <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
            <DropdownMenuItem>Convert to Policy</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Mark as Lost</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Badge className="bg-primary-muted text-primary text-xs mb-3">{lead.insuranceType}</Badge>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-3 h-3" />
          {lead.phone}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-3 h-3" />
          {lead.email}
        </div>
        {lead.nextFollowUp && (
          <div className="flex items-center gap-2 text-warning">
            <Calendar className="w-3 h-3" />
            Follow-up: {lead.nextFollowUp}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          ₹{lead.value.toLocaleString('en-IN')}
        </span>
        <span className="text-xs text-muted-foreground">{lead.createdAt}</span>
      </div>
    </div>
  );
}

export default function Leads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addLeadOpen, setAddLeadOpen] = useState(false);

  const totalValue = columns.reduce(
    (sum, col) => sum + col.leads.reduce((s, l) => s + l.value, 0),
    0
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your sales pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-2" onClick={() => setAddLeadOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold text-foreground">
            {columns.reduce((sum, col) => sum + col.leads.length, 0)}
          </p>
        </div>
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground">Pipeline Value</p>
          <p className="text-2xl font-bold text-foreground">
            ₹{(totalValue / 100000).toFixed(1)}L
          </p>
        </div>
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground">Qualified</p>
          <p className="text-2xl font-bold text-primary">
            {columns.find((c) => c.id === 'qualified')?.leads.length || 0}
          </p>
        </div>
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground">Converted</p>
          <p className="text-2xl font-bold text-success">
            {columns.find((c) => c.id === 'converted')?.leads.length || 0}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="w-72 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-semibold text-foreground">{column.title}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {column.leads.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {column.leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}

                {column.id !== 'converted' && column.id !== 'lost' && (
                  <Button
                    variant="ghost"
                    className="w-full border border-dashed border-border text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lead
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddLeadDialog open={addLeadOpen} onOpenChange={setAddLeadOpen} />
    </DashboardLayout>
  );
}
