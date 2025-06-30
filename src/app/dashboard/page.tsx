'use client'
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Package, TrendingUp, Award, FileText, DollarSign, MapPin, Clock } from 'lucide-react';

// Product data
const CAKE_PRODUCTS = {
  'เค้กครีม': { unit: 'ปอนด์', price: 190 },
  'เค้กแยม': { unit: 'ปอนด์', price: 200 },
  'เค้กกาแฟ': { unit: 'ปอนด์', price: 200 },
  'เค้กช็อกโกแลต': { unit: 'ปอนด์', price: 250 },
  'เค้กบัตเตอร์': { unit: 'ชิ้น', price: 80 }
};

const COOKIE_PRODUCTS = {
  'คุกกี้เนยสด (กล่องเล็ก)': { unit: 'กล่อง', price: 150 },
  'คุกกี้เนยสด (กล่องใหญ่)': { unit: 'กล่อง', price: 200 },
  'คุกกี้คอร์นเฟลกส์ (กล่องเล็ก)': { unit: 'กล่อง', price: 170 },
  'คุกกี้คอร์นเฟลกส์ (กล่องใหญ่)': { unit: 'กล่อง', price: 230 },
  'คุกกี้เม็ดมะม่วงหิมพานด์ (กล่องเล็ก)': { unit: 'กล่อง', price: 180 },
  'คุกกี้เม็ดมะม่วงหิมพานด์ (กล่องใหญ่)': { unit: 'กล่อง', price: 250 }
};

const DEPARTMENTS = [
  'บัญชี', 'การตลาด', 'การจัดการธุรกิจค้าปลีก', 'สำนักงานดิจิทัล',
  'ภาษาและการจัดการธุรกิจระหว่างประเทศ', 'โลจิสติกส์', 'เทคโนโลยีสารสนเทศ',
  'เทคโนโลยีธุรกิจดิจิทัล', 'การโรงแรม', 'ดิจิทัลกราฟิก', 'การออกแบบ',
  'แฟชั่นและเครื่องแต่งกาย', 'คหกรรมศาสตร์', 'อาหารและโภชนาการ'
];

interface Order {
  id: string;
  date: string;
  department: string;
  items: { product: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
}

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState({
    department: '',
    items: [{ product: '', quantity: 1 }]
  });

  // Initialize sample data
  useEffect(() => {
    const sampleOrders: Order[] = [
      {
        id: '001',
        date: '2025-06-30',
        department: 'การตลาด',
        items: [
          { product: 'เค้กช็อกโกแลต', quantity: 5, price: 250 },
          { product: 'คุกกี้เนยสด (กล่องใหญ่)', quantity: 3, price: 200 }
        ],
        total: 1850,
        status: 'completed'
      },
      {
        id: '002',
        date: '2025-06-29',
        department: 'อาหารและโภชนาการ',
        items: [
          { product: 'เค้กครีม', quantity: 8, price: 190 },
          { product: 'เค้กแยม', quantity: 4, price: 200 }
        ],
        total: 2320,
        status: 'completed'
      },
      {
        id: '003',
        date: '2025-06-28',
        department: 'เทคโนโลยีสารสนเทศ',
        items: [
          { product: 'เค้กกาแฟ', quantity: 6, price: 200 },
          { product: 'คุกกี้คอร์นเฟลกส์ (กล่องเล็ก)', quantity: 10, price: 170 }
        ],
        total: 2900,
        status: 'completed'
      }
    ];
    setOrders(sampleOrders);
  }, []);

  const addOrder = () => {
    if (!newOrder.department || newOrder.items.some(item => !item.product)) return;

    const allProducts = { ...CAKE_PRODUCTS, ...COOKIE_PRODUCTS };
    const orderItems = newOrder.items.map(item => ({
      ...item,
      price: allProducts[item.product as keyof typeof allProducts]?.price || 0
    }));

    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order: Order = {
      id: String(orders.length + 1).padStart(3, '0'),
      date: new Date().toISOString().split('T')[0],
      department: newOrder.department,
      items: orderItems,
      total,
      status: 'pending'
    };

    setOrders([...orders, order]);
    setNewOrder({ department: '', items: [{ product: '', quantity: 1 }] });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ระบบจัดการเค้กและคุกกี้</h1>
          <p className="text-gray-600">ระบบครบครัน สำหรับการจัดการคำสั่งซื้อและวิเคราะห์ยอดขาย</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'dashboard', label: 'แดชบอร์ด', icon: TrendingUp },
            { id: 'orders', label: 'คำสั่งซื้อ', icon: Package },
            { id: 'reports', label: 'รายงาน', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-purple-50'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
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
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
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
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
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
        )}
      </div>
    </div>
  );
};

export default DashboardPage;