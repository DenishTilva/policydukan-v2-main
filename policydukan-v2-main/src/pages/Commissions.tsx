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
 import { Search, Download, IndianRupee, TrendingUp, Clock, CheckCircle } from 'lucide-react';
 
 const commissionsData = [
   { id: 1, policyNo: 'POL-2024-001', customer: 'Rajesh Kumar', company: 'ICICI Lombard', type: 'Motor', premium: 15000, commissionRate: 15, commission: 2250, status: 'paid', paidDate: '2024-02-15' },
   { id: 2, policyNo: 'POL-2024-002', customer: 'Priya Sharma', company: 'HDFC ERGO', type: 'Health', premium: 25000, commissionRate: 20, commission: 5000, status: 'pending', paidDate: null },
   { id: 3, policyNo: 'POL-2024-003', customer: 'Amit Patel', company: 'Bajaj Allianz', type: 'Motor', premium: 12000, commissionRate: 15, commission: 1800, status: 'paid', paidDate: '2024-02-20' },
   { id: 4, policyNo: 'POL-2024-004', customer: 'Sunita Devi', company: 'New India', type: 'Fire', premium: 50000, commissionRate: 12, commission: 6000, status: 'pending', paidDate: null },
   { id: 5, policyNo: 'POL-2024-005', customer: 'Vikram Singh', company: 'SBI General', type: 'Motor', premium: 18000, commissionRate: 15, commission: 2700, status: 'paid', paidDate: '2024-02-25' },
   { id: 6, policyNo: 'POL-2024-006', customer: 'Anita Reddy', company: 'ICICI Lombard', type: 'Health', premium: 35000, commissionRate: 18, commission: 6300, status: 'pending', paidDate: null },
 ];
 
 export default function Commissions() {
   const [searchTerm, setSearchTerm] = useState('');
 
   const totalCommission = commissionsData.reduce((sum, item) => sum + item.commission, 0);
   const pendingCommission = commissionsData.filter(item => item.status === 'pending').reduce((sum, item) => sum + item.commission, 0);
   const paidCommission = commissionsData.filter(item => item.status === 'paid').reduce((sum, item) => sum + item.commission, 0);
 
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Commissions</h1>
             <p className="text-muted-foreground">Track your earnings from policy sales</p>
           </div>
           <Button variant="outline">
             <Download className="w-4 h-4 mr-2" />
             Export Report
           </Button>
         </div>
 
         {/* KPI Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
             <CardContent className="pt-6">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                   <p className="text-3xl font-bold text-primary">₹{totalCommission.toLocaleString()}</p>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                   <IndianRupee className="w-6 h-6 text-primary" />
                 </div>
               </div>
             </CardContent>
           </Card>
 
           <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
             <CardContent className="pt-6">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-muted-foreground">Pending Payout</p>
                   <p className="text-3xl font-bold text-warning">₹{pendingCommission.toLocaleString()}</p>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                   <Clock className="w-6 h-6 text-warning" />
                 </div>
               </div>
             </CardContent>
           </Card>
 
           <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
             <CardContent className="pt-6">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-muted-foreground">Paid Payout</p>
                   <p className="text-3xl font-bold text-success">₹{paidCommission.toLocaleString()}</p>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                   <CheckCircle className="w-6 h-6 text-success" />
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Filters */}
         <Card>
           <CardContent className="pt-6">
             <div className="flex flex-col lg:flex-row gap-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                 <Input
                   placeholder="Search by policy no, customer..."
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
                   <SelectValue placeholder="Status" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Status</SelectItem>
                   <SelectItem value="paid">Paid</SelectItem>
                   <SelectItem value="pending">Pending</SelectItem>
                 </SelectContent>
               </Select>
               <Select>
                 <SelectTrigger className="w-full lg:w-[180px]">
                   <SelectValue placeholder="Date Range" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="7">Last 7 days</SelectItem>
                   <SelectItem value="30">Last 30 days</SelectItem>
                   <SelectItem value="90">Last 90 days</SelectItem>
                   <SelectItem value="year">This Year</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </CardContent>
         </Card>
 
         {/* Table */}
         <Card>
           <CardHeader>
             <CardTitle>Commission Breakdown</CardTitle>
           </CardHeader>
           <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Policy No</TableHead>
                   <TableHead>Customer</TableHead>
                   <TableHead>Company</TableHead>
                   <TableHead>Type</TableHead>
                   <TableHead className="text-right">Premium</TableHead>
                   <TableHead className="text-right">Rate</TableHead>
                   <TableHead className="text-right">Commission</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Paid Date</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {commissionsData.map((item) => (
                   <TableRow key={item.id}>
                     <TableCell className="font-medium">{item.policyNo}</TableCell>
                     <TableCell>{item.customer}</TableCell>
                     <TableCell>{item.company}</TableCell>
                     <TableCell>
                       <Badge variant="secondary">{item.type}</Badge>
                     </TableCell>
                     <TableCell className="text-right">₹{item.premium.toLocaleString()}</TableCell>
                     <TableCell className="text-right">{item.commissionRate}%</TableCell>
                     <TableCell className="text-right font-semibold text-success">₹{item.commission.toLocaleString()}</TableCell>
                     <TableCell>
                       <Badge variant={item.status === 'paid' ? 'default' : 'secondary'} className={item.status === 'paid' ? 'bg-success' : ''}>
                         {item.status === 'paid' ? 'Paid' : 'Pending'}
                       </Badge>
                     </TableCell>
                     <TableCell>{item.paidDate || '-'}</TableCell>
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