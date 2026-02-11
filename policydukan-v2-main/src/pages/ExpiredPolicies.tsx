 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Badge } from '@/components/ui/badge';
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from '@/components/ui/table';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { Checkbox } from '@/components/ui/checkbox';
 import { Search, RefreshCw, Download, Filter, AlertTriangle } from 'lucide-react';
 
 const expiredPolicies = [
   { id: 1, policyNo: 'POL-2024-001', customer: 'Rajesh Kumar', mobile: '9876543210', company: 'ICICI Lombard', type: 'Motor', expiredOn: '2024-01-15', premium: 15000, daysExpired: 45 },
   { id: 2, policyNo: 'POL-2024-002', customer: 'Priya Sharma', mobile: '9876543211', company: 'HDFC ERGO', type: 'Health', expiredOn: '2024-01-20', premium: 25000, daysExpired: 40 },
   { id: 3, policyNo: 'POL-2024-003', customer: 'Amit Patel', mobile: '9876543212', company: 'Bajaj Allianz', type: 'Motor', expiredOn: '2024-02-01', premium: 12000, daysExpired: 28 },
   { id: 4, policyNo: 'POL-2024-004', customer: 'Sunita Devi', mobile: '9876543213', company: 'New India', type: 'Fire', expiredOn: '2024-02-05', premium: 50000, daysExpired: 24 },
   { id: 5, policyNo: 'POL-2024-005', customer: 'Vikram Singh', mobile: '9876543214', company: 'SBI General', type: 'Motor', expiredOn: '2024-02-10', premium: 18000, daysExpired: 19 },
 ];
 
 export default function ExpiredPolicies() {
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedPolicies, setSelectedPolicies] = useState<number[]>([]);
 
   const toggleSelectAll = () => {
     if (selectedPolicies.length === expiredPolicies.length) {
       setSelectedPolicies([]);
     } else {
       setSelectedPolicies(expiredPolicies.map(p => p.id));
     }
   };
 
   const toggleSelect = (id: number) => {
     setSelectedPolicies(prev =>
       prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
     );
   };
 
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Expired Policies</h1>
             <p className="text-muted-foreground">Manage and renew expired policies</p>
           </div>
           <div className="flex gap-2">
             <Button variant="outline" size="sm">
               <Download className="w-4 h-4 mr-2" />
               Export
             </Button>
             <Button size="sm" disabled={selectedPolicies.length === 0}>
               <RefreshCw className="w-4 h-4 mr-2" />
               Bulk Renew ({selectedPolicies.length})
             </Button>
           </div>
         </div>
 
         {/* Alert Banner */}
         <Card className="border-destructive/50 bg-destructive/5">
           <CardContent className="flex items-center gap-3 py-4">
             <AlertTriangle className="w-5 h-5 text-destructive" />
             <div>
               <p className="font-medium text-destructive">5 policies have expired</p>
               <p className="text-sm text-muted-foreground">Total premium at risk: ₹1,20,000</p>
             </div>
           </CardContent>
         </Card>
 
         {/* Filters */}
         <Card>
           <CardContent className="pt-6">
             <div className="flex flex-col lg:flex-row gap-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                 <Input
                   placeholder="Search by policy no, customer, mobile..."
                   className="pl-10"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <Select>
                 <SelectTrigger className="w-full lg:w-[180px]">
                   <SelectValue placeholder="Company" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Companies</SelectItem>
                   <SelectItem value="icici">ICICI Lombard</SelectItem>
                   <SelectItem value="hdfc">HDFC ERGO</SelectItem>
                   <SelectItem value="bajaj">Bajaj Allianz</SelectItem>
                 </SelectContent>
               </Select>
               <Select>
                 <SelectTrigger className="w-full lg:w-[180px]">
                   <SelectValue placeholder="Expired Since" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="7">Last 7 days</SelectItem>
                   <SelectItem value="15">Last 15 days</SelectItem>
                   <SelectItem value="30">Last 30 days</SelectItem>
                   <SelectItem value="60">Last 60 days</SelectItem>
                 </SelectContent>
               </Select>
               <Button variant="outline">
                 <Filter className="w-4 h-4 mr-2" />
                 More Filters
               </Button>
             </div>
           </CardContent>
         </Card>
 
         {/* Table */}
         <Card>
           <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead className="w-12">
                     <Checkbox
                       checked={selectedPolicies.length === expiredPolicies.length}
                       onCheckedChange={toggleSelectAll}
                     />
                   </TableHead>
                   <TableHead>Policy No</TableHead>
                   <TableHead>Customer</TableHead>
                   <TableHead>Company</TableHead>
                   <TableHead>Type</TableHead>
                   <TableHead>Expired On</TableHead>
                   <TableHead>Days Expired</TableHead>
                   <TableHead className="text-right">Premium</TableHead>
                   <TableHead>Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {expiredPolicies.map((policy) => (
                   <TableRow key={policy.id}>
                     <TableCell>
                       <Checkbox
                         checked={selectedPolicies.includes(policy.id)}
                         onCheckedChange={() => toggleSelect(policy.id)}
                       />
                     </TableCell>
                     <TableCell className="font-medium">{policy.policyNo}</TableCell>
                     <TableCell>
                       <div>
                         <p className="font-medium">{policy.customer}</p>
                         <p className="text-sm text-muted-foreground">{policy.mobile}</p>
                       </div>
                     </TableCell>
                     <TableCell>{policy.company}</TableCell>
                     <TableCell>
                       <Badge variant="secondary">{policy.type}</Badge>
                     </TableCell>
                     <TableCell>{policy.expiredOn}</TableCell>
                     <TableCell>
                       <Badge variant="destructive">{policy.daysExpired} days</Badge>
                     </TableCell>
                     <TableCell className="text-right font-medium">₹{policy.premium.toLocaleString()}</TableCell>
                     <TableCell>
                       <Button size="sm" className="bg-success hover:bg-success/90">
                         <RefreshCw className="w-4 h-4 mr-1" />
                         Renew
                       </Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }