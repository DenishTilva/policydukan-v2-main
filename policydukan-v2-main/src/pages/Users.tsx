 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Badge } from '@/components/ui/badge';
 import { Checkbox } from '@/components/ui/checkbox';
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
 import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from '@/components/ui/dialog';
 import { Search, Plus, Edit, Trash2, UserCog, Shield } from 'lucide-react';
 
 const usersData = [
   { id: 1, name: 'Rajesh Kumar', email: 'rajesh@policydukan.com', mobile: '9876543210', role: 'Admin', status: 'active', lastLogin: '2024-03-01 10:30 AM' },
   { id: 2, name: 'Priya Sharma', email: 'priya@policydukan.com', mobile: '9876543211', role: 'Agent', status: 'active', lastLogin: '2024-03-01 09:15 AM' },
   { id: 3, name: 'Amit Patel', email: 'amit@policydukan.com', mobile: '9876543212', role: 'Agent', status: 'active', lastLogin: '2024-02-28 04:45 PM' },
   { id: 4, name: 'Sunita Devi', email: 'sunita@policydukan.com', mobile: '9876543213', role: 'Viewer', status: 'inactive', lastLogin: '2024-02-15 11:00 AM' },
 ];
 
 const permissions = [
   { id: 'dashboard', label: 'Dashboard', description: 'View dashboard and analytics' },
   { id: 'policies', label: 'Policies', description: 'Manage policies (view, add, edit, delete)' },
   { id: 'customers', label: 'Customers', description: 'Manage customer records' },
   { id: 'leads', label: 'Leads', description: 'Manage leads and pipeline' },
   { id: 'renewals', label: 'Renewals', description: 'Handle policy renewals' },
   { id: 'commissions', label: 'Commissions', description: 'View commission reports' },
   { id: 'reports', label: 'Reports', description: 'Generate and download reports' },
   { id: 'users', label: 'Users', description: 'Manage staff and permissions' },
   { id: 'settings', label: 'Settings', description: 'Access system settings' },
 ];
 
 export default function Users() {
   const [searchTerm, setSearchTerm] = useState('');
 
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Users / Staff</h1>
             <p className="text-muted-foreground">Manage team members and their permissions</p>
           </div>
           <Dialog>
             <DialogTrigger asChild>
               <Button>
                 <Plus className="w-4 h-4 mr-2" />
                 Add User
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                 <DialogTitle>Add New User</DialogTitle>
                 <DialogDescription>Create a new team member account with specific permissions</DialogDescription>
               </DialogHeader>
               <div className="space-y-6 pt-4">
                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Full Name</Label>
                     <Input placeholder="Enter full name" />
                   </div>
                   <div className="space-y-2">
                     <Label>Email</Label>
                     <Input type="email" placeholder="Enter email" />
                   </div>
                   <div className="space-y-2">
                     <Label>Mobile</Label>
                     <Input placeholder="Enter mobile number" />
                   </div>
                   <div className="space-y-2">
                     <Label>Role</Label>
                     <Select>
                       <SelectTrigger>
                         <SelectValue placeholder="Select role" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="admin">Admin</SelectItem>
                         <SelectItem value="agent">Agent</SelectItem>
                         <SelectItem value="viewer">Viewer</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
 
                 <div className="space-y-4">
                   <Label className="text-base font-semibold">Module Permissions</Label>
                   <div className="grid gap-3">
                     {permissions.map((perm) => (
                       <div key={perm.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                         <Checkbox id={perm.id} className="mt-0.5" />
                         <div>
                           <label htmlFor={perm.id} className="font-medium cursor-pointer">{perm.label}</label>
                           <p className="text-sm text-muted-foreground">{perm.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
 
                 <div className="flex justify-end gap-3">
                   <Button variant="outline">Cancel</Button>
                   <Button>Create User</Button>
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
                   <UserCog className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">4</p>
                   <p className="text-sm text-muted-foreground">Total Users</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                   <Shield className="w-5 h-5 text-success" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">1</p>
                   <p className="text-sm text-muted-foreground">Admins</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <p className="text-2xl font-bold text-success">3</p>
               <p className="text-sm text-muted-foreground">Active Users</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="pt-6">
               <p className="text-2xl font-bold text-muted-foreground">1</p>
               <p className="text-sm text-muted-foreground">Inactive Users</p>
             </CardContent>
           </Card>
         </div>
 
         {/* Search */}
         <Card>
           <CardContent className="pt-6">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
               <Input
                 placeholder="Search users by name, email, or mobile..."
                 className="pl-10"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
           </CardContent>
         </Card>
 
         {/* Table */}
         <Card>
           <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>User</TableHead>
                   <TableHead>Mobile</TableHead>
                   <TableHead>Role</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Last Login</TableHead>
                   <TableHead>Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {usersData.map((user) => (
                   <TableRow key={user.id}>
                     <TableCell>
                       <div>
                         <p className="font-medium">{user.name}</p>
                         <p className="text-sm text-muted-foreground">{user.email}</p>
                       </div>
                     </TableCell>
                     <TableCell>{user.mobile}</TableCell>
                     <TableCell>
                       <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                         {user.role}
                       </Badge>
                     </TableCell>
                     <TableCell>
                       <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={user.status === 'active' ? 'bg-success' : ''}>
                         {user.status === 'active' ? 'Active' : 'Inactive'}
                       </Badge>
                     </TableCell>
                     <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                     <TableCell>
                       <div className="flex gap-1">
                         <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                           <Edit className="w-4 h-4" />
                         </Button>
                         <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive">
                           <Trash2 className="w-4 h-4" />
                         </Button>
                       </div>
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