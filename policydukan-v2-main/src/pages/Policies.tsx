import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import api from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

interface Policy {
  _id: string;
  policyNumber: string;
  customer: {
    firstName: string;
    phone: string;
    email: string;
  };
  insurer: {
    name: string;
    shortCode: string;
  };
  policyType: {
    name: string;
    category: string;
  };
  premiumDetails: {
    netPremium: number;
    gstAmount: number;
    grossPremium: number;
  };
  status: "active" | "expired" | "pending";
  issueDate: string;
  expiryDate: string;
  vehicleDetails?: {
    vehicleType?: string;
    registrationNumber?: string;
    make?: string;
    model?: string;
  };
}

const statusStyles = {
  active: "bg-success-muted text-success",
  pending: "bg-warning-muted text-warning",
  expired: "bg-destructive-muted text-destructive",
};

export default function Policies() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewPolicy, setViewPolicy] = useState<Policy | null>(null);
  const [editPolicy, setEditPolicy] = useState<Policy | null>(null);

  // Data fetching state
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPolicies, setTotalPolicies] = useState(0);

  // Filter state
  const [filterCompany, setFilterCompany] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch policies on mount and when filters change
  useEffect(() => {
    fetchPolicies();
  }, [currentPage, searchQuery, filterStatus]);

  const [editStatus, setEditStatus] = useState<string>("");
  const [editLoading, setEditLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Set edit form when policy is selected
  useEffect(() => {
    if (editPolicy) {
      setEditStatus(editPolicy.status);
    }
  }, [editPolicy]);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchQuery,
        status: filterStatus,
      });

      const response = await api.get(`/policies?${params}`);

      if (response.data.success) {
        setPolicies(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setTotalPolicies(response.data.pagination.total);
      }
    } catch (err: unknown) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || "Failed to fetch policies"
          : "Failed to fetch policies";
      setError(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePolicy = async () => {
    if (!editPolicy) return;

    try {
      setEditLoading(true);
      const response = await api.put(`/policies/${editPolicy._id}`, {
        status: editStatus,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Policy updated successfully",
        });
        setEditPolicy(null);
        fetchPolicies();
      }
    } catch (err: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof AxiosError
            ? err.response?.data?.message || "Failed to update policy"
            : "Failed to update policy",
      });
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeletePolicy = async () => {
    if (!editPolicy) return;

    try {
      setDeleteLoading(true);
      const response = await api.delete(`/policies/${editPolicy._id}`);

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Policy deleted successfully",
        });
        setDeleteDialogOpen(false);
        setEditPolicy(null);
        fetchPolicies();
      }
    } catch (err: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof AxiosError
            ? err.response?.data?.message || "Failed to delete policy"
            : "Failed to delete policy",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Policies</h1>
          <p className="text-muted-foreground">
            Manage and track all your insurance policies
          </p>
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
          <Button
            size="sm"
            className="gap-2"
            onClick={() => navigate("/policies/new")}
          >
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
                <Button
                  variant="outline"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {fromDate ? format(fromDate, "dd MMM yyyy") : "From Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !toDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {toDate ? format(toDate, "dd MMM yyyy") : "To Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Filter button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFilterOpen(true)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-muted-foreground">Loading policies...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchPolicies}>Try Again</Button>
            </div>
          ) : policies.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No policies found</p>
              <Button className="mt-4" onClick={() => navigate("/add-policy")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Policy
              </Button>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Policy Details
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Premium
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {policies.map((policy) => (
                    <tr
                      key={policy._id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <p className="font-medium text-foreground">
                            {policy.policyNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-foreground">
                          {policy.customer.firstName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {policy.customer.phone}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-foreground">
                          {policy.insurer.name}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-foreground">
                          {policy.policyType.name}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-muted-foreground">
                          Issue:{" "}
                          {format(new Date(policy.issueDate), "dd MMM yyyy")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expiry:{" "}
                          {format(new Date(policy.expiryDate), "dd MMM yyyy")}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-foreground">
                          ₹
                          {policy.premiumDetails.grossPremium.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className={statusStyles[policy.status]}>
                          {policy.status.charAt(0).toUpperCase() +
                            policy.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewPolicy(policy)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditPolicy(policy)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {policy.status === "expired" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-primary"
                              onClick={() => navigate("/policies/renew")}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Download PDF</DropdownMenuItem>
                              <DropdownMenuItem>
                                Upload Documents
                              </DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="px-4 py-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {policies.length} of {totalPolicies} policies
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }).map(
                    (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "ghost"}
                        size="sm"
                        className="min-w-[40px]"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ),
                  )}
                  {totalPages > 5 && (
                    <span className="text-muted-foreground">...</span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Policies</DialogTitle>
            <DialogDescription>
              Narrow down results using the filters below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Insurance Company</Label>
              <Select value={filterCompany} onValueChange={setFilterCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
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
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal text-sm",
                        !fromDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="w-3 h-3 mr-2" />
                      {fromDate ? format(fromDate, "dd MMM yy") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal text-sm",
                        !toDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="w-3 h-3 mr-2" />
                      {toDate ? format(toDate, "dd MMM yy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setFilterCompany("");
                  setFilterType("");
                  setFilterStatus("");
                  setFromDate(undefined);
                  setToDate(undefined);
                }}
              >
                Reset
              </Button>
              <Button onClick={() => setFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Policy Sheet */}
      <Sheet
        open={!!viewPolicy}
        onOpenChange={(open) => !open && setViewPolicy(null)}
      >
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Policy Details</SheetTitle>
            <SheetDescription>{viewPolicy?.policyNumber}</SheetDescription>
          </SheetHeader>
          {viewPolicy && (
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <Badge className={statusStyles[viewPolicy.status]}>
                  {viewPolicy.status.charAt(0).toUpperCase() +
                    viewPolicy.status.slice(1)}
                </Badge>
                <span className="text-2xl font-bold text-foreground">
                  ₹
                  {viewPolicy.premiumDetails.grossPremium.toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Customer Info
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {viewPolicy.customer.firstName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {viewPolicy.customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {viewPolicy.customer.phone}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Policy Info
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Company</p>
                      <p className="font-medium">{viewPolicy.insurer.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">
                        {viewPolicy.policyType.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">
                        {format(new Date(viewPolicy.issueDate), "dd MMM yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">
                        {format(new Date(viewPolicy.expiryDate), "dd MMM yyyy")}
                      </p>
                    </div>
                    {viewPolicy.vehicleDetails?.registrationNumber && (
                      <div>
                        <p className="text-muted-foreground">Vehicle No</p>
                        <p className="font-medium">
                          {viewPolicy.vehicleDetails.registrationNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Financials
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Net Premium</p>
                      <p className="font-semibold text-foreground">
                        ₹
                        {viewPolicy.premiumDetails.netPremium.toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">GST</p>
                      <p className="font-semibold text-foreground">
                        ₹
                        {viewPolicy.premiumDetails.gstAmount.toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Gross Premium</p>
                      <p className="font-semibold text-success">
                        ₹
                        {viewPolicy.premiumDetails.grossPremium.toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    setViewPolicy(null);
                    setEditPolicy(viewPolicy);
                  }}
                >
                  <Edit className="w-4 h-4" /> Edit
                </Button>
                {viewPolicy.status === "expired" && (
                  <Button
                    className="flex-1 gap-2 bg-success hover:bg-success/90"
                    onClick={() => navigate("/policies/renew")}
                  >
                    <RefreshCw className="w-4 h-4" /> Renew
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Policy Sheet */}
      <Sheet
        open={!!editPolicy}
        onOpenChange={(open) => !open && setEditPolicy(null)}
      >
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Policy</SheetTitle>
            <SheetDescription>{editPolicy?.policyNumber}</SheetDescription>
          </SheetHeader>
          {editPolicy && (
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Policy Number</Label>
                <Input defaultValue={editPolicy.policyNumber} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input defaultValue={editPolicy.customer.firstName} />
              </div>
              <div className="space-y-2">
                <Label>Mobile</Label>
                <Input defaultValue={editPolicy.customer.phone} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={editPolicy.customer.email} />
              </div>
              <div className="space-y-2">
                <Label>Insurance Company</Label>
                <Input defaultValue={editPolicy.insurer.name} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Policy Type</Label>
                <Input defaultValue={editPolicy.policyType.name} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Net Premium (₹)</Label>
                  <Input
                    type="number"
                    defaultValue={editPolicy.premiumDetails.netPremium}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>GST (₹)</Label>
                  <Input
                    type="number"
                    defaultValue={editPolicy.premiumDetails.gstAmount}
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditPolicy(null)}
                  disabled={editLoading || deleteLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={editLoading || deleteLoading}
                >
                  Delete
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSavePolicy}
                  disabled={editLoading || deleteLoading}
                >
                  {editLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Policy</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete policy {editPolicy?.policyNumber}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeletePolicy}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Policy"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
