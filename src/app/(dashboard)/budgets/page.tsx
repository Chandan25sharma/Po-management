'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  Target,
  PieChart,
  BarChart3,
  Wallet,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Edit,
  Eye,
  Download,
  FileText,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for budget categories
const budgetCategories = [
  {
    id: 'BUD-001',
    name: 'Office Supplies',
    department: 'Administration',
    budgetYear: 2024,
    totalBudget: 25000.00,
    spent: 18500.00,
    committed: 3200.00,
    remaining: 3300.00,
    percentUsed: 74,
    status: 'ON_TRACK',
    lastUpdated: '2024-01-15',
    approver: 'John Admin',
    monthlySpend: [
      { month: 'Jan', budget: 2083, spent: 1850 },
      { month: 'Feb', budget: 2083, spent: 2100 },
      { month: 'Mar', budget: 2083, spent: 1950 },
      { month: 'Apr', budget: 2083, spent: 2200 },
      { month: 'May', budget: 2083, spent: 1800 },
      { month: 'Jun', budget: 2083, spent: 2000 },
    ],
    topVendors: [
      { name: 'ABC Supplies', spent: 8500 },
      { name: 'Office Depot', spent: 6200 },
      { name: 'Staples', spent: 3800 },
    ],
  },
  {
    id: 'BUD-002',
    name: 'IT Equipment',
    department: 'Technology',
    budgetYear: 2024,
    totalBudget: 150000.00,
    spent: 95000.00,
    committed: 35000.00,
    remaining: 20000.00,
    percentUsed: 63,
    status: 'OVER_COMMITTED',
    lastUpdated: '2024-01-14',
    approver: 'Sarah Tech',
    monthlySpend: [
      { month: 'Jan', budget: 12500, spent: 15000 },
      { month: 'Feb', budget: 12500, spent: 18000 },
      { month: 'Mar', budget: 12500, spent: 12000 },
      { month: 'Apr', budget: 12500, spent: 20000 },
      { month: 'May', budget: 12500, spent: 15000 },
      { month: 'Jun', budget: 12500, spent: 15000 },
    ],
    topVendors: [
      { name: 'Tech Solutions', spent: 45000 },
      { name: 'Dell', spent: 28000 },
      { name: 'Microsoft', spent: 22000 },
    ],
  },
  {
    id: 'BUD-003',
    name: 'Manufacturing Tools',
    department: 'Operations',
    budgetYear: 2024,
    totalBudget: 75000.00,
    spent: 42000.00,
    committed: 18000.00,
    remaining: 15000.00,
    percentUsed: 56,
    status: 'ON_TRACK',
    lastUpdated: '2024-01-13',
    approver: 'Mike Operations',
    monthlySpend: [
      { month: 'Jan', budget: 6250, spent: 7000 },
      { month: 'Feb', budget: 6250, spent: 6500 },
      { month: 'Mar', budget: 6250, spent: 8000 },
      { month: 'Apr', budget: 6250, spent: 7500 },
      { month: 'May', budget: 6250, spent: 6500 },
      { month: 'Jun', budget: 6250, spent: 6500 },
    ],
    topVendors: [
      { name: 'Industrial Tools', spent: 25000 },
      { name: 'Machinery Co', spent: 12000 },
      { name: 'Tool Depot', spent: 5000 },
    ],
  },
  {
    id: 'BUD-004',
    name: 'Facility Maintenance',
    department: 'Facilities',
    budgetYear: 2024,
    totalBudget: 35000.00,
    spent: 28000.00,
    committed: 5000.00,
    remaining: 2000.00,
    percentUsed: 80,
    status: 'AT_RISK',
    lastUpdated: '2024-01-12',
    approver: 'Emily Facilities',
    monthlySpend: [
      { month: 'Jan', budget: 2917, spent: 4500 },
      { month: 'Feb', budget: 2917, spent: 4800 },
      { month: 'Mar', budget: 2917, spent: 5200 },
      { month: 'Apr', budget: 2917, spent: 4600 },
      { month: 'May', budget: 2917, spent: 4400 },
      { month: 'Jun', budget: 2917, spent: 4500 },
    ],
    topVendors: [
      { name: 'Clean & Maintain', spent: 18000 },
      { name: 'Repairs Plus', spent: 6000 },
      { name: 'Supplies Co', spent: 4000 },
    ],
  },
  {
    id: 'BUD-005',
    name: 'Marketing Materials',
    department: 'Marketing',
    budgetYear: 2024,
    totalBudget: 45000.00,
    spent: 12000.00,
    committed: 8000.00,
    remaining: 25000.00,
    percentUsed: 27,
    status: 'UNDER_UTILIZED',
    lastUpdated: '2024-01-11',
    approver: 'Tom Marketing',
    monthlySpend: [
      { month: 'Jan', budget: 3750, spent: 2000 },
      { month: 'Feb', budget: 3750, spent: 2500 },
      { month: 'Mar', budget: 3750, spent: 1800 },
      { month: 'Apr', budget: 3750, spent: 2200 },
      { month: 'May', budget: 3750, spent: 1700 },
      { month: 'Jun', budget: 3750, spent: 1800 },
    ],
    topVendors: [
      { name: 'Print Design', spent: 7000 },
      { name: 'Creative Studio', spent: 3500 },
      { name: 'Banner Co', spent: 1500 },
    ],
  },
  {
    id: 'BUD-006',
    name: 'Safety Equipment',
    department: 'Safety',
    budgetYear: 2024,
    totalBudget: 20000.00,
    spent: 19500.00,
    committed: 1000.00,
    remaining: -500.00,
    percentUsed: 98,
    status: 'OVER_BUDGET',
    lastUpdated: '2024-01-10',
    approver: 'Lisa Safety',
    monthlySpend: [
      { month: 'Jan', budget: 1667, spent: 3200 },
      { month: 'Feb', budget: 1667, spent: 3500 },
      { month: 'Mar', budget: 1667, spent: 3800 },
      { month: 'Apr', budget: 1667, spent: 3200 },
      { month: 'May', budget: 1667, spent: 3000 },
      { month: 'Jun', budget: 1667, spent: 2800 },
    ],
    topVendors: [
      { name: 'Safety First', spent: 12000 },
      { name: 'Protective Gear', spent: 5000 },
      { name: 'Emergency Supply', spent: 2500 },
    ],
  },
];

