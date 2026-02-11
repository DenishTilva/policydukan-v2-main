import { Link } from 'react-router-dom';
import { Bell, Search, User, ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Search */}
      <div className="flex-1 max-w-md ml-12 lg:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search policies, customers, leads..."
            className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-transparent rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Help */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              <DropdownMenuItem className="flex-col items-start gap-1 cursor-pointer">
                <p className="text-sm font-medium">5 policies expiring today</p>
                <p className="text-xs text-muted-foreground">Send renewal reminders now</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex-col items-start gap-1 cursor-pointer">
                <p className="text-sm font-medium">New lead assigned</p>
                <p className="text-xs text-muted-foreground">Rahul Sharma - Car Insurance</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex-col items-start gap-1 cursor-pointer">
                <p className="text-sm font-medium">Commission credited</p>
                <p className="text-xs text-muted-foreground">₹12,500 from ICICI Lombard</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-primary cursor-pointer justify-center" asChild>
              <Link to="/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">Rajesh Kumar</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/settings">Profile Settings</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/settings">Company Details</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/plans">Billing & Plans</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
