import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Crown, Calendar, CreditCard, Shield, Users, FileText, BarChart3 } from 'lucide-react';
import { SubscribeDialog } from '@/components/plans/SubscribeDialog';

const features = [
  { icon: FileText, label: 'Unlimited Policies' },
  { icon: Users, label: 'Unlimited Customers' },
  { icon: BarChart3, label: 'Advanced Reports' },
  { icon: Shield, label: 'Data Backup' },
  { icon: Users, label: 'Up to 5 Staff Users' },
  { icon: CreditCard, label: 'Commission Tracking' },
];

export default function Plans() {
  const [subscribePlan, setSubscribePlan] = useState<{ name: string; price: number; period: string } | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Plans & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription and billing</p>
        </div>

        {/* Current Plan Status */}
        <Card className="border-warning/50 bg-gradient-to-r from-warning/5 to-warning/10">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-warning/20 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-warning" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Free Trial</h2>
                    <Badge className="bg-warning text-warning-foreground">Active</Badge>
                  </div>
                  <p className="text-muted-foreground">Your trial expires in 5 days</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="gap-2"><Calendar className="w-4 h-4" /> Extend Trial</Button>
                <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80" onClick={() => setSubscribePlan({ name: 'First Year', price: 10000, period: '1 Year' })}>
                  <Crown className="w-4 h-4" /> Upgrade Now
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Trial Progress</span>
                <span className="font-medium">2 of 7 days used</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="relative">
            <CardHeader>
              <CardTitle>Free Trial</CardTitle>
              <CardDescription>Try all features for 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-muted-foreground"> / 7 days</span>
              </div>
              <ul className="space-y-3">
                {features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2"><Check className="w-5 h-5 text-success" /><span>{feature.label}</span></li>
                ))}
                <li className="flex items-center gap-2 text-muted-foreground"><Check className="w-5 h-5" /><span>1 Staff User</span></li>
              </ul>
              <Button variant="outline" className="w-full" disabled>Current Plan</Button>
            </CardContent>
          </Card>

          <Card className="relative border-primary shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary">Most Popular</Badge></div>
            <CardHeader>
              <CardTitle>First Year</CardTitle>
              <CardDescription>Best for new agencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-bold">₹10,000</span>
                <span className="text-muted-foreground"> / year</span>
              </div>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2"><Check className="w-5 h-5 text-success" /><span>{feature.label}</span></li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80" onClick={() => setSubscribePlan({ name: 'First Year', price: 10000, period: '1 Year' })}>
                <CreditCard className="w-4 h-4 mr-2" /> Subscribe Now
              </Button>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardHeader>
              <CardTitle>Renewal</CardTitle>
              <CardDescription>For existing customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-bold">₹7,000</span>
                <span className="text-muted-foreground"> / year</span>
                <p className="text-sm text-success mt-1">Save ₹3,000 on renewal</p>
              </div>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2"><Check className="w-5 h-5 text-success" /><span>{feature.label}</span></li>
                ))}
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-success" /><span>Priority Support</span></li>
              </ul>
              <Button variant="outline" className="w-full" onClick={() => setSubscribePlan({ name: 'Renewal', price: 7000, period: '1 Year' })}>
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No payment history yet</p>
              <p className="text-sm">Your payment records will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Trust */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">All payments are processed securely through Razorpay. Your payment information is encrypted and never stored on our servers.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SubscribeDialog open={!!subscribePlan} onOpenChange={(open) => !open && setSubscribePlan(null)} plan={subscribePlan} />
    </DashboardLayout>
  );
}
