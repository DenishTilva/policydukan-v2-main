import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CustomerSearch } from "@/components/policies/CustomerSearch";
import { PremiumBreakdown } from "@/components/policies/PremiumBreakdown";
import { PaymentSection } from "@/components/policies/PaymentSection";
import { DocumentUpload } from "@/components/policies/DocumentUpload";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import {
  FileText,
  ArrowLeft,
  Save,
  Calendar,
  Building2,
  Car,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AxiosError } from "axios";

const insuranceCompanies = [
  "HDFC ERGO",
  "ICICI Lombard",
  "Bajaj Allianz",
  "New India Assurance",
  "United India Insurance",
  "Tata AIG",
  "Reliance General",
  "SBI General",
  "Cholamandalam",
  "Royal Sundaram",
];

const policyTypes = [
  { value: "motor", label: "Motor Insurance", icon: Car },
  { value: "health", label: "Health Insurance", icon: Shield },
  { value: "life", label: "Life Insurance", icon: Shield },
  { value: "fire", label: "Fire Insurance", icon: Shield },
  { value: "marine", label: "Marine Insurance", icon: Shield },
  { value: "other", label: "Other", icon: FileText },
];

const vehicleTypes = [
  "Car",
  "Two Wheeler",
  "Commercial",
  "Truck",
  "Bus",
  "Other",
];

