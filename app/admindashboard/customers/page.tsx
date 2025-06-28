'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Search, Eye, Users, Award, DollarSign, TrendingUp } from 'lucide-react';

const Customers: React.FC = () => {
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
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john@example.com',
      orders: 5,
      spent: 750.00,
      joined: '2023-07-12',
      status: 'Regular'
    },
    {
      id: 5,
      name: 'Lisa Brown',
      email: 'lisa@example.com',
      orders: 20,
      spent: 4500.00,
      joined: '2023-02-01',
      status: 'VIP'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'vip':
        return 'bg-gold-100 text-yellow-800';
      case 'regular':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage customer relationships and data.</p>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">8,945</p>
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <TrendingUp size={16} className="mr-1" />
                +15.3% from last month
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Users size={28} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">VIP Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
              <p className="text-blue-600 text-sm mt-1">13.8% of total</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Award size={28} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Order Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">$186.50</p>
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <TrendingUp size={16} className="mr-1" />
                +8.2% from last month
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <DollarSign size={28} className="text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Customers Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Customer List</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Orders</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Total Spent</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Joined</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-700">{customer.name}</td>
                  <td className="py-4 px-6 text-gray-600">{customer.email}</td>
                  <td className="py-4 px-6 font-medium text-gray-700">{customer.orders}</td>
                  <td className="py-4 px-6 font-bold text-green-600">${customer.spent.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{customer.joined}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Mail size={16} />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Customers;