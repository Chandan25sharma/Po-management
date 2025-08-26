'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Target, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

// Mock data for budget utilization by department
const budgetData = [
  { 
    department: 'IT', 
    budget: 150000, 
    spent: 95000, 
    committed: 35000,
    utilization: 63,
    status: 'warning'
  },
  { 
    department: 'Operations', 
    budget: 120000, 
    spent: 78000, 
    committed: 25000,
    utilization: 65,
    status: 'good'
  },
  { 
    department: 'Marketing', 
    budget: 80000, 
    spent: 45000, 
    committed: 15000,
    utilization: 56,
    status: 'good'
  },
  { 
    department: 'Facilities', 
    budget: 60000, 
    spent: 48000, 
    committed: 8000,
    utilization: 80,
    status: 'warning'
  },
  { 
    department: 'Admin', 
    budget: 40000, 
    spent: 38000, 
    committed: 3000,
    utilization: 95,
    status: 'danger'
  },
];

// Summary stats
const totalBudget = budgetData.reduce((sum, dept) => sum + dept.budget, 0);
const totalSpent = budgetData.reduce((sum, dept) => sum + dept.spent, 0);
const totalCommitted = budgetData.reduce((sum, dept) => sum + dept.committed, 0);
const overallUtilization = Math.round((totalSpent / totalBudget) * 100);

const getBarColor = (status: string) => {
  switch (status) {
    case 'danger': return '#ef4444';
    case 'warning': return '#f59e0b';
    case 'good': return '#10b981';
    default: return '#6b7280';
  }
};

export default function BudgetOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          Budget Overview
        </CardTitle>
        <p className="text-sm text-gray-600">
          Department budget utilization and performance
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Budget Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Budget</p>
                <p className="text-xl font-bold text-blue-900">
                  ${(totalBudget / 1000).toFixed(0)}K
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Spent</p>
                <p className="text-xl font-bold text-green-900">
                  ${(totalSpent / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-green-600">{overallUtilization}% utilized</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Committed</p>
                <p className="text-xl font-bold text-orange-900">
                  ${(totalCommitted / 1000).toFixed(0)}K
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Budget Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Department Budget Utilization</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="department" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'spent') return [`$${value.toLocaleString()}`, 'Spent'];
                    if (name === 'committed') return [`$${value.toLocaleString()}`, 'Committed'];
                    return [`$${value.toLocaleString()}`, 'Budget'];
                  }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="budget" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
                <Bar dataKey="committed" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                <Bar dataKey="spent" radius={[2, 2, 0, 0]}>
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Progress Bars */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Budget Utilization by Department</h4>
          {budgetData.map((dept) => (
            <div key={dept.department} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                  {dept.status === 'danger' && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  {dept.status === 'warning' && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  {dept.status === 'good' && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">
                    ${dept.spent.toLocaleString()} / ${dept.budget.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 block">
                    {dept.utilization}% utilized
                  </span>
                </div>
              </div>
              <Progress 
                value={dept.utilization} 
                className={`h-2 ${
                  dept.status === 'danger' ? 'bg-red-100' : 
                  dept.status === 'warning' ? 'bg-yellow-100' : 
                  'bg-green-100'
                }`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
