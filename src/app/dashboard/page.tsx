
'use client'

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DashboardTab from './components/DashboardTab';
import OrdersTab from './components/OrdersTab';
import ReportsTab from './components/ReportsTab';
import PickupTab from './components/PickupTab';
import { Order } from './components/types';
import { CAKE_PRODUCTS, COOKIE_PRODUCTS } from './components/data';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto p-6">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'dashboard' && <DashboardTab orders={orders} />}
        {activeTab === 'orders' && (
          <OrdersTab 
            orders={orders} 
            newOrder={newOrder} 
            setNewOrder={setNewOrder} 
            addOrder={addOrder} 
          />
        )}
        {activeTab === 'reports' && <ReportsTab orders={orders} />}
        {activeTab === 'pickup' && <PickupTab orders={orders} setOrders={setOrders} />}
      </div>
    </div>
  );
};

export default DashboardPage;
