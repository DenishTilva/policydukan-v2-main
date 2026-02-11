import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  FileText,
  RefreshCw,
  IndianRupee,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'renewal' | 'commission' | 'lead' | 'policy' | 'alert' | 'system';
}

const notifications: Notification[] = [
  { id: '1', title: '5 policies expiring today', description: 'Send renewal reminders to Rahul Verma, Neha Gupta and 3 others.', time: '10 minutes ago', read: false, type: 'renewal' },
  { id: '2', title: 'New lead assigned', description: 'Rahul Sharma - Car Insurance enquiry from website.', time: '25 minutes ago', read: false, type: 'lead' },
  { id: '3', title: 'Commission credited', description: '₹12,500 commission received from ICICI Lombard for policy ICICI-2025-012345.', time: '1 hour ago', read: false, type: 'commission' },
  { id: '4', title: 'Policy issued successfully', description: 'HDFC-2025-067890 for Ananya Desai has been issued and is now active.', time: '2 hours ago', read: true, type: 'policy' },
  { id: '5', title: '12 renewals due in 7 days', description: 'Review upcoming renewals and send reminders to customers.', time: '3 hours ago', read: true, type: 'renewal' },
  { id: '6', title: 'Import completed', description: 'Excel import of 150 policies completed with 3 errors. Review error report.', time: '5 hours ago', read: true, type: 'system' },
  { id: '7', title: 'Payment overdue', description: 'Deepak Gupta - Policy TATA-2025-044556 payment pending for 5 days.', time: '6 hours ago', read: true, type: 'alert' },
  { id: '8', title: 'Lead converted', description: 'Kavita Sharma has been converted to a policy holder. Health Insurance - ₹52,000.', time: '1 day ago', read: true, type: 'lead' },
  { id: '9', title: 'Staff user added', description: 'Priya Nair has been added as an Agent to your team.', time: '1 day ago', read: true, type: 'system' },
  { id: '10', title: 'Subscription reminder', description: 'Your free trial expires in 3 days. Upgrade now to continue using all features.', time: '2 days ago', read: true, type: 'alert' },
];

const typeIcons: Record<Notification['type'], React.ElementType> = {
  renewal: RefreshCw,
  commission: IndianRupee,
  lead: UserPlus,
  policy: FileText,
  alert: AlertTriangle,
  system: Bell,
};

const typeColors: Record<Notification['type'], string> = {
  renewal: 'bg-warning/10 text-warning',
  commission: 'bg-success/10 text-success',
  lead: 'bg-info/10 text-info',
  policy: 'bg-primary/10 text-primary',
  alert: 'bg-destructive/10 text-destructive',
  system: 'bg-muted text-muted-foreground',
};

export default function Notifications() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const filterByType = (type?: string) =>
    type ? notifications.filter((n) => n.type === type) : notifications;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All <Badge variant="secondary" className="ml-1">{notifications.length}</Badge></TabsTrigger>
            <TabsTrigger value="unread">Unread <Badge variant="destructive" className="ml-1">{unreadCount}</Badge></TabsTrigger>
            <TabsTrigger value="renewal">Renewals</TabsTrigger>
            <TabsTrigger value="commission">Commissions</TabsTrigger>
          </TabsList>

          {['all', 'unread', 'renewal', 'commission'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="bg-card rounded-xl border border-border divide-y divide-border">
                {(tab === 'unread'
                  ? notifications.filter((n) => !n.read)
                  : tab === 'all'
                  ? notifications
                  : filterByType(tab)
                ).map((notif) => {
                  const Icon = typeIcons[notif.type];
                  return (
                    <div key={notif.id} className={`flex items-start gap-4 p-4 transition-colors hover:bg-muted/30 ${!notif.read ? 'bg-primary/5' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[notif.type]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm ${!notif.read ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}>
                            {notif.title}
                          </p>
                          {!notif.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{notif.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
