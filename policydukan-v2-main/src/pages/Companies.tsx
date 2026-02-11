 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
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
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from '@/components/ui/dialog';
 import { Search, Plus, Edit, Building2 } from 'lucide-react';
 
 const companiesData = [
   { id: 1, name: 'ICICI Lombard', type: 'General', motorRate: 15, healthRate: 20, fireRate: 12, policies: 45, status: 'active' },
   { id: 2, name: 'HDFC ERGO', type: 'General', motorRate: 14, healthRate: 18, fireRate: 10, policies: 38, status: 'active' },
   { id: 3, name: 'Bajaj Allianz', type: 'General', motorRate: 15, healthRate: 22, fireRate: 11, policies: 32, status: 'active' },
   { id: 4, name: 'New India Assurance', type: 'PSU', motorRate: 12, healthRate: 15, fireRate: 10, policies: 28, status: 'active' },
   { id: 5, name: 'SBI General', type: 'PSU', motorRate: 13, healthRate: 16, fireRate: 11, policies: 22, status: 'active' },
   { id: 6, name: 'LIC of India', type: 'Life', motorRate: 0, healthRate: 25, fireRate: 0, policies: 15, status: 'active' },
 ];
 
 export default function Companies() {
   const [searchTerm, setSearchTerm] = useState('');
 
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Companies</h1>
             <p className="text-muted-foreground">Manage insurance companies and commission rates</p>
           </div>
           <Dialog>
             <DialogTrigger asChild>
               <Button>
                 <Plus className="w-4 h-4 mr-2" />
                 Add Company
               </Button>
             </DialogTrigger>
             <DialogContent>
               <DialogHeader>
                 <DialogTitle>Add Insurance Company</DialogTitle>
                 <DialogDescription>Add a new insurance company with commission rates</DialogDescription>
               </DialogHeader>
               <div className="space-y-4 pt-4">
                 <div className="space-y-2">
                   <Label>Company Name</Label>
                   <Input placeholder="Enter company name" />
                 </div>
                 <div className="space-y-2">
                   <Label>Company Type</Label>
                   <Input placeholder="General / Life / PSU" />
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <Label>Motor Rate (%)</Label>
                     <Input type="number" placeholder="0" />
                   </div>
                   <div className="space-y-2">
                     <Label>Health Rate (%)</Label>
                     <Input type="number" placeholder="0" />
                   </div>
                   <div className="space-y-2">
                     <Label>Fire Rate (%)</Label>
                     <Input type="number" placeholder="0" />
                   </div>
                 </div>
                 <div className="flex justify-end gap-3 pt-4">
                   <Button variant="outline">Cancel</Button>
                   <Button>Add Company</Button>
                 </div>
               </div>
             </DialogContent>
           </Dialog>
         </div>
 
         {/* Stats */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           <Card>
             <CardContent className="pt-6">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <Building2 className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">6</p>
                   <p className="text-sm text-muted-foreground">Total Companies</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <p className="text-2xl font-bold">4</p>
               <p className="text-sm text-muted-foreground">General Insurance</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <p className="text-2xl font-bold">1</p>
               <p className="text-sm text-muted-foreground">Life Insurance</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <p className="text-2xl font-bold">180</p>
               <p className="text-sm text-muted-foreground">Total Policies</p>
             </CardContent>
           </Card>
         </div>
 
         {/* Search */}
         <Card>
           <CardContent className="pt-6">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
               <Input
                 placeholder="Search companies..."
                 className="pl-10"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
           </CardContent>
         </Card>
 
         {/* Table */}
         <Card>
           <CardHeader>
             <CardTitle>Insurance Companies</CardTitle>
           </CardHeader>
           <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Company Name</TableHead>
                   <TableHead>Type</TableHead>
                   <TableHead className="text-center">Motor Rate</TableHead>
                   <TableHead className="text-center">Health Rate</TableHead>
                   <TableHead className="text-center">Fire Rate</TableHead>
                   <TableHead className="text-center">Policies</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {companiesData.map((company) => (
                   <TableRow key={company.id}>
                     <TableCell>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                           <Building2 className="w-5 h-5 text-primary" />
                         </div>
                         <span className="font-medium">{company.name}</span>
                       </div>
                     </TableCell>
                     <TableCell>
                       <Badge variant="secondary">{company.type}</Badge>
                     </TableCell>
                     <TableCell className="text-center">{company.motorRate > 0 ? `${company.motorRate}%` : '-'}</TableCell>
                     <TableCell className="text-center">{company.healthRate > 0 ? `${company.healthRate}%` : '-'}</TableCell>
                     <TableCell className="text-center">{company.fireRate > 0 ? `${company.fireRate}%` : '-'}</TableCell>
                     <TableCell className="text-center font-medium">{company.policies}</TableCell>
                     <TableCell>
                       <Badge className="bg-success">Active</Badge>
                     </TableCell>
                     <TableCell>
                       <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                         <Edit className="w-4 h-4" />
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