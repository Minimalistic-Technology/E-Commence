"use client";

import React, { useState } from "react";
import api from "@/utils/api";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Shield,
  Check,
  ShoppingBag,
  Package,
  CreditCard,
  Truck,
  Star,
  Heart,
} from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", color: "text-red-500" };
    if (password.length < 10)
      return { strength: "medium", color: "text-amber-500" };
    return { strength: "strong", color: "text-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

      try {
        const response = await api.post("/signup", {
          username: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "student",
        });

        const data = response.data;

        alert(data.message || "Signup successful!");
        setFormData({ fullName: "", email: "", password: "" });
      } catch (err: any) {
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("Network error. Please try again.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Animated background icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20"></div>
        <div className="absolute top-20 left-10 animate-bounce">
          <ShoppingBag className="w-8 h-8 text-blue-200/40" />
        </div>
        <div className="absolute top-32 right-16 animate-bounce">
          <Package className="w-6 h-6 text-indigo-200/40" />
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce">
          <CreditCard className="w-7 h-7 text-blue-200/40" />
        </div>
        <div className="absolute bottom-20 right-12 animate-bounce">
          <Truck className="w-8 h-8 text-indigo-200/40" />
        </div>
        <div className="absolute top-1/2 left-8 animate-bounce">
          <Star className="w-5 h-5 text-blue-200/40" />
        </div>
        <div className="absolute top-1/3 right-8 animate-bounce">
          <Heart className="w-6 h-6 text-indigo-200/40" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h1>
          <p className="text-slate-600 text-sm">
            Join thousands of satisfied customers
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 inset-y-0 flex items-center">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 inset-y-0 flex items-center">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 inset-y-0 flex items-center">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a secure password"
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 inset-y-0 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {formData.password && (
                <div className="flex items-center space-x-2 text-xs mt-1">
                  <div className="flex space-x-1">
                    <div
                      className={`h-1 w-6 rounded-full ${
                        formData.password.length >= 6
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`}
                    />
                    <div
                      className={`h-1 w-6 rounded-full ${
                        formData.password.length >= 8
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`}
                    />
                    <div
                      className={`h-1 w-6 rounded-full ${
                        formData.password.length >= 10
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`}
                    />
                  </div>
                  <span className={`${passwordStrength.color} font-medium`}>
                    {passwordStrength.strength.charAt(0).toUpperCase() +
                      passwordStrength.strength.slice(1)}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{" "}
            <a
              href="/logIn"
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2 transition-colors"
            >
              Log In
            </a>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center text-xs text-slate-500 space-x-2">
          <Check className="w-4 h-4 text-emerald-500" />
          <span>SSL Secured • 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
}
