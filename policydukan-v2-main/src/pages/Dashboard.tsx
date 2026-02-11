import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { RenewalsList } from '@/components/dashboard/RenewalsList';
import { RecentPolicies } from '@/components/dashboard/RecentPolicies';
import { PremiumChart } from '@/components/dashboard/PremiumChart';
import { CompanyDistribution } from '@/components/dashboard/CompanyDistribution';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  IndianRupee,
  Percent,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your insurance business overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KPICard
          title="Total Policies"
          value="2,847"
          icon={FileText}
          trend={{ value: 12.5, isPositive: true }}
          subtitle="vs last month"
          variant="default"
        />
        <KPICard
          title="Active Policies"
          value="2,156"
          icon={CheckCircle}
          trend={{ value: 8.2, isPositive: true }}
          subtitle="vs last month"
          variant="success"
        />
        <KPICard
          title="Expired Policies"
          value="312"
          icon={AlertTriangle}
          trend={{ value: 3.1, isPositive: false }}
          subtitle="vs last month"
          variant="danger"
        />
        <KPICard
          title="Renewals Due"
          value="89"
          icon={RefreshCw}
          subtitle="Next 30 days"
          variant="warning"
        />
        <KPICard
          title="Total Premium"
          value="₹24.5L"
          icon={IndianRupee}
          trend={{ value: 15.3, isPositive: true }}
          subtitle="This month"
          variant="primary"
        />
        <KPICard
          title="Total Commission"
          value="₹3.2L"
          icon={Percent}
          trend={{ value: 18.7, isPositive: true }}
          subtitle="This month"
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PremiumChart />
        <CompanyDistribution />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 gap-6">
        <RenewalsList />
        <RecentPolicies />
      </div>
    </DashboardLayout>
  );
}
