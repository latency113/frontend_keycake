
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, DollarSign, MapPin, Package } from 'lucide-react';
import { Order } from './types';

interface DashboardTabProps {
  orders: Order[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({ orders }) => {
  // Analytics data
  const dailySales = orders.reduce((acc, order) => {
    const date = order.date;
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const salesChartData = Object.entries(dailySales).map(([date, amount]) => ({
    date,
    amount
  }));

  const departmentSales = orders.reduce((acc, order) => {
    acc[order.department] = (acc[order.department] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentSales)
    .map(([department, amount]) => ({ department, amount }))
    .sort((a, b) => b.amount - a.amount);

  const productSales = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.product] = (acc[item.product] || 0) + item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const productChartData = Object.entries(productSales)
    .map(([product, quantity]) => ({ product, quantity }))
    .sort((a, b) => b.quantity - a.quantity);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const topDepartment = departmentChartData[0];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ยอดขายรวม</p>
              <p className="text-2xl font-bold text-green-600">฿{totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">จำนวนคำสั่งซื้อ</p>
              <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
            </div>
            <Package className="text-blue-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">สาขาที่สั่งมากที่สุด</p>
              <p className="text-lg font-bold text-purple-600">{topDepartment?.department || 'ไม่มีข้อมูล'}</p>
            </div>
            <Award className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            แนวโน้มยอดขายรายวัน
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`฿${value}`, 'ยอดขาย']} />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Sales */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin size={20} />
            ยอดขายตามสาขา
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => [`฿${value}`, 'ยอดขาย']} />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Popularity */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award size={20} />
          สินค้าขายดี
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productChartData.slice(0, 6)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ product, percent }) => `${product.slice(0, 15)}... ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="quantity"
              >
                {productChartData.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {productChartData.slice(0, 6).map((item, index) => (
              <div key={item.product} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">{item.product}: {item.quantity} หน่วย</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
