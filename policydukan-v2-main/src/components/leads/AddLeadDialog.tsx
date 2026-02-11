import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLeadDialog({ open, onOpenChange }: AddLeadDialogProps) {
  const [followUpDate, setFollowUpDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>Enter lead details to add to your pipeline</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name *</Label>
              <Input placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label>Last Name *</Label>
              <Input placeholder="Enter last name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email *</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>

          <div className="space-y-2">
            <Label>Phone *</Label>
            <Input placeholder="+91 98765 00000" />
          </div>

          <div className="space-y-2">
            <Label>Insurance Type *</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="motor">Motor Insurance</SelectItem>
                <SelectItem value="health">Health Insurance</SelectItem>
                <SelectItem value="life">Life Insurance</SelectItem>
                <SelectItem value="home">Home Insurance</SelectItem>
                <SelectItem value="travel">Travel Insurance</SelectItem>
                <SelectItem value="commercial">Commercial Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lead Source</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="cold-call">Cold Call</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="walk-in">Walk-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estimated Value (₹)</Label>
              <Input type="number" placeholder="0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pipeline Stage</Label>
            <Select defaultValue="new">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Follow-up Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !followUpDate && "text-muted-foreground")}>
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {followUpDate ? format(followUpDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={followUpDate} onSelect={setFollowUpDate} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea placeholder="Additional details about this lead..." rows={3} />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => onOpenChange(false)}>Add Lead</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