export default function AddPolicy() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState<{
    name: string;
    mobile: string;
    email?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [policyDetails, setPolicyDetails] = useState({
    policyNumber: "",
    company: "",
    policyType: "",
    vehicleType: "",
    vehicleNumber: "",
    make: "",
    model: "",
    issueDate: "",
    inceptionDate: "",
    expiryDate: "",
    ncb: "",
    remarks: "",
  });

  const [premiumValues, setPremiumValues] = useState({
    odPremium: "",
    tpPremium: "",
    netPremium: "",
    gst: "",
    grossPremium: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    paymentMode: "",
    paymentStatus: "",
    amountReceived: "",
    transactionId: "",
    paymentDate: "",
    remarks: "",
  });

  const [documents, setDocuments] = useState<
    { id: string; name: string; size: number; type: string; category: string }[]
  >([]);

  const handlePolicyChange = (
    field: keyof typeof policyDetails,
    value: string,
  ) => {
    setPolicyDetails({ ...policyDetails, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!customerId || !customerData) {
      toast({
        title: "Validation Error",
        description: "Please select or add a customer",
        variant: "destructive",
      });
      return;
    }

    if (
      !policyDetails.policyNumber ||
      !policyDetails.company ||
      !policyDetails.issueDate ||
      !policyDetails.inceptionDate ||
      !policyDetails.expiryDate
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required policy details",
        variant: "destructive",
      });
      return;
    }

    if (
      !premiumValues.netPremium ||
      !premiumValues.gst ||
      !premiumValues.grossPremium
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in premium details",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        policyNumber: policyDetails.policyNumber,
        insurerId: policyDetails.company, // Using company name as insurerId
        policyTypeId: policyDetails.policyType, // Using policy type as policyTypeId
        issueDate: policyDetails.issueDate,
        inceptionDate: policyDetails.inceptionDate,
        expiryDate: policyDetails.expiryDate,
        customer: {
          firstName: customerData.name, // Use customer name instead of ID
          phone: customerData.mobile, // Use customer mobile
        },
        vehicleDetails: {
          vehicleType: policyDetails.vehicleType,
          vehicleNumber: policyDetails.vehicleNumber,
          make: policyDetails.make,
          model: policyDetails.model,
        },
        premiumDetails: {
          netPremium: parseFloat(premiumValues.netPremium),
          gstAmount: parseFloat(premiumValues.gst),
          grossPremium: parseFloat(premiumValues.grossPremium),
        },
        extraAttributes: {
          ncb: policyDetails.ncb,
          remarks: policyDetails.remarks,
        },
      };

      const response = await api.post("/policies", payload);

      if (response.data.success) {
        toast({
          title: "Success",
          description: `Policy ${policyDetails.policyNumber} has been created successfully.`,
        });

        // Redirect to policies list after successful creation
        setTimeout(() => {
          navigate("/policies");
        }, 1500);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Failed to create policy";
      setError(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/policies")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Add New Policy
              </h1>
              <p className="text-muted-foreground">
                Create a new insurance policy record
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/policies")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Policy
                </>
              )}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Selection */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label>Select Customer *</Label>
                    <CustomerSearch
                      value={customerId}
                      onChange={(id, customer) => {
                        setCustomerId(id);
                        if (customer) {
                          setCustomerData({
                            name: customer.name,
                            mobile: customer.mobile,
                            email: customer.email,
                          });
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Policy Details */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Policy Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Policy Number *</Label>
                      <Input
                        id="policyNumber"
                        placeholder="Enter policy number"
                        value={policyDetails.policyNumber}
                        onChange={(e) =>
                          handlePolicyChange("policyNumber", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Insurance Company *</Label>
                      <Select
                        value={policyDetails.company}
                        onValueChange={(v) => handlePolicyChange("company", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          {insuranceCompanies.map((company) => (
                            <SelectItem key={company} value={company}>
                              {company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Policy Type *</Label>
                      <Select
                        value={policyDetails.policyType}
                        onValueChange={(v) =>
                          handlePolicyChange("policyType", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {policyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <type.icon className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Vehicle Type</Label>
                      <Select
                        value={policyDetails.vehicleType}
                        onValueChange={(v) =>
                          handlePolicyChange("vehicleType", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                      <Input
                        id="vehicleNumber"
                        placeholder="MH 01 AB 1234"
                        value={policyDetails.vehicleNumber}
                        onChange={(e) =>
                          handlePolicyChange("vehicleNumber", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="make">Make</Label>
                      <Input
                        id="make"
                        placeholder="e.g., Maruti"
                        value={policyDetails.make}
                        onChange={(e) =>
                          handlePolicyChange("make", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        placeholder="e.g., Swift"
                        value={policyDetails.model}
                        onChange={(e) =>
                          handlePolicyChange("model", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Dates Section */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">
                        Important Dates
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="issueDate">Issue Date</Label>
                        <Input
                          id="issueDate"
                          type="date"
                          value={policyDetails.issueDate}
                          onChange={(e) =>
                            handlePolicyChange("issueDate", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inceptionDate">Inception Date *</Label>
                        <Input
                          id="inceptionDate"
                          type="date"
                          value={policyDetails.inceptionDate}
                          onChange={(e) =>
                            handlePolicyChange("inceptionDate", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          type="date"
                          value={policyDetails.expiryDate}
                          onChange={(e) =>
                            handlePolicyChange("expiryDate", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ncb">NCB (%)</Label>
                      <Select
                        value={policyDetails.ncb}
                        onValueChange={(v) => handlePolicyChange("ncb", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select NCB" />
                        </SelectTrigger>
                        <SelectContent>
                          {["0", "20", "25", "35", "45", "50"].map((ncb) => (
                            <SelectItem key={ncb} value={ncb}>
                              {ncb}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      placeholder="Any additional notes..."
                      value={policyDetails.remarks}
                      onChange={(e) =>
                        handlePolicyChange("remarks", e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Document Upload */}
              <DocumentUpload files={documents} onChange={setDocuments} />
            </div>

            {/* Right Column - Premium & Payment */}
            <div className="space-y-6">
              {/* Premium Breakdown */}
              <PremiumBreakdown
                values={premiumValues}
                onChange={setPremiumValues}
              />

              {/* Payment Section */}
              <PaymentSection
                values={paymentDetails}
                onChange={setPaymentDetails}
                grossPremium={premiumValues.grossPremium}
              />

              {/* Quick Actions Card */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Need Help?</p>
                      <p className="text-sm text-muted-foreground">
                        Contact support for assistance with policy creation
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Save Bar (Mobile) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
            <Button type="submit" className="w-full" size="lg">
              <Save className="h-4 w-4 mr-2" />
              Save Policy
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
