 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Badge } from '@/components/ui/badge';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { Search, RefreshCw, FileText, User, Calendar, IndianRupee } from 'lucide-react';
 
 export default function RenewPolicy() {
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
 
   const samplePolicy = {
     policyNo: 'POL-2024-001',
     customer: 'Rajesh Kumar',
     mobile: '9876543210',
     email: 'rajesh@email.com',
     company: 'ICICI Lombard',
     type: 'Motor - Comprehensive',
     vehicleNo: 'MH01AB1234',
     expiredOn: '2024-01-15',
     previousPremium: 15000,
   };
 
   const handleSearch = () => {
     if (searchTerm) {
       setSelectedPolicy(samplePolicy);
     }
   };
 
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div>
           <h1 className="text-2xl font-bold text-foreground">Renew Policy</h1>
           <p className="text-muted-foreground">Search and renew an existing policy</p>
         </div>
 
         {/* Search Section */}
         <Card>
           <CardHeader>
             <CardTitle className="text-lg">Find Policy</CardTitle>
             <CardDescription>Search by policy number, customer name, or mobile number</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="flex gap-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                 <Input
                   placeholder="Enter policy number, customer name, or mobile..."
                   className="pl-10"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                 />
               </div>
               <Button onClick={handleSearch}>
                 <Search className="w-4 h-4 mr-2" />
                 Search
               </Button>
             </div>
           </CardContent>
         </Card>
 
         {selectedPolicy && (
           <div className="grid lg:grid-cols-3 gap-6">
             {/* Previous Policy Details */}
             <Card className="lg:col-span-1">
               <CardHeader>
                 <div className="flex items-center justify-between">
                   <CardTitle className="text-lg">Previous Policy</CardTitle>
                   <Badge variant="destructive">Expired</Badge>
                 </div>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                   <FileText className="w-5 h-5 text-primary" />
                   <div>
                     <p className="text-sm text-muted-foreground">Policy No</p>
                     <p className="font-semibold">{selectedPolicy.policyNo}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                   <User className="w-5 h-5 text-primary" />
                   <div>
                     <p className="text-sm text-muted-foreground">Customer</p>
                     <p className="font-semibold">{selectedPolicy.customer}</p>
                     <p className="text-sm text-muted-foreground">{selectedPolicy.mobile}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                   <Calendar className="w-5 h-5 text-destructive" />
                   <div>
                     <p className="text-sm text-muted-foreground">Expired On</p>
                     <p className="font-semibold text-destructive">{selectedPolicy.expiredOn}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                   <IndianRupee className="w-5 h-5 text-primary" />
                   <div>
                     <p className="text-sm text-muted-foreground">Previous Premium</p>
                     <p className="font-semibold">₹{selectedPolicy.previousPremium.toLocaleString()}</p>
                   </div>
                 </div>
                 <div className="pt-2">
                   <p className="text-sm text-muted-foreground mb-1">Company</p>
                   <p className="font-medium">{selectedPolicy.company}</p>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground mb-1">Policy Type</p>
                   <p className="font-medium">{selectedPolicy.type}</p>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground mb-1">Vehicle No</p>
                   <p className="font-medium">{selectedPolicy.vehicleNo}</p>
                 </div>
               </CardContent>
             </Card>
 
             {/* Renewal Form */}
             <Card className="lg:col-span-2">
               <CardHeader>
                 <CardTitle className="text-lg flex items-center gap-2">
                   <RefreshCw className="w-5 h-5 text-success" />
                   Renewal Details
                 </CardTitle>
                 <CardDescription>Enter new policy details for renewal</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>New Policy Number</Label>
                     <Input placeholder="Enter new policy number" />
                   </div>
                   <div className="space-y-2">
                     <Label>Insurance Company</Label>
                     <Select defaultValue="icici">
                       <SelectTrigger>
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="icici">ICICI Lombard</SelectItem>
                         <SelectItem value="hdfc">HDFC ERGO</SelectItem>
                         <SelectItem value="bajaj">Bajaj Allianz</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
 
                 <div className="grid md:grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <Label>Issue Date</Label>
                     <Input type="date" />
                   </div>
                   <div className="space-y-2">
                     <Label>Start Date</Label>
                     <Input type="date" />
                   </div>
                   <div className="space-y-2">
                     <Label>Expiry Date</Label>
                     <Input type="date" />
                   </div>
                 </div>
 
                 <div className="border-t pt-6">
                   <h4 className="font-semibold mb-4">Premium Details</h4>
                   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                     <div className="space-y-2">
                       <Label>OD Premium</Label>
                       <Input type="number" placeholder="0" />
                     </div>
                     <div className="space-y-2">
                       <Label>TP Premium</Label>
                       <Input type="number" placeholder="0" />
                     </div>
                     <div className="space-y-2">
                       <Label>Net Premium</Label>
                       <Input type="number" placeholder="0" readOnly className="bg-muted" />
                     </div>
                     <div className="space-y-2">
                       <Label>Gross Premium</Label>
                       <Input type="number" placeholder="0" readOnly className="bg-muted" />
                     </div>
                   </div>
                 </div>
 
                 <div className="border-t pt-6">
                   <h4 className="font-semibold mb-4">Payment</h4>
                   <div className="grid md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                       <Label>Payment Mode</Label>
                       <Select>
                         <SelectTrigger>
                           <SelectValue placeholder="Select mode" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="cash">Cash</SelectItem>
                           <SelectItem value="upi">UPI</SelectItem>
                           <SelectItem value="bank">Bank Transfer</SelectItem>
                           <SelectItem value="cheque">Cheque</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="space-y-2">
                       <Label>Amount Received</Label>
                       <Input type="number" placeholder="0" />
                     </div>
                     <div className="space-y-2">
                       <Label>Payment Date</Label>
                       <Input type="date" />
                     </div>
                   </div>
                 </div>
 
                 <div className="flex justify-end gap-3 pt-4">
                   <Button variant="outline">Cancel</Button>
                   <Button className="bg-success hover:bg-success/90">
                     <RefreshCw className="w-4 h-4 mr-2" />
                     Complete Renewal
                   </Button>
                 </div>
               </CardContent>
             </Card>
           </div>
         )}
 
         {!selectedPolicy && (
           <Card>
             <CardContent className="py-16 text-center">
               <RefreshCw className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
               <h3 className="text-lg font-semibold mb-2">Search for a Policy</h3>
               <p className="text-muted-foreground">Enter a policy number, customer name, or mobile number to begin renewal</p>
             </CardContent>
           </Card>
         )}
       </div>
     </DashboardLayout>
   );
 }