 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Progress } from '@/components/ui/progress';
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
 import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertTriangle, Download, ArrowRight, Eye } from 'lucide-react';
 
 const importHistory = [
   { id: 1, filename: 'policies_jan_2024.xlsx', date: '2024-02-28', total: 150, success: 145, failed: 5, status: 'completed' },
   { id: 2, filename: 'customers_batch.xlsx', date: '2024-02-25', total: 200, success: 200, failed: 0, status: 'completed' },
   { id: 3, filename: 'leads_feb.xlsx', date: '2024-02-20', total: 80, success: 0, failed: 80, status: 'failed' },
   { id: 4, filename: 'renewals_data.xlsx', date: '2024-02-15', total: 100, success: 98, failed: 2, status: 'completed' },
 ];
 
 const excelColumns = ['Policy Number', 'Customer Name', 'Mobile', 'Email', 'Company', 'Policy Type', 'Premium', 'Issue Date', 'Expiry Date'];
 const systemFields = ['policy_no', 'customer_name', 'mobile', 'email', 'company', 'policy_type', 'premium', 'issue_date', 'expiry_date', 'vehicle_no', 'address', 'notes'];
 
 export default function Imports() {
   const [uploadStep, setUploadStep] = useState<'upload' | 'mapping' | 'validate' | 'complete'>('upload');
   const [dragActive, setDragActive] = useState(false);
 
   return (
     <DashboardLayout>
       <div className="space-y-6">
         {/* Header */}
         <div>
           <h1 className="text-2xl font-bold text-foreground">Imports</h1>
           <p className="text-muted-foreground">Import data from Excel files</p>
         </div>
 
         {/* Upload Section */}
         <Card>
           <CardHeader>
             <CardTitle>Import Data</CardTitle>
             <CardDescription>Upload an Excel file to import policies, customers, or leads</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             {/* Upload Area */}
             <div
               className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                 dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
               }`}
               onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
               onDragLeave={() => setDragActive(false)}
               onDrop={() => setDragActive(false)}
             >
               <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
               <h3 className="text-lg font-semibold mb-2">Drop your Excel file here</h3>
               <p className="text-muted-foreground mb-4">or click to browse</p>
               <Button>
                 <FileSpreadsheet className="w-4 h-4 mr-2" />
                 Select File
               </Button>
               <p className="text-xs text-muted-foreground mt-4">Supported formats: .xlsx, .xls, .csv</p>
             </div>
 
             {/* Import Type */}
             <div className="flex items-center gap-4">
               <span className="text-sm font-medium">Import Type:</span>
               <Select defaultValue="policies">
                 <SelectTrigger className="w-48">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="policies">Policies</SelectItem>
                   <SelectItem value="customers">Customers</SelectItem>
                   <SelectItem value="leads">Leads</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </CardContent>
         </Card>
 
         {/* Mapping Dialog */}
         <Dialog>
           <DialogTrigger asChild>
             <Button variant="outline" className="hidden">Open Mapping</Button>
           </DialogTrigger>
           <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
             <DialogHeader>
               <DialogTitle>Map Excel Columns</DialogTitle>
               <DialogDescription>Match your Excel columns to system fields</DialogDescription>
             </DialogHeader>
             <div className="space-y-4 pt-4">
               <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center font-medium text-sm bg-muted p-3 rounded-lg">
                 <span>Excel Column</span>
                 <span></span>
                 <span>System Field</span>
               </div>
               {excelColumns.map((col, index) => (
                 <div key={col} className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                   <div className="p-3 bg-muted/50 rounded-lg font-medium">{col}</div>
                   <ArrowRight className="w-5 h-5 text-muted-foreground" />
                   <Select defaultValue={systemFields[index]}>
                     <SelectTrigger>
                       <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="">-- Skip --</SelectItem>
                       {systemFields.map((field) => (
                         <SelectItem key={field} value={field}>{field}</SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
               ))}
               <div className="flex justify-end gap-3 pt-4">
                 <Button variant="outline">Cancel</Button>
                 <Button>Validate & Import</Button>
               </div>
             </div>
           </DialogContent>
         </Dialog>
 
         {/* Import History */}
         <Card>
           <CardHeader>
             <CardTitle>Import History</CardTitle>
           </CardHeader>
           <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>File Name</TableHead>
                   <TableHead>Date</TableHead>
                   <TableHead>Total Rows</TableHead>
                   <TableHead>Success</TableHead>
                   <TableHead>Failed</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {importHistory.map((item) => (
                   <TableRow key={item.id}>
                     <TableCell>
                       <div className="flex items-center gap-2">
                         <FileSpreadsheet className="w-4 h-4 text-success" />
                         <span className="font-medium">{item.filename}</span>
                       </div>
                     </TableCell>
                     <TableCell>{item.date}</TableCell>
                     <TableCell>{item.total}</TableCell>
                     <TableCell>
                       <span className="flex items-center gap-1 text-success">
                         <CheckCircle className="w-4 h-4" />
                         {item.success}
                       </span>
                     </TableCell>
                     <TableCell>
                       {item.failed > 0 ? (
                         <span className="flex items-center gap-1 text-destructive">
                           <XCircle className="w-4 h-4" />
                           {item.failed}
                         </span>
                       ) : (
                         <span className="text-muted-foreground">0</span>
                       )}
                     </TableCell>
                     <TableCell>
                       <Badge variant={item.status === 'completed' ? 'default' : 'destructive'} className={item.status === 'completed' ? 'bg-success' : ''}>
                         {item.status === 'completed' ? 'Completed' : 'Failed'}
                       </Badge>
                     </TableCell>
                     <TableCell>
                       <div className="flex gap-1">
                         <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                           <Eye className="w-4 h-4" />
                         </Button>
                         {item.failed > 0 && (
                           <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive">
                             <Download className="w-4 h-4" />
                           </Button>
                         )}
                       </div>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </CardContent>
         </Card>
 
         {/* Error Report Example */}
         <Card className="border-destructive/50">
           <CardHeader>
             <div className="flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-destructive" />
               <CardTitle className="text-destructive">Error Report - leads_feb.xlsx</CardTitle>
             </div>
             <CardDescription>5 rows failed validation</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Row #</TableHead>
                   <TableHead>Field</TableHead>
                   <TableHead>Value</TableHead>
                   <TableHead>Error</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 <TableRow>
                   <TableCell>5</TableCell>
                   <TableCell>mobile</TableCell>
                   <TableCell className="text-destructive">123456</TableCell>
                   <TableCell>Invalid mobile number format</TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell>12</TableCell>
                   <TableCell>email</TableCell>
                   <TableCell className="text-destructive">invalid-email</TableCell>
                   <TableCell>Invalid email format</TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell>18</TableCell>
                   <TableCell>policy_no</TableCell>
                   <TableCell className="text-destructive">(empty)</TableCell>
                   <TableCell>Required field is empty</TableCell>
                 </TableRow>
               </TableBody>
             </Table>
             <Button variant="outline" className="gap-2">
               <Download className="w-4 h-4" />
               Download Error Report
             </Button>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }