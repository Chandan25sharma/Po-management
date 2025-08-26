'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

// Mock data for spending over time
const spendingData = [
  { month: 'Jan', spending: 45000, budget: 50000 },
  { month: 'Feb', spending: 52000, budget: 50000 },
  { month: 'Mar', spending: 48000, budget: 50000 },
  { month: 'Apr', spending: 61000, budget: 65000 },
  { month: 'May', spending: 55000, budget: 60000 },
  { month: 'Jun', spending: 67000, budget: 70000 },
  { month: 'Jul', spending: 59000, budget: 65000 },
  { month: 'Aug', spending: 73000, budget: 75000 },
];

// Mock data for spending by category
const categoryData = [
  { name: 'IT Equipment', value: 125000, color: '#8884d8' },
  { name: 'Office Supplies', value: 85000, color: '#82ca9d' },
  { name: 'Manufacturing', value: 95000, color: '#ffc658' },
  { name: 'Facilities', value: 65000, color: '#ff7300' },
  { name: 'Marketing', value: 45000, color: '#00c49f' },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f'];

export default function SpendingAnalytics() {
  const totalSpending = categoryData.reduce((sum, item) => sum + item.value, 0);
  const currentMonthSpending = spendingData[spendingData.length - 1]?.spending || 0;
  const previousMonthSpending = spendingData[spendingData.length - 2]?.spending || 0;
  const spendingGrowth = ((currentMonthSpending - previousMonthSpending) / previousMonthSpending * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Spending Trend Chart */}
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Monthly Spending Trend
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Budget vs Actual Spending Over Time
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              ${(currentMonthSpending / 1000).toFixed(0)}K
            </p>
            <p className={`text-sm flex items-center gap-1 ${
              parseFloat(spendingGrowth) > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              <TrendingUp className={`h-3 w-3 ${
                parseFloat(spendingGrowth) > 0 ? 'rotate-0' : 'rotate-180'
              }`} />
              {Math.abs(parseFloat(spendingGrowth))}% from last month
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`, 
                    name === 'spending' ? 'Actual Spending' : 'Budget'
                  ]}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="budget"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBudget)"
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSpending)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Spending by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Spending by Category
          </CardTitle>
          <p className="text-sm text-gray-600">
            Total: ${(totalSpending / 1000).toFixed(0)}K this year
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spending']}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs font-medium text-gray-700">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-900">
                      ${(entry.value / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-gray-500">
                      {((entry.value / totalSpending) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
