import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';
import { CreditCard, Shield, Check, IndianRupee } from 'lucide-react';

interface SubscribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: { name: string; price: number; period: string } | null;
}

export function SubscribeDialog({ open, onOpenChange, plan }: SubscribeDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  if (!plan) return null;

  const gst = Math.round(plan.price * 0.18);
  const total = plan.price + gst;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to {plan.name}</DialogTitle>
          <DialogDescription>Complete your payment to activate your plan</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Plan Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{plan.name} Plan</p>
                <p className="text-sm text-muted-foreground">{plan.period}</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Selected</Badge>
            </div>
            <Separator className="my-3" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Plan Price</span><span className="font-medium">₹{plan.price.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span className="font-medium">₹{gst.toLocaleString('en-IN')}</span></div>
              <Separator />
              <div className="flex justify-between text-base"><span className="font-semibold text-foreground">Total</span><span className="font-bold text-foreground">₹{total.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'upi', label: 'UPI' },
                { value: 'card', label: 'Card' },
                { value: 'netbanking', label: 'Net Banking' },
              ].map((method) => (
                <button
                  key={method.value}
                  onClick={() => setPaymentMethod(method.value)}
                  className={`border rounded-lg p-3 text-sm font-medium transition-all ${
                    paymentMethod === method.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {paymentMethod === 'upi' && (
            <div className="space-y-2">
              <Label>UPI ID</Label>
              <Input placeholder="yourname@upi" />
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Card Number</Label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Expiry</Label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input placeholder="123" type="password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Name on Card</Label>
                <Input placeholder="Rajesh Kumar" />
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="space-y-2">
              <Label>Select Bank</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Choose your bank" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                  <SelectItem value="kotak">Kotak Mahindra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Coupon */}
          <div className="space-y-2">
            <Label>Coupon Code (optional)</Label>
            <div className="flex gap-2">
              <Input placeholder="Enter coupon code" className="flex-1" />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <Button className="w-full gap-2" size="lg" onClick={() => onOpenChange(false)}>
            <CreditCard className="w-4 h-4" />
            Pay ₹{total.toLocaleString('en-IN')}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" />
            Secured by Razorpay · 256-bit SSL encryption
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
