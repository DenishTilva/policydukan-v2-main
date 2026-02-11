import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  RefreshCw,
  MoreHorizontal,
  FileText,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  X,
  User,
  Phone,
  Mail,
  IndianRupee,
  Clock,
  Shield,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Policy {
  id: string;
  policyNo: string;
  customerName: string;
  mobile: string;
  email: string;
  company: string;
  type: string;
  premium: number;
  commission: number;
  status: 'active' | 'expired' | 'pending';
  issueDate: string;
  expiryDate: string;
  vehicleNo?: string;
  paymentMode: string;
}

const policies: Policy[] = [
  { id: '1', policyNo: 'ICICI-2025-012345', customerName: 'Vikram Malhotra', mobile: '+91 98765 43210', email: 'vikram@email.com', company: 'ICICI Lombard', type: 'Motor - Comprehensive', premium: 24500, commission: 3675, status: 'active', issueDate: '15 Jan 2025', expiryDate: '14 Jan 2026', vehicleNo: 'MH01AB1234', paymentMode: 'UPI' },
  { id: '2', policyNo: 'HDFC-2025-067890', customerName: 'Ananya Desai', mobile: '+91 98765 43211', email: 'ananya@email.com', company: 'HDFC ERGO', type: 'Health - Family Floater', premium: 35000, commission: 5250, status: 'active', issueDate: '20 Dec 2024', expiryDate: '19 Dec 2025', paymentMode: 'Bank Transfer' },
  { id: '3', policyNo: 'BAJAJ-2024-011223', customerName: 'Kiran Rao', mobile: '+91 98765 43212', email: 'kiran@email.com', company: 'Bajaj Allianz', type: 'Motor - Third Party', premium: 8900, commission: 890, status: 'expired', issueDate: '01 Feb 2024', expiryDate: '31 Jan 2025', vehicleNo: 'KA05CD5678', paymentMode: 'Cash' },
  { id: '4', policyNo: 'TATA-2025-044556', customerName: 'Deepak Gupta', mobile: '+91 98765 43213', email: 'deepak@email.com', company: 'Tata AIG', type: 'Life - Term', premium: 18000, commission: 2700, status: 'pending', issueDate: '05 Feb 2025', expiryDate: '04 Feb 2026', paymentMode: 'Cheque' },
  { id: '5', policyNo: 'SBI-2025-077889', customerName: 'Meera Krishnan', mobile: '+91 98765 43214', email: 'meera@email.com', company: 'SBI General', type: 'Home Insurance', premium: 12500, commission: 1875, status: 'active', issueDate: '10 Jan 2025', expiryDate: '09 Jan 2026', paymentMode: 'UPI' },
  { id: '6', policyNo: 'ICICI-2024-098765', customerName: 'Rahul Sharma', mobile: '+91 98765 43215', email: 'rahul@email.com', company: 'ICICI Lombard', type: 'Motor - Two Wheeler', premium: 4500, commission: 450, status: 'expired', issueDate: '15 Jan 2024', expiryDate: '14 Jan 2025', vehicleNo: 'DL10EF9012', paymentMode: 'Cash' },
];

const statusStyles = {
  active: 'bg-success-muted text-success',
  pending: 'bg-warning-muted text-warning',
  expired: 'bg-destructive-muted text-destructive',
};

