import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface PremiumValues {
  odPremium: string;
  tpPremium: string;
  netPremium: string;
  gst: string;
  grossPremium: string;
}

interface PremiumBreakdownProps {
  values: PremiumValues;
  onChange: (values: PremiumValues) => void;
}

export function PremiumBreakdown({ values, onChange }: PremiumBreakdownProps) {
  // Auto-calculate net, GST, and gross when OD or TP changes
  useEffect(() => {
    const od = parseFloat(values.odPremium) || 0;
    const tp = parseFloat(values.tpPremium) || 0;
    const net = od + tp;
    const gst = net * 0.18;
    const gross = net + gst;

    if (od > 0 || tp > 0) {
      onChange({
        ...values,
        netPremium: net.toFixed(2),
        gst: gst.toFixed(2),
        grossPremium: gross.toFixed(2),
      });
    }
  }, [values.odPremium, values.tpPremium]);

  const handleChange = (field: keyof PremiumValues, value: string) => {
    // Only allow numbers and decimal
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    onChange({ ...values, [field]: value });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Calculator className="h-4 w-4 text-primary" />
          Premium Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="odPremium">OD Premium (₹)</Label>
            <Input
              id="odPremium"
              placeholder="0.00"
              value={values.odPremium}
              onChange={(e) => handleChange("odPremium", e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tpPremium">TP Premium (₹)</Label>
            <Input
              id="tpPremium"
              placeholder="0.00"
              value={values.tpPremium}
              onChange={(e) => handleChange("tpPremium", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div className="border-t border-dashed pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Net Premium</span>
            <span className="font-mono font-medium">
              ₹{values.netPremium || "0.00"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">GST (18%)</span>
            <span className="font-mono text-muted-foreground">
              ₹{values.gst || "0.00"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold">Gross Premium</span>
            <span className="font-mono font-bold text-lg text-primary">
              ₹{values.grossPremium || "0.00"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
