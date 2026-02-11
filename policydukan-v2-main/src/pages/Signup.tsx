import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Eye, EyeOff, ArrowRight, Building2 } from 'lucide-react';

export default function Signup() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PolicyDukan</h1>
              <p className="text-sm text-primary-foreground/80">Insurance Management System</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">Start Your Free<br />7-Day Trial</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">No credit card required. Get instant access to all features and start managing your insurance business today.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"><span className="text-lg font-bold">✓</span></div>
              <p className="text-primary-foreground/90">Full access to all features</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"><span className="text-lg font-bold">✓</span></div>
              <p className="text-primary-foreground/90">Import unlimited policies</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"><span className="text-lg font-bold">✓</span></div>
              <p className="text-primary-foreground/90">Cancel anytime, no questions asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PolicyDukan</h1>
              <p className="text-xs text-muted-foreground">Insurance Management</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
            <p className="text-muted-foreground mt-1">Start your 7-day free trial today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Rajesh" className="h-11" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Kumar" className="h-11" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signupEmail">Email Address</Label>
              <Input id="signupEmail" type="email" placeholder="you@company.com" className="h-11" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" className="h-11" required />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:text-primary-hover transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground mb-4">Trusted by 500+ insurance agents across India</p>
            <div className="flex items-center justify-center gap-6 opacity-50">
              <div className="text-xs font-semibold text-muted-foreground">256-bit SSL</div>
              <div className="w-px h-4 bg-border" />
              <div className="text-xs font-semibold text-muted-foreground">IRDAI Compliant</div>
              <div className="w-px h-4 bg-border" />
              <div className="text-xs font-semibold text-muted-foreground">ISO 27001</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
