import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartTotalItems } from '../slices/cartSlice';

const Navbar = () => {
  const cartCount = useSelector(selectCartTotalItems);

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🛍️</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">ShopHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link to="/" className="text-slate-600 hover:text-purple-600 transition-colors">Products</Link>
            <Link to="/login" className="text-slate-600 hover:text-purple-600 transition-colors">Account</Link>
            <Link to="/checkout" className="text-slate-600 hover:text-purple-600 transition-colors">Checkout</Link>
          </div>

          <Link to="/cart" className="relative flex items-center gap-2 bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-full px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm border border-slate-200">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-[10px] text-white shadow-md animate-slide-up">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="md:hidden mt-3 grid grid-cols-3 gap-2 text-sm">
          <Link to="/" className="text-center py-2 rounded-xl glass-effect shadow-sm hover:shadow-md font-medium text-slate-700">Products</Link>
          <Link to="/checkout" className="text-center py-2 rounded-xl glass-effect shadow-sm hover:shadow-md font-medium text-slate-700">Checkout</Link>
          <Link to="/login" className="text-center py-2 rounded-xl glass-effect shadow-sm hover:shadow-md font-medium text-slate-700">Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
