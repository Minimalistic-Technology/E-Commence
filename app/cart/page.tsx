"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Star, 
  Heart, 
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  Truck,
  MapPin,
  Eye,
  Copy,
  Download,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface OrderTracking {
  orderId: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  timeline: {
    status: string;
    description: string;
    timestamp: string;
    location?: string;
    completed: boolean;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const Cart: React.FC = () => {
  const { products, cart, updateCartQuantity, removeFromCart, favorites, toggleFavorite, orders } = useApp();
  const [activeTab, setActiveTab] = useState<'cart' | 'orders' | 'tracking'>('cart');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Enhanced mock tracking data
  const trackingData: { [key: string]: OrderTracking } = {
    'ORD-001': {
      orderId: 'ORD-001',
      status: 'delivered',
      estimatedDelivery: '2024-12-15',
      trackingNumber: 'TRK123456789',
      carrier: 'FedEx',
      timeline: [
        {
          status: 'Order Confirmed',
          description: 'Your order has been confirmed and payment processed',
          timestamp: '2024-12-12T10:00:00Z',
          completed: true
        },
        {
          status: 'Processing',
          description: 'Your order is being prepared and packed',
          timestamp: '2024-12-12T14:30:00Z',
          location: 'Fulfillment Center - Los Angeles, CA',
          completed: true
        },
        {
          status: 'Shipped',
          description: 'Your order has been shipped and is on its way',
          timestamp: '2024-12-13T09:15:00Z',
          location: 'FedEx Facility - Los Angeles, CA',
          completed: true
        },
        {
          status: 'In Transit',
          description: 'Package is in transit to destination',
          timestamp: '2024-12-14T16:45:00Z',
          location: 'FedEx Facility - Phoenix, AZ',
          completed: true
        },
        {
          status: 'Out for Delivery',
          description: 'Package is out for delivery',
          timestamp: '2024-12-15T08:30:00Z',
          location: 'Local Delivery Facility',
          completed: true
        },
        {
          status: 'Delivered',
          description: 'Package delivered successfully',
          timestamp: '2024-12-15T14:20:00Z',
          location: 'Front Door',
          completed: true
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    'ORD-002': {
      orderId: 'ORD-002',
      status: 'shipped',
      estimatedDelivery: '2024-12-20',
      trackingNumber: 'TRK987654321',
      carrier: 'UPS',
      timeline: [
        {
          status: 'Order Confirmed',
          description: 'Your order has been confirmed and payment processed',
          timestamp: '2024-12-10T11:00:00Z',
          completed: true
        },
        {
          status: 'Processing',
          description: 'Your order is being prepared and packed',
          timestamp: '2024-12-10T15:30:00Z',
          location: 'Fulfillment Center - Chicago, IL',
          completed: true
        },
        {
          status: 'Shipped',
          description: 'Your order has been shipped and is on its way',
          timestamp: '2024-12-11T10:15:00Z',
          location: 'UPS Facility - Chicago, IL',
          completed: true
        },
        {
          status: 'In Transit',
          description: 'Package is in transit to destination',
          timestamp: '2024-12-12T14:30:00Z',
          location: 'UPS Facility - Denver, CO',
          completed: false
        }
      ],
      shippingAddress: {
        name: 'Jane Smith',
        address: '456 Oak Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102'
      }
    }
  };

  const cartProducts = cart.map(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    return product ? { ...product, quantity: cartItem.quantity } : null;
  }).filter(Boolean);

  const getCartTotal = () => {
    return cartProducts.reduce((total, item) => total + (item!.price * item!.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : i < rating
            ? 'fill-yellow-200 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
      case 'in transit':
      case 'out for delivery':
        return 'text-purple-600 bg-purple-100';
      case 'confirmed':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'processing':
        return <Clock size={16} />;
      case 'shipped':
      case 'in transit':
      case 'out for delivery':
        return <Truck size={16} />;
      case 'confirmed':
        return <Package size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const handleTrackOrder = (orderId: string) => {
    setSelectedOrderForTracking(orderId);
    setActiveTab('tracking');
  };

  const getProgressPercentage = (timeline: OrderTracking['timeline']) => {
    const completedSteps = timeline.filter(step => step.completed).length;
    return (completedSteps / timeline.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        search=""
        onSearchChange={() => {}}
        favorites={favorites}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onUserClick={() => {}}
        onCartClick={() => {}}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
          
          {/* Enhanced Tab Navigation */}
          <div className="flex flex-wrap gap-2 bg-gray-200 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('cart')}
              className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm md:text-base ${
                activeTab === 'cart'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Current Cart ({cartProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm md:text-base ${
                activeTab === 'orders'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Order History ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm md:text-base ${
                activeTab === 'tracking'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Track Orders
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'cart' ? (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {cartProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Add some products to get started with your shopping
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/'}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <ShoppingBag size={20} />
                    <span>Browse Products</span>
                  </motion.button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-4">
                    {cartProducts.map((item, index) => (
                      <motion.div
                        key={item!.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                          <div className="relative w-full sm:w-24 h-24 flex-shrink-0">
                            <img
                              src={item!.image}
                              alt={item!.title}
                              className="w-full h-full object-contain bg-gray-50 rounded-lg"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleFavorite(item!.id)}
                              className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                            >
                              <Heart
                                size={16}
                                className={`${
                                  favorites.has(item!.id)
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-400 hover:text-red-500'
                                } transition-colors`}
                              />
                            </motion.button>
                          </div>

                          <div className="flex-1 min-w-0 w-full">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm md:text-base">
                              {item!.title}
                            </h3>
                            <p className="text-sm text-gray-500 capitalize mb-2">
                              {item!.category}
                            </p>
                            <div className="flex items-center mb-3">
                              <div className="flex items-center mr-2">
                                {renderStars(item!.rating.rate)}
                              </div>
                              <span className="text-sm text-gray-500">
                                ({item!.rating.count})
                              </span>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                              <div className="flex items-center space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateCartQuantity(item!.id, item!.quantity - 1)}
                                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                  <Minus size={16} />
                                </motion.button>
                                <span className="font-medium text-lg min-w-[2rem] text-center">
                                  {item!.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateCartQuantity(item!.id, item!.quantity + 1)}
                                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                  <Plus size={16} />
                                </motion.button>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">
                                    {formatPrice(item!.price * item!.quantity)}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {formatPrice(item!.price)} each
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeFromCart(item!.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 size={18} />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Order Summary */}
                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal ({cartProducts.reduce((sum, item) => sum + item!.quantity, 0)} items)</span>
                          <span>{formatPrice(getCartTotal())}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Tax</span>
                          <span>{formatPrice(getCartTotal() * 0.08)}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total</span>
                          <span>{formatPrice(getCartTotal() * 1.08)}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleProceedToCheckout}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors mb-3 flex items-center justify-center space-x-2"
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight size={20} />
                      </motion.button>
                      
                      <button
                        onClick={() => window.location.href = '/'}
                        className="block w-full text-center py-3 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Continue Shopping
                      </button>

                      {/* Security Badge */}
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle size={16} />
                          <span className="text-sm font-medium">Secure Checkout</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          SSL encrypted and secure payment processing
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : activeTab === 'orders' ? (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {orders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Package size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No previous orders
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Your order history will appear here once you make your first purchase
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-3 md:space-y-0">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col md:items-end space-y-2">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(order.total)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 md:w-16 h-12 md:h-16 object-contain bg-white rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 line-clamp-1 text-sm md:text-base">{item.title}</h4>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900 text-sm md:text-base">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                              <div className="text-xs md:text-sm text-gray-500">
                                {formatPrice(item.price)} each
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-200 space-y-3 sm:space-y-0">
                        <div className="flex flex-wrap gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTrackOrder(order.id)}
                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm flex items-center space-x-1"
                          >
                            <Package size={16} />
                            <span>Track Order</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium text-sm flex items-center space-x-1"
                          >
                            <Eye size={16} />
                            <span>View Details</span>
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                        >
                          Reorder Items
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedOrderForTracking && trackingData[selectedOrderForTracking] ? (
                <div className="space-y-6">
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedOrderForTracking(null)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowRight size={20} className="rotate-180" />
                    <span>Back to Order Selection</span>
                  </button>

                  {/* Tracking Header */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Order {trackingData[selectedOrderForTracking].orderId}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Truck size={16} />
                            <span>Carrier: {trackingData[selectedOrderForTracking].carrier}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Package size={16} />
                            <span>Tracking: {trackingData[selectedOrderForTracking].trackingNumber}</span>
                            <button
                              onClick={() => copyToClipboard(trackingData[selectedOrderForTracking].trackingNumber)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>Est. Delivery: {new Date(trackingData[selectedOrderForTracking].estimatedDelivery).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
                        >
                          <ExternalLink size={16} />
                          <span>Track on {trackingData[selectedOrderForTracking].carrier}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
                        >
                          <RefreshCw size={16} />
                          <span>Refresh</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(getProgressPercentage(trackingData[selectedOrderForTracking].timeline))}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${getProgressPercentage(trackingData[selectedOrderForTracking].timeline)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
                    
                    <div className="space-y-6">
                      {trackingData[selectedOrderForTracking].timeline.map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            event.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {event.completed ? <CheckCircle size={20} /> : <Clock size={20} />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                              <div>
                                <h4 className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                  {event.status}
                                </h4>
                                <p className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                                  {event.description}
                                </p>
                                {event.location && (
                                  <div className="flex items-center space-x-1 mt-1">
                                    <MapPin size={14} className="text-gray-400" />
                                    <span className="text-xs text-gray-500">{event.location}</span>
                                  </div>
                                )}
                              </div>
                              
                              {event.timestamp && (
                                <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                                  {formatDate(event.timestamp)}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900">{trackingData[selectedOrderForTracking].shippingAddress.name}</p>
                      <p className="text-gray-600">{trackingData[selectedOrderForTracking].shippingAddress.address}</p>
                      <p className="text-gray-600">
                        {trackingData[selectedOrderForTracking].shippingAddress.city}, {trackingData[selectedOrderForTracking].shippingAddress.state} {trackingData[selectedOrderForTracking].shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Support Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Phone size={20} className="text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Call Support</p>
                          <p className="text-sm text-blue-700">1-800-123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail size={20} className="text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Email Support</p>
                          <p className="text-sm text-blue-700">support@example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Track Your Orders</h2>
                  
                  {Object.values(trackingData).length === 0 ? (
                    <div className="text-center py-16">
                      <Package size={64} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No orders to track
                      </h3>
                      <p className="text-gray-600">
                        Your trackable orders will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.values(trackingData).map((tracking) => (
                        <motion.div
                          key={tracking.orderId}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedOrderForTracking(tracking.orderId)}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">Order {tracking.orderId}</h3>
                              <p className="text-sm text-gray-500">Tracking: {tracking.trackingNumber}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tracking.status)}`}>
                              {tracking.status.charAt(0).toUpperCase() + tracking.status.slice(1)}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Progress</span>
                              <span>{Math.round(getProgressPercentage(tracking.timeline))}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${getProgressPercentage(tracking.timeline)}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              <p>Est. Delivery: {new Date(tracking.estimatedDelivery).toLocaleDateString()}</p>
                            </div>
                            <ArrowRight size={20} className="text-gray-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;