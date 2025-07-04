import React, { useMemo } from 'react';
import { Order } from '../../types';

interface PickupTabProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const PickupTab: React.FC<PickupTabProps> = ({ orders, setOrders }) => {
  const departmentPickupStatus = useMemo(() => {
    const status: { [key: string]: { totalCakes: number; pickedUpCakes: number; remainingCakes: number } } = {};

    orders.forEach(order => {
      if (!status[order.department]) {
        status[order.department] = { totalCakes: 0, pickedUpCakes: 0, remainingCakes: 0 };
      }

      const orderCakes = order.items.reduce((sum, item) => sum + item.quantity, 0);
      status[order.department].totalCakes += orderCakes;

      if (order.isPickedUp) {
        status[order.department].pickedUpCakes += orderCakes;
      } else {
        status[order.department].remainingCakes += orderCakes;
      }
    });
    return status;
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Pickup Status by Department */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">สถานะการรับเค้กตามสาขา</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สาขา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เค้กทั้งหมด</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รับไปแล้ว</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คงเหลือ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(departmentPickupStatus).map(([department, data]) => (
                <tr key={department} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{data.totalCakes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{data.pickedUpCakes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{data.remainingCakes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PickupTab;

