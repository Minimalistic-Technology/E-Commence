"use client";
import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Check, 
  ShoppingBag, 
  Star, 
  Heart, 
  Gift, 
  Zap,
  Sparkles,
  Crown,
  Diamond,
  Gem,
  Award,
  TrendingUp,
  Globe,
  Truck,
  CreditCard
} from 'lucide-react';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'text-red-500', bg: 'bg-red-500' };
    if (password.length < 10) return { strength: 'medium', color: 'text-amber-500', bg: 'bg-amber-500' };
    return { strength: 'strong', color: 'text-emerald-500', bg: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const floatingIcons = [
    { Icon: ShoppingBag, color: 'text-blue-500', delay: 0 },
    { Icon: Star, color: 'text-yellow-500', delay: 0.5 },
    { Icon: Heart, color: 'text-pink-500', delay: 1 },
    { Icon: Gift, color: 'text-purple-500', delay: 1.5 },
    { Icon: Zap, color: 'text-orange-500', delay: 2 },
    { Icon: Sparkles, color: 'text-cyan-500', delay: 2.5 },
    { Icon: Crown, color: 'text-amber-500', delay: 3 },
    { Icon: Diamond, color: 'text-indigo-500', delay: 3.5 },
    { Icon: Gem, color: 'text-emerald-500', delay: 4 },
    { Icon: Award, color: 'text-red-500', delay: 4.5 },
    { Icon: TrendingUp, color: 'text-green-500', delay: 5 },
    { Icon: Globe, color: 'text-blue-600', delay: 5.5 }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rotate-45 animate-spin-slow opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 left-3/4 w-5 h-5 bg-gradient-to-r from-yellow-500 to-orange-500 rotate-12 animate-ping opacity-60"></div>
        
        {/* Mouse Follower Effect */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Crown className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  E-commerce
                </h1>
                <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Premium E-commerce</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Products', 'Categories', 'Deals', 'Support'].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text font-medium transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-5rem)] relative z-10">
        {/* Left Hero Section */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-8 relative">
          {/* Floating Icons */}
          {floatingIcons.map(({ Icon, color, delay }, index) => (
            <div
              key={index}
              className={`absolute ${color} opacity-20 hover:opacity-60 transition-all duration-500 hover:scale-150 cursor-pointer`}
              style={{
                left: `${10 + (index % 4) * 20}%`,
                top: `${15 + Math.floor(index / 4) * 25}%`,
                animationDelay: `${delay}s`,
              }}
            >
              <Icon 
                size={24 + (index % 3) * 8} 
                className="animate-bounce hover:animate-spin transition-all duration-300" 
              />
            </div>
          ))}

          <div className={`max-w-2xl text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Hero Illustration */}
            <div className="relative mb-12 group">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Central Shopping Elements */}
                <div className="relative z-10 flex items-center justify-center space-x-6">
                  <div className="relative group/item">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover/item:shadow-xl transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6">
                      <ShoppingBag className="w-12 h-12 text-white group-hover/item:animate-bounce" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                  </div>
                  
                  <div className="relative group/item">
                    <div className="w-28 h-28 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover/item:shadow-xl transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6">
                      <CreditCard className="w-14 h-14 text-white group-hover/item:animate-pulse" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="relative group/item">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover/item:shadow-xl transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-12">
                      <Truck className="w-10 h-10 text-white group-hover/item:animate-bounce" />
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 animate-float">
                  <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute top-12 right-12 animate-float delay-1000">
                  <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
                </div>
                <div className="absolute bottom-8 left-12 animate-float delay-2000">
                  <Gift className="w-6 h-6 text-purple-500 animate-pulse" />
                </div>
                <div className="absolute bottom-12 right-8 animate-float delay-3000">
                  <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Welcome to the
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 bg-clip-text text-transparent animate-gradient delay-500">
                  Future of Shopping
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
                Experience premium e-commerce with cutting-edge technology, 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold"> lightning-fast delivery</span>, 
                and <span className="bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent font-semibold">unmatched quality</span>.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: Shield, text: 'Secure', color: 'from-green-500 to-blue-500' },
                  { icon: Zap, text: 'Fast', color: 'from-yellow-500 to-orange-500' },
                  { icon: Award, text: 'Premium', color: 'from-purple-500 to-pink-500' },
                  { icon: Globe, text: 'Global', color: 'from-blue-500 to-cyan-500' }
                ].map(({ icon: Icon, text, color }, index) => (
                  <div
                    key={text}
                    className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${color} rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer group`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Icon className="w-4 h-4 group-hover:animate-spin" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative">
          <div className={`w-full max-w-md transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
              {/* Card Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group cursor-pointer">
                    <User className="w-8 h-8 text-white group-hover:animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600">Log in to your premium account</p>
                </div>

                {/* Login Form */}
                <form className="space-y-6">
                  {/* Full Name Field */}
                  {/* <div className="space-y-2 group">
                    <label className="block text-sm font-semibold text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-800 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 hover:shadow-md hover:bg-white/80"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 hover:from-blue-500/5 hover:via-purple-500/5 hover:to-pink-500/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div> */}

                  {/* Email Field */}
                  <div className="space-y-2 group">
                    <label className="block text-sm font-semibold text-gray-700 mb-1 group-hover:text-purple-600 transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-800 group-hover:text-purple-500 transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 hover:shadow-md hover:bg-white/80"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-red-500/0 hover:from-purple-500/5 hover:via-pink-500/5 hover:to-red-500/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 group">
                    <label className="block text-sm font-semibold text-gray-700 mb-1 group-hover:text-pink-600 transition-colors">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-800 group-hover:text-pink-500 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        className="w-full pl-10 pr-12 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 hover:border-gray-300 hover:shadow-md hover:bg-white/80"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800 hover:text-pink-600 transition-all duration-200 hover:scale-110"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 via-red-500/0 to-orange-500/0 hover:from-pink-500/5 hover:via-red-500/5 hover:to-orange-500/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    {formData.password && (
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="flex space-x-1">
                          <div className={`h-1 w-6 rounded-full transition-all duration-300 ${formData.password.length >= 6 ? passwordStrength.bg : 'bg-gray-200'}`}></div>
                          <div className={`h-1 w-6 rounded-full transition-all duration-300 ${formData.password.length >= 8 ? passwordStrength.bg : 'bg-gray-200'}`}></div>
                          <div className={`h-1 w-6 rounded-full transition-all duration-300 ${formData.password.length >= 10 ? passwordStrength.bg : 'bg-gray-200'}`}></div>
                        </div>
                        <span className={`${passwordStrength.color} font-medium transition-colors duration-300`}>
                          {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-3 group">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                        required
                      />
                    </div>
                    <label htmlFor="terms" className="text-sm text-gray-600 leading-5 group-hover:text-gray-800 transition-colors">
                      I agree to the{' '}
                      <a href="#" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 font-medium underline decoration-1 underline-offset-2 transition-all duration-300">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-red-500 font-medium underline decoration-1 underline-offset-2 transition-all duration-300">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Log In</span>
                      <Crown className="w-5 h-5 group-hover:animate-bounce" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 group hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 group hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{' '}
                  <a href="/signin" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 font-semibold underline decoration-1 underline-offset-2 transition-all duration-300">
                    Sign in here
                  </a>
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500 group hover:text-gray-700 transition-colors cursor-pointer">
              <div className="flex items-center space-x-1 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm group-hover:shadow-md group-hover:bg-white/80 transition-all duration-300">
                <Shield className="w-4 h-4 text-green-500 group-hover:animate-pulse" />
                <span>SSL Secured</span>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <Lock className="w-4 h-4 text-blue-500 group-hover:animate-pulse" />
                <span>256-bit Encryption</span>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <Check className="w-4 h-4 text-emerald-500 group-hover:animate-bounce" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default App;