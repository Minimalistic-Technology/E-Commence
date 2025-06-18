'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, ArrowLeft, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { Review } from '../../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, favorites, cart, toggleFavorite, toggleCart } = useApp();
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews' | 'specs'>('description');

  const product = products.find(p => p.id === Number(id));
  const similarProducts = products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      rating: 5,
      comment: "Excellent product! Exactly as described and fast shipping.",
      date: "2025-01-10",
      verified: true
    },
    {
      id: 2,
      userId: 2,
      userName: "Jane Smith",
      rating: 4,
      comment: "Good quality, though slightly different from the picture.",
      date: "2025-01-08",
      verified: true
    },
    {
      id: 3,
      userId: 3,
      userName: "Mike Johnson",
      rating: 5,
      comment: "Amazing value for money. Highly recommended!",
      date: "2025-01-05",
      verified: false
    }
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header showSearch={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
            <Link href="/" className="text-blue-500 hover:text-blue-600">
              Return to products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number, size = 20) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
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

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showSearch={false} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-contain"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.rating.count} reviews)
                  </span>
                </div>

                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {formatPrice(product.price)}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleCart(product.id)}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      cart.has(product.id)
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    <span>
                      {cart.has(product.id) ? 'In Cart' : 'Add to Cart'}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFavorite(product.id)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 transition-colors"
                  >
                    <Heart
                      size={20}
                      className={`${
                        favorites.has(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600 hover:text-red-500'
                      } transition-colors`}
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                  >
                    <Share2 size={20} className="text-gray-600" />
                  </motion.button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Truck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                    <div className="text-xs text-gray-600">On orders over $50</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Secure Payment</div>
                    <div className="text-xs text-gray-600">100% protected</div>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Easy Returns</div>
                    <div className="text-xs text-gray-600">30 day returns</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-8">
                  {[
                    { key: 'description', label: 'Description' },
                    { key: 'reviews', label: `Reviews (${reviews.length})` },
                    { key: 'specs', label: 'Specifications' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedTab(tab.key as any)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        selectedTab === tab.key
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {selectedTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                      <div className="text-3xl font-bold text-gray-900">
                        {averageRating.toFixed(1)}
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          {renderStars(averageRating)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Based on {reviews.length} reviews
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium text-gray-900 mb-1">
                                {review.userName}
                                {review.verified && (
                                  <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center">
                                {renderStars(review.rating, 16)}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'specs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">General</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium capitalize">{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <span className="font-medium">{product.rating.rate}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reviews:</span>
                          <span className="font-medium">{product.rating.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    viewMode="grid"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;