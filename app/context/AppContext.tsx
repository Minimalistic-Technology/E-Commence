'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, User } from '../types';

interface CartItem {
  id: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

interface AppContextType {
  products: Product[];
  loading: boolean;
  favorites: Set<number>;
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  toggleFavorite: (id: number) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  addOrder: (order: Order) => void;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      const savedCart = localStorage.getItem('cart');
      const savedOrders = localStorage.getItem('orders');

      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(new Set(parsed));
        }
      }

      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }

      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      }
    } catch (err) {
      console.error('Error parsing localStorage:', err);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Mock orders if none exist
  useEffect(() => {
    if (orders.length === 0 && products.length > 0) {
      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          date: '2024-12-15',
          status: 'Delivered',
          total: 299.99,
          items: [
            {
              id: 1,
              title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
              price: 109.95,
              quantity: 1,
              image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
            },
            {
              id: 2,
              title: 'Mens Casual Premium Slim Fit T-Shirts',
              price: 22.30,
              quantity: 2,
              image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
            }
          ]
        },
        {
          id: 'ORD-002',
          date: '2024-12-10',
          status: 'Processing',
          total: 168.99,
          items: [
            {
              id: 3,
              title: 'Mens Cotton Jacket',
              price: 55.99,
              quantity: 1,
              image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
            },
            {
              id: 4,
              title: 'Mens Casual Slim Fit',
              price: 15.99,
              quantity: 3,
              image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'
            }
          ]
        },
        {
          id: 'ORD-003',
          date: '2024-12-05',
          status: 'Shipped',
          total: 695.99,
          items: [
            {
              id: 6,
              title: 'Solid Gold Petite Micropave',
              price: 168.00,
              quantity: 1,
              image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg'
            },
            {
              id: 5,
              title: 'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet',
              price: 695.00,
              quantity: 1,
              image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'
            }
          ]
        }
      ];
      setOrders(mockOrders);
    }
  }, [products, orders.length]);

  const toggleFavorite = (id: number) => {
    if (!(favorites instanceof Set)) {
      console.warn('Favorites corrupted, resetting...');
      setFavorites(new Set([id]));
      return;
    }

    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { id: product.id, quantity }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  };

  return (
    <AppContext.Provider value={{
      products,
      loading,
      favorites,
      cart,
      orders,
      user,
      toggleFavorite,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      addOrder,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
