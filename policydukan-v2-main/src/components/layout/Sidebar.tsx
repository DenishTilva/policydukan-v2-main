import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Users,
  UserPlus,
  RefreshCw,
  DollarSign,
  BarChart3,
  Building2,
  UserCog,
  Upload,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronRight,
  Shield,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  {
    label: 'Policies',
    icon: FileText,
    children: [
      { label: 'All Policies', href: '/policies' },
      { label: 'Add New Policy', href: '/policies/new' },
      { label: 'Expired Policies', href: '/policies/expired' },
    ],
  },
  { label: 'Customers', icon: Users, href: '/customers' },
  { label: 'Leads', icon: UserPlus, href: '/leads' },
  { label: 'Renewals', icon: RefreshCw, href: '/renewals' },
  { label: 'Commissions', icon: DollarSign, href: '/commissions' },
  { label: 'Reports', icon: BarChart3, href: '/reports' },
  { label: 'Companies', icon: Building2, href: '/companies' },
  { label: 'Users / Staff', icon: UserCog, href: '/users' },
  { label: 'Imports', icon: Upload, href: '/imports' },
  { label: 'Plans / Subscription', icon: CreditCard, href: '/plans' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Policies']);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { label: string; href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">PolicyDukan</h1>
              <p className="text-[10px] text-sidebar-muted -mt-0.5">Insurance Management</p>
            </div>
          </Link>
          <button onClick={onToggle} className="lg:hidden p-1 hover:bg-sidebar-accent rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={cn(
                        'nav-item w-full justify-between',
                        isParentActive(item.children) && 'text-sidebar-foreground bg-sidebar-accent'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.label) && (
                      <ul className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={cn(
                                'nav-item text-sm',
                                isActive(child.href) && 'nav-item-active'
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href!}
                    className={cn(
                      'nav-item',
                      isActive(item.href!) && 'nav-item-active'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <p className="text-xs text-sidebar-muted mb-1">Trial Period</p>
            <p className="text-sm font-semibold text-sidebar-foreground">5 days remaining</p>
            <Link
              to="/plans"
              className="mt-2 block text-center text-xs font-medium bg-primary text-primary-foreground rounded-md py-1.5 hover:bg-primary-hover transition-colors"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 p-2 bg-card rounded-lg shadow-soft lg:hidden"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>
    </>
  );
}
