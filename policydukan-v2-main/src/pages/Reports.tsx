 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { FileText, RefreshCw, Users, IndianRupee, Download, FileSpreadsheet, File } from 'lucide-react';
 
 const reportTypes = [
   {
     id: 'policy',
     title: 'Policy Report',
     description: 'Complete list of all policies with details',
     icon: FileText,
     color: 'text-primary',
     bgColor: 'bg-primary/10',
   },
   {
     id: 'renewal',
     title: 'Renewal Due Report',
     description: 'Policies due for renewal in selected period',
     icon: RefreshCw,
     color: 'text-warning',
     bgColor: 'bg-warning/10',
   },
   {
     id: 'customer',
     title: 'Customer Report',
     description: 'Customer-wise policy and premium summary',
     icon: Users,
     color: 'text-success',
     bgColor: 'bg-success/10',
   },
   {
     id: 'commission',
     title: 'Commission Report',
     description: 'Commission earnings breakdown by policy',
     icon: IndianRupee,
     color: 'text-primary',
     bgColor: 'bg-primary/10',
   },
 ];
 
 export default function Reports() {
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div>
           <h1 className="text-2xl font-bold text-foreground">Reports</h1>
           <p className="text-muted-foreground">Generate and download business reports</p>
         </div>
 
         {/* Report Type Selection */}
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
           {reportTypes.map((report) => (
             <Card key={report.id} className="cursor-pointer hover:border-primary/50 transition-colors">
               <CardContent className="pt-6">
                 <div className={`w-12 h-12 rounded-lg ${report.bgColor} flex items-center justify-center mb-4`}>
                   <report.icon className={`w-6 h-6 ${report.color}`} />
                 </div>
                 <h3 className="font-semibold mb-1">{report.title}</h3>
                 <p className="text-sm text-muted-foreground">{report.description}</p>
               </CardContent>
             </Card>
           ))}
         </div>
 
         {/* Report Generator */}
         <Card>
           <CardHeader>
             <CardTitle>Generate Report</CardTitle>
             <CardDescription>Select report type and filters to generate your report</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="space-y-2">
                 <Label>Report Type</Label>
                 <Select>
                   <SelectTrigger>
                     <SelectValue placeholder="Select report" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="policy">Policy Report</SelectItem>
                     <SelectItem value="renewal">Renewal Due Report</SelectItem>
                     <SelectItem value="customer">Customer Report</SelectItem>
                     <SelectItem value="commission">Commission Report</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
 
               <div className="space-y-2">
                 <Label>From Date</Label>
                 <Input type="date" />
               </div>
 
               <div className="space-y-2">
                 <Label>To Date</Label>
                 <Input type="date" />
               </div>
 
               <div className="space-y-2">
                 <Label>Company</Label>
                 <Select>
                   <SelectTrigger>
                     <SelectValue placeholder="All Companies" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="all">All Companies</SelectItem>
                     <SelectItem value="icici">ICICI Lombard</SelectItem>
                     <SelectItem value="hdfc">HDFC ERGO</SelectItem>
                     <SelectItem value="bajaj">Bajaj Allianz</SelectItem>
                     <SelectItem value="new-india">New India</SelectItem>
                     <SelectItem value="sbi">SBI General</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>
 
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="space-y-2">
                 <Label>Policy Type</Label>
                 <Select>
                   <SelectTrigger>
                     <SelectValue placeholder="All Types" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="all">All Types</SelectItem>
                     <SelectItem value="motor">Motor</SelectItem>
                     <SelectItem value="health">Health</SelectItem>
                     <SelectItem value="life">Life</SelectItem>
                     <SelectItem value="fire">Fire</SelectItem>
                     <SelectItem value="travel">Travel</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
 
               <div className="space-y-2">
                 <Label>Status</Label>
                 <Select>
                   <SelectTrigger>
                     <SelectValue placeholder="All Status" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="all">All Status</SelectItem>
                     <SelectItem value="active">Active</SelectItem>
                     <SelectItem value="expired">Expired</SelectItem>
                     <SelectItem value="cancelled">Cancelled</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>
 
             {/* Export Options */}
             <div className="border-t pt-6">
               <h4 className="font-semibold mb-4">Export Format</h4>
               <div className="flex flex-wrap gap-3">
                 <Button className="gap-2">
                   <File className="w-4 h-4" />
                   Download PDF
                 </Button>
                 <Button variant="outline" className="gap-2">
                   <FileSpreadsheet className="w-4 h-4" />
                   Download Excel
                 </Button>
                 <Button variant="outline" className="gap-2">
                   <Download className="w-4 h-4" />
                   Download CSV
                 </Button>
               </div>
             </div>
           </CardContent>
         </Card>
 
         {/* Recent Reports */}
         <Card>
           <CardHeader>
             <CardTitle>Recent Reports</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-3">
               {[
                 { name: 'Policy Report - Feb 2024', date: '2024-02-28', type: 'PDF', size: '2.4 MB' },
                 { name: 'Commission Report - Jan 2024', date: '2024-02-01', type: 'Excel', size: '1.8 MB' },
                 { name: 'Renewal Due Report - Q1 2024', date: '2024-01-15', type: 'PDF', size: '3.1 MB' },
               ].map((report, index) => (
                 <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <FileText className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                       <p className="font-medium">{report.name}</p>
                       <p className="text-sm text-muted-foreground">Generated on {report.date} • {report.size}</p>
                     </div>
                   </div>
                   <Button variant="ghost" size="sm">
                     <Download className="w-4 h-4" />
                   </Button>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }