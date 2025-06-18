import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  description: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface ProductCardProps {
  product: Product;
  index: number;
  viewMode: 'grid' | 'list';
  onProductClick?: (product: Product) => void;
  favorites: Set<number>;
  cart: CartItem[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  index, 
  viewMode, 
  onProductClick,
  favorites,
  cart,
  onToggleFavorite,
  onAddToCart
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // Check if product is in cart using array find method
  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer ${
        viewMode === 'list' ? 'flex' : ''
      }`}
      onClick={handleProductClick}
    >
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
        <img
          src={product.image}
          alt={product.title}
          className={`w-full object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300 ${
            viewMode === 'list' ? 'h-48' : 'h-56'
          } p-4`}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            size={18}
            className={`${
              favorites.has(product.id)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600 hover:text-red-500'
            } transition-colors`}
          />
        </motion.button>
        {onProductClick && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="absolute top-3 left-3 p-2 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
          >
            <Eye size={18} className="text-gray-600 hover:text-blue-500 transition-colors" />
          </motion.button>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 ${
            viewMode === 'list' ? 'text-lg' : 'text-base'
          }`}>
            {product.title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-3 capitalize">
          {product.category}
        </p>

        {viewMode === 'list' && (
          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            {renderStars(product.rating.rate)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.rating.count})
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              isInCart
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <ShoppingCart size={18} />
            <span>
              {isInCart ? `In Cart (${cartItem?.quantity})` : 'Add to Cart'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;