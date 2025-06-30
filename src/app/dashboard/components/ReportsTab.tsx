
import React from 'react';
import { Calendar, Package, Award } from 'lucide-react';
import { Order } from './types';

interface ReportsTabProps {
  orders: Order[];
}

const ReportsTab: React.FC<ReportsTabProps> = ({ orders }) => {
  const productSales = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.product] = (acc[item.product] || 0) + item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const departmentSales = orders.reduce((acc, order) => {
    acc[order.department] = (acc[order.department] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentSales)
    .map(([department, amount]) => ({ department, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-6">
      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            รายงานการผลิตรายวัน
          </h3>
          <div className="space-y-2">
            {Object.entries(productSales).map(([product, quantity]) => (
              <div key={product} className="flex justify-between text-sm">
                <span>{product}:</span>
                <span className="font-medium">{quantity} หน่วย</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package size={20} />
            รายงานการจองรายวัน
          </h3>
          <div className="space-y-2">
            {orders.map((order) => (
              <div key={order.id} className="text-sm border-b pb-2">
                <div className="font-medium">{order.department}</div>
                <div className="text-gray-600">฿{order.total.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award size={20} />
            อันดับการแข่งขัน
          </h3>
          <div className="space-y-2">
            {departmentChartData.slice(0, 5).map((dept, index) => (
              <div key={dept.department} className="flex items-center gap-2 text-sm">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <span className="flex-1">{dept.department}</span>
                <span className="font-medium">฿{dept.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">รายงานสรุปยอดขาย</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">สาขา</th>
                <th className="px-4 py-2 text-left">จำนวนคำสั่งซื้อ</th>
                <th className="px-4 py-2 text-left">ยอดขายรวม</th>
                <th className="px-4 py-2 text-left">เฉลี่ยต่อคำสั่งซื้อ</th>
              </tr>
            </thead>
            <tbody>
              {departmentChartData.map((dept) => {
                const deptOrders = orders.filter(o => o.department === dept.department);
                const avgPerOrder = dept.amount / deptOrders.length;
                return (
                  <tr key={dept.department} className="border-b">
                    <td className="px-4 py-2">{dept.department}</td>
                    <td className="px-4 py-2">{deptOrders.length}</td>
                    <td className="px-4 py-2">฿{dept.amount.toLocaleString()}</td>
                    <td className="px-4 py-2">฿{avgPerOrder.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;
