
import React from 'react';
import { Order } from '../../types';

interface OrdersTabProps {
  orders: Order[];
  newOrder: {
    department: string;
    items: { product: string; quantity: number }[];
  };
  setNewOrder: React.Dispatch<React.SetStateAction<{
    department: string;
    items: { product: string; quantity: number }[];
  }>>;
  addOrder: () => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders}) => (
  <div className="space-y-6">

    {/* Orders List */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">รายการคำสั่งซื้อ</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รหัส</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สาขา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รายการ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ยอดรวม</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                <td className="px-6 py-4 text-sm">{order.department}</td>
                <td className="px-6 py-4 text-sm">
                  {order.items.map((item, i) => (
                    <div key={i}>{item.product} x{item.quantity}</div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">฿{order.total.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'completed' ? 'เสร็จสิ้น' :
                     order.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอดำเนินการ'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default OrdersTab;
