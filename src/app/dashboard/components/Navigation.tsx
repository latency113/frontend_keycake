
import React from 'react';
import { TrendingUp, Package, FileText } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => (
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
);

export default Navigation;