export default function Policies() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewPolicy, setViewPolicy] = useState<Policy | null>(null);
  const [editPolicy, setEditPolicy] = useState<Policy | null>(null);

  // Filter state
  const [filterCompany, setFilterCompany] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Policies</h1>
          <p className="text-muted-foreground">Manage and track all your insurance policies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2" onClick={() => navigate('/policies/new')}>
            <Plus className="w-4 h-4" />
            Add Policy
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by policy no, customer name, mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !fromDate && "text-muted-foreground")}>
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {fromDate ? format(fromDate, "dd MMM yyyy") : "From Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !toDate && "text-muted-foreground")}>
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {toDate ? format(toDate, "dd MMM yyyy") : "To Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>

            {/* Filter button */}
            <Button variant="outline" size="icon" onClick={() => setFilterOpen(true)}>
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Policy Details</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dates</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Premium</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {policies.map((policy) => (
                <tr key={policy.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-medium text-foreground">{policy.policyNo}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-foreground">{policy.customerName}</p>
                    <p className="text-xs text-muted-foreground">{policy.mobile}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground">{policy.company}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground">{policy.type}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-muted-foreground">Issue: {policy.issueDate}</p>
                    <p className="text-xs text-muted-foreground">Expiry: {policy.expiryDate}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-foreground">₹{policy.premium.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={statusStyles[policy.status]}>
                      {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewPolicy(policy)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditPolicy(policy)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      {policy.status === 'expired' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => navigate('/policies/renew')}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Upload Documents</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
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
          <p className="text-sm text-muted-foreground">Showing 1-6 of 2,847 policies</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /> Previous</Button>
            <Button variant="outline" size="sm" className="min-w-[40px]">1</Button>
            <Button variant="ghost" size="sm" className="min-w-[40px]">2</Button>
            <Button variant="ghost" size="sm" className="min-w-[40px]">3</Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="ghost" size="sm" className="min-w-[40px]">475</Button>
            <Button variant="outline" size="sm">Next <ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Policies</DialogTitle>
            <DialogDescription>Narrow down results using the filters below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Insurance Company</Label>
              <Select value={filterCompany} onValueChange={setFilterCompany}>
                <SelectTrigger><SelectValue placeholder="All Companies" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="icici">ICICI Lombard</SelectItem>
                  <SelectItem value="hdfc">HDFC ERGO</SelectItem>
                  <SelectItem value="bajaj">Bajaj Allianz</SelectItem>
                  <SelectItem value="tata">Tata AIG</SelectItem>
                  <SelectItem value="sbi">SBI General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Policy Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="motor">Motor</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="life">Life</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal text-sm", !fromDate && "text-muted-foreground")}>
                      <CalendarIcon className="w-3 h-3 mr-2" />
                      {fromDate ? format(fromDate, "dd MMM yy") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal text-sm", !toDate && "text-muted-foreground")}>
                      <CalendarIcon className="w-3 h-3 mr-2" />
                      {toDate ? format(toDate, "dd MMM yy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => { setFilterCompany(''); setFilterType(''); setFilterStatus(''); setFromDate(undefined); setToDate(undefined); }}>
                Reset
              </Button>
              <Button onClick={() => setFilterOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Policy Sheet */}
      <Sheet open={!!viewPolicy} onOpenChange={(open) => !open && setViewPolicy(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Policy Details</SheetTitle>
            <SheetDescription>{viewPolicy?.policyNo}</SheetDescription>
          </SheetHeader>
          {viewPolicy && (
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <Badge className={statusStyles[viewPolicy.status]} >
                  {viewPolicy.status.charAt(0).toUpperCase() + viewPolicy.status.slice(1)}
                </Badge>
                <span className="text-2xl font-bold text-foreground">₹{viewPolicy.premium.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Customer Info</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><User className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="font-medium text-foreground">{viewPolicy.customerName}</p>
                      <p className="text-sm text-muted-foreground">{viewPolicy.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4" />{viewPolicy.mobile}</div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Policy Info</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground">Company</p><p className="font-medium">{viewPolicy.company}</p></div>
                    <div><p className="text-muted-foreground">Type</p><p className="font-medium">{viewPolicy.type}</p></div>
                    <div><p className="text-muted-foreground">Issue Date</p><p className="font-medium">{viewPolicy.issueDate}</p></div>
                    <div><p className="text-muted-foreground">Expiry Date</p><p className="font-medium">{viewPolicy.expiryDate}</p></div>
                    {viewPolicy.vehicleNo && <div><p className="text-muted-foreground">Vehicle No</p><p className="font-medium">{viewPolicy.vehicleNo}</p></div>}
                    <div><p className="text-muted-foreground">Payment Mode</p><p className="font-medium">{viewPolicy.paymentMode}</p></div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Financials</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground">Premium</p><p className="font-semibold text-foreground">₹{viewPolicy.premium.toLocaleString('en-IN')}</p></div>
                    <div><p className="text-muted-foreground">Commission</p><p className="font-semibold text-success">₹{viewPolicy.commission.toLocaleString('en-IN')}</p></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => { setViewPolicy(null); setEditPolicy(viewPolicy); }}>
                  <Edit className="w-4 h-4" /> Edit
                </Button>
                {viewPolicy.status === 'expired' && (
                  <Button className="flex-1 gap-2 bg-success hover:bg-success/90" onClick={() => navigate('/policies/renew')}>
                    <RefreshCw className="w-4 h-4" /> Renew
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Policy Sheet */}
      <Sheet open={!!editPolicy} onOpenChange={(open) => !open && setEditPolicy(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Policy</SheetTitle>
            <SheetDescription>{editPolicy?.policyNo}</SheetDescription>
          </SheetHeader>
          {editPolicy && (
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Policy Number</Label>
                <Input defaultValue={editPolicy.policyNo} />
              </div>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input defaultValue={editPolicy.customerName} />
              </div>
              <div className="space-y-2">
                <Label>Mobile</Label>
                <Input defaultValue={editPolicy.mobile} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={editPolicy.email} />
              </div>
              <div className="space-y-2">
                <Label>Insurance Company</Label>
                <Select defaultValue={editPolicy.company}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ICICI Lombard">ICICI Lombard</SelectItem>
                    <SelectItem value="HDFC ERGO">HDFC ERGO</SelectItem>
                    <SelectItem value="Bajaj Allianz">Bajaj Allianz</SelectItem>
                    <SelectItem value="Tata AIG">Tata AIG</SelectItem>
                    <SelectItem value="SBI General">SBI General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Policy Type</Label>
                <Input defaultValue={editPolicy.type} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Premium (₹)</Label>
                  <Input type="number" defaultValue={editPolicy.premium} />
                </div>
                <div className="space-y-2">
                  <Label>Commission (₹)</Label>
                  <Input type="number" defaultValue={editPolicy.commission} />
                </div>
              </div>
              {editPolicy.vehicleNo && (
                <div className="space-y-2">
                  <Label>Vehicle No</Label>
                  <Input defaultValue={editPolicy.vehicleNo} />
                </div>
              )}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editPolicy.status}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setEditPolicy(null)}>Cancel</Button>
                <Button className="flex-1" onClick={() => setEditPolicy(null)}>Save Changes</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
