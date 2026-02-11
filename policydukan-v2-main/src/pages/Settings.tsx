import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Building2,
  CreditCard,
  Bell,
  Shield,
  Save,
  Upload,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AxiosError } from "axios";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetching(true);
        setError(null);
        const response = await api.get("/users/profile");

        if (response.data.success) {
          setProfileData({
            name: response.data.data.name || "",
            email: response.data.data.email || "",
            mobile: response.data.data.mobile || "",
          });
        }
      } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        const message =
          axiosError.response?.data?.message || "Failed to fetch profile";
        setError(message);
      } finally {
        setFetching(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await api.put("/users/profile", {
        name: profileData.name,
        mobile: profileData.mobile,
      });

      if (response.data.success) {
        setSuccess(true);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        // Auto-hide success after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Failed to update profile";
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

  const getInitials = () => {
    return (
      profileData.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
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
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {fetching ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <p className="ml-2 text-muted-foreground">
                      Loading profile...
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Error Alert */}
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Success Alert */}
                    {success && (
                      <Alert className="bg-green-50 border-green-200">
                        <AlertDescription className="text-green-700">
                          ✓ Profile updated successfully
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" disabled>
                          <Upload className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          JPG, PNG or GIF. Max 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          placeholder="Email cannot be changed"
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number *</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          value={profileData.mobile}
                          onChange={handleChange}
                          placeholder="Enter your mobile number"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => location.reload()}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>
                  Manage your agency or company information
                </CardDescription>
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
                  <Textarea
                    defaultValue="123, Business Center, Andheri West, Mumbai, Maharashtra - 400053"
                    rows={3}
                  />
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
                <CardDescription>
                  Manage your subscription and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Free Trial</p>
                      <p className="text-sm text-muted-foreground">
                        5 days remaining
                      </p>
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
                      <Input
                        type="email"
                        defaultValue="billing@kumarinsurance.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Billing Address</Label>
                    <Textarea
                      defaultValue="123, Business Center, Andheri West, Mumbai, Maharashtra - 400053"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Payment Methods</h4>
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No payment methods added
                    </p>
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
                <CardDescription>
                  Manage your account security and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Two Factor */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>

                {/* Session Management */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Active Sessions</p>
                    <p className="text-sm text-muted-foreground">
                      Manage devices where you're logged in
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Sessions
                  </Button>
                </div>

                {/* Notifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Renewal Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about upcoming renewals
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Commission Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications about commission payouts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">
                          Product updates and offers
                        </p>
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
                        PolicyDukan uses industry-standard encryption to protect
                        your data. We never share your information with third
                        parties. All data is stored in secure Indian data
                        centers and backed up daily.
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
