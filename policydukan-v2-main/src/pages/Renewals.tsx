 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Badge } from '@/components/ui/badge';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from '@/components/ui/table';
 import { Checkbox } from '@/components/ui/checkbox';
 import {
   Search,
   Bell,
   RefreshCw,
   CheckCircle,
   UserPlus,
   Calendar,
   Phone,
   Mail,
 } from 'lucide-react';
 
 const renewalsData = {
   today: [
     { id: 1, policyNo: 'POL-2024-101', customer: 'Rahul Verma', mobile: '9876543220', email: 'rahul@email.com', company: 'ICICI Lombard', type: 'Motor', expiryDate: '2024-03-01', premium: 18000, status: 'pending' },
     { id: 2, policyNo: 'POL-2024-102', customer: 'Neha Gupta', mobile: '9876543221', email: 'neha@email.com', company: 'HDFC ERGO', type: 'Health', expiryDate: '2024-03-01', premium: 32000, status: 'contacted' },
   ],
   next7: [
     { id: 3, policyNo: 'POL-2024-103', customer: 'Arun Sharma', mobile: '9876543222', email: 'arun@email.com', company: 'Bajaj Allianz', type: 'Motor', expiryDate: '2024-03-05', premium: 14000, status: 'pending' },
     { id: 4, policyNo: 'POL-2024-104', customer: 'Meera Patel', mobile: '9876543223', email: 'meera@email.com', company: 'New India', type: 'Fire', expiryDate: '2024-03-07', premium: 45000, status: 'pending' },
     { id: 5, policyNo: 'POL-2024-105', customer: 'Sanjay Kumar', mobile: '9876543224', email: 'sanjay@email.com', company: 'SBI General', type: 'Motor', expiryDate: '2024-03-08', premium: 22000, status: 'contacted' },
   ],
   next15: [
     { id: 6, policyNo: 'POL-2024-106', customer: 'Pooja Singh', mobile: '9876543225', email: 'pooja@email.com', company: 'ICICI Lombard', type: 'Health', expiryDate: '2024-03-12', premium: 28000, status: 'pending' },
     { id: 7, policyNo: 'POL-2024-107', customer: 'Deepak Joshi', mobile: '9876543226', email: 'deepak@email.com', company: 'HDFC ERGO', type: 'Motor', expiryDate: '2024-03-15', premium: 16000, status: 'pending' },
   ],
   next30: [
     { id: 8, policyNo: 'POL-2024-108', customer: 'Kavita Rao', mobile: '9876543227', email: 'kavita@email.com', company: 'Bajaj Allianz', type: 'Travel', expiryDate: '2024-03-22', premium: 8000, status: 'pending' },
     { id: 9, policyNo: 'POL-2024-109', customer: 'Manish Tiwari', mobile: '9876543228', email: 'manish@email.com', company: 'New India', type: 'Motor', expiryDate: '2024-03-28', premium: 20000, status: 'pending' },
   ],
 };
 
 function RenewalsTable({ data }: { data: typeof renewalsData.today }) {
   const [selectedItems, setSelectedItems] = useState<number[]>([]);
 
   const toggleSelectAll = () => {
     if (selectedItems.length === data.length) {
       setSelectedItems([]);
     } else {
       setSelectedItems(data.map(item => item.id));
     }
   };
 
   const toggleSelect = (id: number) => {
     setSelectedItems(prev =>
       prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
     );
   };
 
   return (
     <div className="space-y-4">
       {selectedItems.length > 0 && (
         <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
           <span className="text-sm font-medium">{selectedItems.length} selected</span>
           <div className="flex gap-2 ml-auto">
             <Button size="sm" variant="outline">
               <Bell className="w-4 h-4 mr-1" />
               Send Reminder
             </Button>
             <Button size="sm" variant="outline">
               <UserPlus className="w-4 h-4 mr-1" />
               Assign to Staff
             </Button>
             <Button size="sm" variant="outline" className="text-success">
               <CheckCircle className="w-4 h-4 mr-1" />
               Mark Done
             </Button>
           </div>
         </div>
       )}
 
       <Table>
         <TableHeader>
           <TableRow>
             <TableHead className="w-12">
               <Checkbox
                 checked={selectedItems.length === data.length && data.length > 0}
                 onCheckedChange={toggleSelectAll}
               />
             </TableHead>
             <TableHead>Policy No</TableHead>
             <TableHead>Customer</TableHead>
             <TableHead>Company</TableHead>
             <TableHead>Type</TableHead>
             <TableHead>Expiry Date</TableHead>
             <TableHead className="text-right">Premium</TableHead>
             <TableHead>Status</TableHead>
             <TableHead>Actions</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
           {data.map((item) => (
             <TableRow key={item.id}>
               <TableCell>
                 <Checkbox
                   checked={selectedItems.includes(item.id)}
                   onCheckedChange={() => toggleSelect(item.id)}
                 />
               </TableCell>
               <TableCell className="font-medium">{item.policyNo}</TableCell>
               <TableCell>
                 <div>
                   <p className="font-medium">{item.customer}</p>
                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
                     <span className="flex items-center gap-1">
                       <Phone className="w-3 h-3" />
                       {item.mobile}
                     </span>
                   </div>
                 </div>
               </TableCell>
               <TableCell>{item.company}</TableCell>
               <TableCell>
                 <Badge variant="secondary">{item.type}</Badge>
               </TableCell>
               <TableCell>
                 <div className="flex items-center gap-1">
                   <Calendar className="w-4 h-4 text-warning" />
                   {item.expiryDate}
                 </div>
               </TableCell>
               <TableCell className="text-right font-medium">₹{item.premium.toLocaleString()}</TableCell>
               <TableCell>
                 <Badge variant={item.status === 'contacted' ? 'default' : 'secondary'}>
                   {item.status === 'contacted' ? 'Contacted' : 'Pending'}
                 </Badge>
               </TableCell>
               <TableCell>
                 <div className="flex gap-1">
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                     <Phone className="w-4 h-4" />
                   </Button>
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                     <Mail className="w-4 h-4" />
                   </Button>
                   <Button size="sm" className="bg-success hover:bg-success/90">
                     <RefreshCw className="w-4 h-4 mr-1" />
                     Renew
                   </Button>
                 </div>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </div>
   );
 }
 
 export default function Renewals() {
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Renewals</h1>
             <p className="text-muted-foreground">Track and manage upcoming policy renewals</p>
           </div>
           <div className="relative w-full sm:w-80">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
             <Input placeholder="Search renewals..." className="pl-10" />
           </div>
         </div>
 
         {/* KPI Cards */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           <Card>
             <CardContent className="pt-6">
               <div className="text-2xl font-bold text-destructive">2</div>
               <p className="text-sm text-muted-foreground">Due Today</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <div className="text-2xl font-bold text-warning">3</div>
               <p className="text-sm text-muted-foreground">Next 7 Days</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <div className="text-2xl font-bold text-primary">2</div>
               <p className="text-sm text-muted-foreground">Next 15 Days</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <div className="text-2xl font-bold text-muted-foreground">2</div>
               <p className="text-sm text-muted-foreground">Next 30 Days</p>
             </CardContent>
           </Card>
         </div>
 
         {/* Tabs */}
         <Card>
           <CardContent className="pt-6">
             <Tabs defaultValue="today">
               <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
                 <TabsTrigger value="today" className="gap-2">
                   Due Today
                   <Badge variant="destructive" className="ml-1">2</Badge>
                 </TabsTrigger>
                 <TabsTrigger value="next7" className="gap-2">
                   Next 7 Days
                   <Badge variant="secondary" className="ml-1">3</Badge>
                 </TabsTrigger>
                 <TabsTrigger value="next15" className="gap-2">
                   Next 15 Days
                   <Badge variant="secondary" className="ml-1">2</Badge>
                 </TabsTrigger>
                 <TabsTrigger value="next30" className="gap-2">
                   Next 30 Days
                   <Badge variant="secondary" className="ml-1">2</Badge>
                 </TabsTrigger>
               </TabsList>
 
               <TabsContent value="today" className="mt-6">
                 <RenewalsTable data={renewalsData.today} />
               </TabsContent>
               <TabsContent value="next7" className="mt-6">
                 <RenewalsTable data={renewalsData.next7} />
               </TabsContent>
               <TabsContent value="next15" className="mt-6">
                 <RenewalsTable data={renewalsData.next15} />
               </TabsContent>
               <TabsContent value="next30" className="mt-6">
                 <RenewalsTable data={renewalsData.next30} />
               </TabsContent>
             </Tabs>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }