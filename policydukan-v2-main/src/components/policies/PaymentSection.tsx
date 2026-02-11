import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Wallet, Building2, Smartphone, Banknote } from "lucide-react";

interface PaymentDetails {
  paymentMode: string;
  paymentStatus: string;
  amountReceived: string;
  transactionId: string;
  paymentDate: string;
  remarks: string;
}

interface PaymentSectionProps {
  values: PaymentDetails;
  onChange: (values: PaymentDetails) => void;
  grossPremium: string;
}

const paymentModes = [
  { value: "cash", label: "Cash", icon: Banknote },
  { value: "upi", label: "UPI", icon: Smartphone },
  { value: "netbanking", label: "Net Banking", icon: Building2 },
  { value: "card", label: "Card", icon: CreditCard },
  { value: "cheque", label: "Cheque", icon: Wallet },
];

export function PaymentSection({ values, onChange, grossPremium }: PaymentSectionProps) {
  const handleChange = (field: keyof PaymentDetails, value: string) => {
    onChange({ ...values, [field]: value });
  };

  const pendingAmount =
    (parseFloat(grossPremium) || 0) - (parseFloat(values.amountReceived) || 0);

  return (
    <Card className="border-success/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-success" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Payment Mode *</Label>
            <Select
              value={values.paymentMode}
              onValueChange={(v) => handleChange("paymentMode", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                {paymentModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    <div className="flex items-center gap-2">
                      <mode.icon className="h-4 w-4" />
                      {mode.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Payment Status *</Label>
            <Select
              value={values.paymentStatus}
              onValueChange={(v) => handleChange("paymentStatus", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    Paid
                  </span>
                </SelectItem>
                <SelectItem value="partial">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-warning" />
                    Partial
                  </span>
                </SelectItem>
                <SelectItem value="pending">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-destructive" />
                    Pending
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amountReceived">Amount Received (₹)</Label>
            <Input
              id="amountReceived"
              placeholder="0.00"
              value={values.amountReceived}
              onChange={(e) => handleChange("amountReceived", e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transactionId">Transaction ID / Reference</Label>
            <Input
              id="transactionId"
              placeholder="Enter transaction ID"
              value={values.transactionId}
              onChange={(e) => handleChange("transactionId", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentDate">Payment Date</Label>
          <Input
            id="paymentDate"
            type="date"
            value={values.paymentDate}
            onChange={(e) => handleChange("paymentDate", e.target.value)}
          />
        </div>

        {/* Payment Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Premium</span>
            <span className="font-mono">₹{grossPremium || "0.00"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount Received</span>
            <span className="font-mono text-success">
              ₹{values.amountReceived || "0.00"}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-dashed">
            <span className="font-medium">Pending Amount</span>
            <span
              className={`font-mono font-bold ${
                pendingAmount > 0 ? "text-destructive" : "text-success"
              }`}
            >
              ₹{pendingAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea
            id="remarks"
            placeholder="Any additional notes about payment..."
            value={values.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}
