import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: {
    icon: 'bg-primary/10 text-primary',
  },
  primary: {
    icon: 'bg-primary text-primary-foreground',
  },
  success: {
    icon: 'bg-success/10 text-success',
  },
  warning: {
    icon: 'bg-warning/10 text-warning',
  },
  danger: {
    icon: 'bg-destructive/10 text-destructive',
  },
};

export function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  variant = 'default',
}: KPICardProps) {
  const styles = variantStyles[variant];

  return (
    <div className="kpi-card kpi-card-gradient animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground animate-count-up">{value}</p>
          
          {(trend || subtitle) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span
                  className={cn(
                    'flex items-center gap-1 text-xs font-medium',
                    trend.isPositive ? 'text-success' : 'text-destructive'
                  )}
                >
                  {trend.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {trend.value}%
                </span>
              )}
              {subtitle && (
                <span className="text-xs text-muted-foreground">{subtitle}</span>
              )}
            </div>
          )}
        </div>
        
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', styles.icon)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
