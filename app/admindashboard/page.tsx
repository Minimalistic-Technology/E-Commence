"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Store,
  LogOut,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Bell,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  Heart,
  Clock,
  Check,
  X,
  AlertCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0
  });

  // Sample data
  const [products] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      stock: 45,
      status: 'Active',
      image: 'https://images.pexels.com/photos/3945672/pexels-photo-3945672.jpeg?auto=compress&cs=tinysrgb&w=300',
      sales: 234
    },
    {
      id: 2,
      name: 'Designer Leather Jacket',
      category: "Men's Clothing",
      price: 199.99,
      stock: 12,
      status: 'Active',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300',
      sales: 156
    },
    {
      id: 3,
      name: 'Diamond Necklace',
      category: 'Jewelry',
      price: 899.99,
      stock: 3,
      status: 'Low Stock',
      image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=300',
      sales: 89
    }
  ]);

  const [orders] = useState([
    {
      id: '#ORD-001',
      customer: 'Sarah Johnson',
      total: 299.99,
      status: 'Completed',
      date: '2024-01-15',
      items: 2
    },
    {
      id: '#ORD-002',
      customer: 'Mike Chen',
      total: 199.99,
      status: 'Processing',
      date: '2024-01-14',
      items: 1
    },
    {
      id: '#ORD-003',
      customer: 'Emma Davis',
      total: 899.99,
      status: 'Shipped',
      date: '2024-01-13',
      items: 3
    }
  ]);

  const [customers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      orders: 12,
      spent: 2890.50,
      joined: '2023-03-15',
      status: 'VIP'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@example.com',
      orders: 8,
      spent: 1450.25,
      joined: '2023-05-20',
      status: 'Regular'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@example.com',
      orders: 15,
      spent: 3200.75,
      joined: '2023-01-10',
      status: 'VIP'
    }
  ]);

  useEffect(() => {
    // Animate counters
    const duration = 2000;
    const targets = { revenue: 45750, orders: 1248, customers: 8945, products: 567 };
    
    Object.keys(targets).forEach((key) => {
      let start = 0;
      const end = targets[key as keyof typeof targets];
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(start) }));
      }, 16);
    });
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Total Orders',
      value: stats.orders.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Customers',
      value: stats.customers.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Products',
      value: stats.products.toLocaleString(),
      change: '-2.1%',
      trend: 'down',
      icon: Package,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 2000, orders: 280 },
    { name: 'Apr', sales: 2780, orders: 390 },
    { name: 'May', sales: 1890, orders: 320 },
    { name: 'Jun', sales: 2390, orders: 450 },
    { name: 'Jul', sales: 3490, orders: 520 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Clothing', value: 28, color: '#8B5CF6' },
    { name: 'Jewelry', value: 22, color: '#EC4899' },
    { name: 'Others', value: 15, color: '#10B981' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'vip':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'regular':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download size={20} />
          <span>Export Report</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="ml-1 font-medium">{card.change}</span>
                  </div>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#3B82F6" fill="url(#colorGradient)" />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-blue-600">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4 font-semibold">${order.total}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );



  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
    //   case 'products':
    //     return <ProductsManagement />;
    //   case 'orders':
    //     return <OrdersManagement />;
    //   case 'customers':
    //     return <CustomersManagement />;
    //   case 'analytics':
    //     return <Analytics />;
    //   case 'settings':
    //     return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex">
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full bg-white/90 backdrop-blur-xl shadow-2xl z-50 border-r border-gray-200/50"
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <motion.div
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Store className="w-7 h-7 text-white" />
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-sm text-gray-500">E-commerce Dashboard</p>
                  </div>
                )}
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </motion.button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/25'
                      : 'text-gray-600 hover:bg-gray-100/80'
                  }`}
                >
                  <Icon size={22} />
                  {!sidebarCollapsed && (
                    <motion.span
                      animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200/50">
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50/50">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">HR</span>
              </div>
              {!sidebarCollapsed && (
                <motion.div
                  animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <p className="text-sm font-bold text-gray-900">Harsh Ratnani</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </motion.div>
              )}
            </div>
            
            {!sidebarCollapsed && (
              <motion.button
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-3 flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100/80 transition-colors"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-70'}`} style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveComponent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;