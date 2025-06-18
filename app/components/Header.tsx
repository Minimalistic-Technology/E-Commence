'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  search?: string;
  setSearch?: (search: string) => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ search = '', setSearch, showSearch = true }) => {
  const { favorites, cart, user } = useApp();
  const router = useRouter();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                E-commerce
              </span>
            </motion.div>
          </Link>

          {showSearch && (
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/favorites')}
              className="p-2.5 text-gray-600 hover:text-red-500 transition-colors relative rounded-full hover:bg-red-50"
            >
              <Heart size={22} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.size}
                </span>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/cart')}
              className="p-2.5 text-gray-600 hover:text-blue-500 transition-colors relative rounded-full hover:bg-blue-50"
            >
              <ShoppingCart size={22} />
              {cart.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.size}
                </span>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/logIn')}
              className="p-2.5 text-gray-600 hover:text-purple-500 transition-colors rounded-full hover:bg-purple-50"
            >
              <User size={22} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;