const statusColors = {
  ON_TRACK: 'bg-green-100 text-green-800',
  AT_RISK: 'bg-yellow-100 text-yellow-800',
  OVER_BUDGET: 'bg-red-100 text-red-800',
  OVER_COMMITTED: 'bg-orange-100 text-orange-800',
  UNDER_UTILIZED: 'bg-blue-100 text-blue-800',
};

const statusIcons = {
  ON_TRACK: CheckCircle2,
  AT_RISK: AlertTriangle,
  OVER_BUDGET: XCircle,
  OVER_COMMITTED: Clock,
  UNDER_UTILIZED: TrendingDown,
};

export default function BudgetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredBudgets = budgetCategories.filter(budget => {
    const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.approver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || budget.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || budget.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = Array.from(new Set(budgetCategories.map(b => b.department)));

  // Calculate summary statistics
  const totalBudget = budgetCategories.reduce((sum, b) => sum + b.totalBudget, 0);
  const totalSpent = budgetCategories.reduce((sum, b) => sum + b.spent, 0);
  const totalCommitted = budgetCategories.reduce((sum, b) => sum + b.committed, 0);
  const totalRemaining = budgetCategories.reduce((sum, b) => sum + b.remaining, 0);

  const overBudgetCount = budgetCategories.filter(b => b.status === 'OVER_BUDGET').length;
  const atRiskCount = budgetCategories.filter(b => b.status === 'AT_RISK').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wallet className="h-8 w-8 text-green-600" />
            Budget Management
          </h1>
          <p className="text-gray-600 mt-1">Monitor budget allocation, spending, and performance across departments</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Budget
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">${(totalBudget / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500 mt-1">Annual allocation</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-green-600">${(totalSpent / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500 mt-1">
                  {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Committed</p>
                <p className="text-2xl font-bold text-orange-600">${(totalCommitted / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500 mt-1">Pending orders</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(totalRemaining / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalRemaining >= 0 ? 'Available' : 'Over budget'}
                </p>
              </div>
              {totalRemaining >= 0 ? (
                <ArrowUp className="h-8 w-8 text-green-600" />
              ) : (
                <ArrowDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Cards */}
      {(overBudgetCount > 0 || atRiskCount > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {overBudgetCount > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Over Budget Alert</p>
                    <p className="text-sm text-red-600">
                      {overBudgetCount} budget{overBudgetCount > 1 ? 's' : ''} exceed{overBudgetCount === 1 ? 's' : ''} allocated amount
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {atRiskCount > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">At Risk Budgets</p>
                    <p className="text-sm text-yellow-600">
                      {atRiskCount} budget{atRiskCount > 1 ? 's' : ''} approaching limit
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search budgets, departments, approvers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedDepartment === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDepartment('all')}
              >
                All Departments
              </Button>
              {departments.map(dept => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBudgets.map((budget) => {
          const StatusIcon = statusIcons[budget.status as keyof typeof statusIcons];
          const utilizationColor = budget.percentUsed >= 90 ? 'bg-red-500' : 
                                  budget.percentUsed >= 75 ? 'bg-yellow-500' : 
                                  'bg-green-500';
          
          return (
            <Card key={budget.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{budget.name}</h3>
                      <p className="text-sm text-gray-600">{budget.department} • {budget.id}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={statusColors[budget.status as keyof typeof statusColors]}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {budget.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Budget Overview */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Budget</p>
                    <p className="font-semibold text-lg">${budget.totalBudget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className={`font-semibold text-lg ${budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(budget.remaining).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Budget Utilization</span>
                    <span className="font-medium">{budget.percentUsed}%</span>
                  </div>
                  <Progress value={budget.percentUsed} className="h-2" />
                </div>

                {/* Spending Breakdown */}
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-green-600 font-medium">${(budget.spent / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600">Spent</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <p className="text-orange-600 font-medium">${(budget.committed / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600">Committed</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-blue-600 font-medium">${(Math.abs(budget.remaining) / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600">{budget.remaining >= 0 ? 'Available' : 'Over'}</p>
                  </div>
                </div>

                {/* Top Vendors */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Top Vendors</p>
                  <div className="space-y-1">
                    {budget.topVendors.slice(0, 3).map((vendor, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{vendor.name}</span>
                        <span className="font-medium">${vendor.spent.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="pt-2 border-t text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Approver: {budget.approver}</span>
                    <span>Updated: {new Date(budget.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Adjust Budget
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
