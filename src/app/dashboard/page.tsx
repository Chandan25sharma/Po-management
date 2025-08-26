'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import SpendingAnalytics from '@/components/dashboard/SpendingAnalytics';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import POStatusChart from '@/components/dashboard/POStatusChart';
import VendorPerformance from '@/components/dashboard/VendorPerformance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Package, Users, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
    return null;
  }

  // Mock data for the dashboard stats
  const stats = [
    {
      title: "Total Spend",
      value: "$124,500",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Active POs",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Package,
      description: "pending approval"
    },
    {
      title: "Vendors",
      value: "45",
      change: "+2",
      trend: "up",
      icon: Users,
      description: "active vendors"
    },
    {
      title: "Avg Processing",
      value: "3.2 days",
      change: "-0.5",
      trend: "down",
      icon: Clock,
      description: "faster than last month"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {session.user.name}! Here's what's happening with your procurement.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Role: {session.user.role}
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className={`inline-flex items-center ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {stat.change}
                        </span>
                        {' '}{stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Alert/Notifications */}
            <Card className="border-orange-200 bg-orange-50 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Attention Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-orange-700">
                  <p>• 3 requisitions pending your approval</p>
                  <p>• 2 purchase orders approaching delivery date</p>
                  <p>• Monthly budget review due in 5 days</p>
                </div>
              </CardContent>
            </Card>

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <SpendingAnalytics />
              <BudgetOverview />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <POStatusChart />
              <VendorPerformance />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
