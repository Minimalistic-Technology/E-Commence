import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Store,
  Bell,
  Settings
} from 'lucide-react';
import { useRouter } from 'next/navigation';


interface HeaderProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  favorites?: Set<number>;
  cartCount?: number;
  onUserClick?: () => void;
  onCartClick?: () => void;
  onFavoritesClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  search = '',
  onSearchChange,
  showSearch = true,
  favorites = new Set(),
  cartCount = 0,
  onUserClick,
  onCartClick,
  onFavoritesClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      window.location.href = '/cart';
    }
  };

  const handleFavoritesClick = () => {
    if (onFavoritesClick) {
      onFavoritesClick();
    } else {
      window.location.href = '/favorites';
    }
  };

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick();
    } else {
      setIsUserMenuOpen(!isUserMenuOpen);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">E-commerce</h1>
              <p className="text-xs text-gray-500">Premium Shopping</p>
            </div>
          </motion.div>

          {/* Search Bar */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Favorites */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoritesClick}
              className="relative p-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart size={24} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.size}
                </span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/cart'}
              className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/logIn'}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <User size={24} />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                    <a href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Orders
                    </a>
                    <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <hr className="my-2" />
                    <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={handleFavoritesClick}
                className="flex items-center space-x-3 w-full text-left p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Heart size={20} />
                <span>Favorites ({favorites.size})</span>
              </button>
              <button
                onClick={handleCartClick}
                className="flex items-center space-x-3 w-full text-left p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart size={20} />
                <span>Cart ({cartCount})</span>
              </button>
              <button
                onClick={handleUserClick}
                className="flex items-center space-x-3 w-full text-left p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <User size={20} />
                <span>Account</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;