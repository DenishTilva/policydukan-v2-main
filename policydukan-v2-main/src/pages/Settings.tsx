 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Textarea } from '@/components/ui/textarea';
 import { Switch } from '@/components/ui/switch';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { User, Building2, CreditCard, Bell, Shield, Save, Upload, Lock } from 'lucide-react';
 
 export default function Settings() {
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div>
           <h1 className="text-2xl font-bold text-foreground">Settings</h1>
           <p className="text-muted-foreground">Manage your account and preferences</p>
         </div>
 
         <Tabs defaultValue="profile" className="space-y-6">
           <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-auto lg:inline-flex">
             <TabsTrigger value="profile" className="gap-2">
               <User className="w-4 h-4" />
               Profile
             </TabsTrigger>
             <TabsTrigger value="company" className="gap-2">
               <Building2 className="w-4 h-4" />
               Company
             </TabsTrigger>
             <TabsTrigger value="billing" className="gap-2">
               <CreditCard className="w-4 h-4" />
               Billing
             </TabsTrigger>
             <TabsTrigger value="security" className="gap-2">
               <Shield className="w-4 h-4" />
               Security
             </TabsTrigger>
           </TabsList>
 
           {/* Profile Tab */}
           <TabsContent value="profile">
             <Card>
               <CardHeader>
                 <CardTitle>Profile Settings</CardTitle>
                 <CardDescription>Update your personal information</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 {/* Avatar */}
                 <div className="flex items-center gap-6">
                   <Avatar className="w-20 h-20">
                     <AvatarImage src="" />
                     <AvatarFallback className="text-2xl bg-primary text-primary-foreground">RK</AvatarFallback>
                   </Avatar>
                   <div>
                     <Button variant="outline" size="sm">
                       <Upload className="w-4 h-4 mr-2" />
                       Change Photo
                     </Button>
                     <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                   </div>
                 </div>
 
                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Full Name</Label>
                     <Input defaultValue="Rajesh Kumar" />
                   </div>
                   <div className="space-y-2">
                     <Label>Email</Label>
                     <Input type="email" defaultValue="rajesh@policydukan.com" />
                   </div>
                   <div className="space-y-2">
                     <Label>Mobile</Label>
                     <Input defaultValue="+91 9876543210" />
                   </div>
                   <div className="space-y-2">
                     <Label>Designation</Label>
                     <Input defaultValue="Insurance Agent" />
                   </div>
                 </div>
 
                 <div className="flex justify-end">
                   <Button>
                     <Save className="w-4 h-4 mr-2" />
                     Save Changes
                   </Button>
                 </div>
               </CardContent>
             </Card>
 
             {/* Password Change */}
             <Card className="mt-6">
               <CardHeader>
                 <CardTitle>Change Password</CardTitle>
                 <CardDescription>Update your account password</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid md:grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <Label>Current Password</Label>
                     <Input type="password" placeholder="••••••••" />
                   </div>
                   <div className="space-y-2">
                     <Label>New Password</Label>
                     <Input type="password" placeholder="••••••••" />
                   </div>
                   <div className="space-y-2">
                     <Label>Confirm New Password</Label>
                     <Input type="password" placeholder="••••••••" />
                   </div>
                 </div>
                 <div className="flex justify-end">
                   <Button variant="outline">
                     <Lock className="w-4 h-4 mr-2" />
                     Update Password
                   </Button>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           {/* Company Tab */}
           <TabsContent value="company">
             <Card>
               <CardHeader>
                 <CardTitle>Company Details</CardTitle>
                 <CardDescription>Manage your agency or company information</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Company / Agency Name</Label>
                     <Input defaultValue="Kumar Insurance Agency" />
                   </div>
                   <div className="space-y-2">
                     <Label>GSTIN</Label>
                     <Input defaultValue="27AABCU9603R1ZM" />
                   </div>
                   <div className="space-y-2">
                     <Label>PAN Number</Label>
                     <Input defaultValue="AABCU9603R" />
                   </div>
                   <div className="space-y-2">
                     <Label>IRDAI License No</Label>
                     <Input placeholder="Enter IRDAI license number" />
                   </div>
                 </div>
 
                 <div className="space-y-2">
                   <Label>Address</Label>
                   <Textarea defaultValue="123, Business Center, Andheri West, Mumbai, Maharashtra - 400053" rows={3} />
                 </div>
 
                 <div className="grid md:grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <Label>City</Label>
                     <Input defaultValue="Mumbai" />
                   </div>
                   <div className="space-y-2">
                     <Label>State</Label>
                     <Select defaultValue="maharashtra">
                       <SelectTrigger>
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="maharashtra">Maharashtra</SelectItem>
                         <SelectItem value="delhi">Delhi</SelectItem>
                         <SelectItem value="karnataka">Karnataka</SelectItem>
                         <SelectItem value="gujarat">Gujarat</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="space-y-2">
                     <Label>PIN Code</Label>
                     <Input defaultValue="400053" />
                   </div>
                 </div>
 
                 <div className="flex justify-end">
                   <Button>
                     <Save className="w-4 h-4 mr-2" />
                     Save Company Details
                   </Button>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           {/* Billing Tab */}
           <TabsContent value="billing">
             <Card>
               <CardHeader>
                 <CardTitle>Billing & Plans</CardTitle>
                 <CardDescription>Manage your subscription and payment methods</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 {/* Current Plan */}
                 <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-semibold">Free Trial</p>
                       <p className="text-sm text-muted-foreground">5 days remaining</p>
                     </div>
                     <Button>Upgrade Plan</Button>
                   </div>
                 </div>
 
                 {/* Billing Details */}
                 <div className="space-y-4">
                   <h4 className="font-semibold">Billing Information</h4>
                   <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label>Billing Name</Label>
                       <Input defaultValue="Kumar Insurance Agency" />
                     </div>
                     <div className="space-y-2">
                       <Label>Billing Email</Label>
                       <Input type="email" defaultValue="billing@kumarinsurance.com" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <Label>Billing Address</Label>
                     <Textarea defaultValue="123, Business Center, Andheri West, Mumbai, Maharashtra - 400053" rows={2} />
                   </div>
                 </div>
 
                 {/* Payment Methods */}
                 <div className="space-y-4">
                   <h4 className="font-semibold">Payment Methods</h4>
                   <div className="text-center py-8 border-2 border-dashed rounded-lg">
                     <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                     <p className="text-muted-foreground">No payment methods added</p>
                     <Button variant="outline" className="mt-4">
                       Add Payment Method
                     </Button>
                   </div>
                 </div>
 
                 <div className="flex justify-end">
                   <Button>
                     <Save className="w-4 h-4 mr-2" />
                     Save Billing Info
                   </Button>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           {/* Security Tab */}
           <TabsContent value="security">
             <Card>
               <CardHeader>
                 <CardTitle>Security Settings</CardTitle>
                 <CardDescription>Manage your account security and data</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 {/* Two Factor */}
                 <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                   <div>
                     <p className="font-medium">Two-Factor Authentication</p>
                     <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                   </div>
                   <Switch />
                 </div>
 
                 {/* Session Management */}
                 <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                   <div>
                     <p className="font-medium">Active Sessions</p>
                     <p className="text-sm text-muted-foreground">Manage devices where you're logged in</p>
                   </div>
                   <Button variant="outline" size="sm">View Sessions</Button>
                 </div>
 
                 {/* Notifications */}
                 <div className="space-y-4">
                   <h4 className="font-semibold">Email Notifications</h4>
                   <div className="space-y-3">
                     <div className="flex items-center justify-between">
                       <div>
                         <p className="font-medium">Renewal Reminders</p>
                         <p className="text-sm text-muted-foreground">Get notified about upcoming renewals</p>
                       </div>
                       <Switch defaultChecked />
                     </div>
                     <div className="flex items-center justify-between">
                       <div>
                         <p className="font-medium">Commission Updates</p>
                         <p className="text-sm text-muted-foreground">Notifications about commission payouts</p>
                       </div>
                       <Switch defaultChecked />
                     </div>
                     <div className="flex items-center justify-between">
                       <div>
                         <p className="font-medium">Marketing Emails</p>
                         <p className="text-sm text-muted-foreground">Product updates and offers</p>
                       </div>
                       <Switch />
                     </div>
                   </div>
                 </div>
 
                 {/* Data Security Message */}
                 <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                   <div className="flex items-start gap-3">
                     <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                     <div>
                       <p className="font-semibold">Your Data is Secure</p>
                       <p className="text-sm text-muted-foreground mt-1">
                         PolicyDukan uses industry-standard encryption to protect your data. We never share your information with third parties.
                         All data is stored in secure Indian data centers and backed up daily.
                       </p>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
         </Tabs>
       </div>
     </DashboardLayout>
   );
 }