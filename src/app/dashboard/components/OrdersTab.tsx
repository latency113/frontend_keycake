
import React from 'react';
import { Order } from './types';
import { CAKE_PRODUCTS, COOKIE_PRODUCTS, DEPARTMENTS } from './data';

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

const OrdersTab: React.FC<OrdersTabProps> = ({ orders, newOrder, setNewOrder, addOrder }) => (
  <div className="space-y-6">
    {/* Add New Order */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">เพิ่มคำสั่งซื้อใหม่</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">สาขา</label>
          <select
            value={newOrder.department}
            onChange={(e) => setNewOrder({...newOrder, department: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">เลือกสาขา</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        {newOrder.items.map((item, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">สินค้า</label>
              <select
                value={item.product}
                onChange={(e) => {
                  const newItems = [...newOrder.items];
                  newItems[index].product = e.target.value;
                  setNewOrder({...newOrder, items: newItems});
                }}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">เลือกสินค้า</option>
                <optgroup label="เค้ก">
                  {Object.keys(CAKE_PRODUCTS).map(product => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </optgroup>
                <optgroup label="คุกกี้">
                  {Object.keys(COOKIE_PRODUCTS).map(product => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium mb-2">จำนวน</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...newOrder.items];
                  newItems[index].quantity = parseInt(e.target.value) || 1;
                  setNewOrder({...newOrder, items: newItems});
                }}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <button
              onClick={() => {
                if (newOrder.items.length > 1) {
                  const newItems = newOrder.items.filter((_, i) => i !== index);
                  setNewOrder({...newOrder, items: newItems});
                }
              }}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              ลบ
            </button>
          </div>
        ))}
        
        <div className="flex gap-2">
          <button
            onClick={() => setNewOrder({
              ...newOrder, 
              items: [...newOrder.items, { product: '', quantity: 1 }]
            })}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            เพิ่มสินค้า
          </button>
          <button
            onClick={addOrder}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            บันทึกคำสั่งซื้อ
          </button>
        </div>
      </div>
    </div>

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
