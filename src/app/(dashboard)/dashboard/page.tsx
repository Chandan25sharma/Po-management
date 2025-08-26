import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import SpendingAnalytics from '@/components/dashboard/SpendingAnalytics';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import VendorPerformance from '@/components/dashboard/VendorPerformance';
import POStatusChart from '@/components/dashboard/POStatusChart';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your purchase order management system
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions userRole={session?.user?.role} />

      {/* Metrics */}
      <DashboardMetrics />

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Spending Analytics - Full Width */}
        <div className="xl:col-span-2">
          <SpendingAnalytics />
        </div>
        
        {/* Budget Overview */}
        <BudgetOverview />
        
        {/* PO Status Chart */}
        <POStatusChart />
        
        {/* Vendor Performance - Full Width */}
        <div className="xl:col-span-2">
          <VendorPerformance />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
