import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Phone,
  Mail,
  MoreHorizontal,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPolicies: number;
  activePolicies: number;
  totalPremium: number;
  totalCommission: number;
  joinedDate: string;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Vikram Malhotra',
    email: 'vikram.malhotra@email.com',
    phone: '+91 98765 43210',
    totalPolicies: 5,
    activePolicies: 4,
    totalPremium: 125000,
    totalCommission: 15600,
    joinedDate: '15 Mar 2023',
  },
  {
    id: '2',
    name: 'Ananya Desai',
    email: 'ananya.desai@email.com',
    phone: '+91 98765 43211',
    totalPolicies: 3,
    activePolicies: 3,
    totalPremium: 85000,
    totalCommission: 10200,
    joinedDate: '20 Jun 2023',
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43212',
    totalPolicies: 8,
    activePolicies: 6,
    totalPremium: 245000,
    totalCommission: 29400,
    joinedDate: '05 Jan 2022',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43213',
    totalPolicies: 2,
    activePolicies: 2,
    totalPremium: 48000,
    totalCommission: 5760,
    joinedDate: '10 Sep 2024',
  },
  {
    id: '5',
    name: 'Deepak Gupta',
    email: 'deepak.gupta@email.com',
    phone: '+91 98765 43214',
    totalPolicies: 4,
    activePolicies: 3,
    totalPremium: 156000,
    totalCommission: 18720,
    joinedDate: '28 Apr 2023',
  },
];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Customers</p>
              <p className="text-2xl font-bold text-foreground">982</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold text-foreground">45</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Premium</p>
              <p className="text-2xl font-bold text-foreground">₹42K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone..."
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

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Policies
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Premium
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {customer.email}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary-muted text-primary">{customer.activePolicies} Active</Badge>
                      <span className="text-sm text-muted-foreground">/ {customer.totalPolicies} Total</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-foreground">
                      ₹{customer.totalPremium.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-success">
                      ₹{customer.totalCommission.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{customer.joinedDate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Policies</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1-5 of 1,247 customers
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="min-w-[40px]">1</Button>
            <Button variant="ghost" size="sm" className="min-w-[40px]">2</Button>
            <Button variant="ghost" size="sm" className="min-w-[40px]">3</Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="ghost" size="sm" className="min-w-[40px]">250</Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
