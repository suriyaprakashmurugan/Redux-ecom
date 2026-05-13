import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartItems, removeFromCart, updateCartItem, selectCartTotalPrice } from '../slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector(cartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ id, updatedItem: { quantity: newQuantity } }));
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] bg-slate-50 py-12 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        <div className="max-w-md w-full relative z-10">
          <div className="card glass-effect text-center p-10 animate-slide-up">
            <div className="text-7xl mb-6 opacity-80 animate-bounce">🛒</div>
            <h1 className="text-3xl font-black text-slate-900 mb-3">Cart is Empty</h1>
            <p className="text-slate-500 mb-8 font-medium">Looks like you haven't added anything yet. Discover our premium collection!</p>
            <Link to="/" className="btn-primary w-full shadow-lg shadow-purple-500/30">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 md:mb-10 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 drop-shadow-sm">Shopping Cart</h1>
          <p className="text-slate-500 mt-3 font-medium text-lg">{cart.length} unique item(s) in your bag</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-8 animate-slide-up stagger-1">
            <div className="space-y-5">
              {cart.map((item) => (
                <div key={item.id} className="card group hover:border-purple-200">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:border-purple-100 transition-colors shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-24 h-48 sm:h-24 object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-slate-900 line-clamp-2 text-lg group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[var(--primary-gradient)] bg-clip-text text-transparent font-black text-xl mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center border-2 border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                          className="px-4 py-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 bg-white font-bold text-slate-900 border-x-2 border-slate-200">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                          className="px-4 py-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-left sm:text-right min-w-[100px]">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Subtotal</p>
                        <p className="text-xl font-black text-slate-900">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 animate-slide-up stagger-2">
            <div className="card glass-effect sticky top-28 border-white/50 shadow-xl shadow-indigo-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Summary</h2>

              <div className="space-y-4 mb-6 border-b border-slate-200/60 pb-6">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded text-sm">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Tax (10%)</span>
                  <span className="text-slate-900 font-bold">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-lg font-bold text-slate-600">Total</span>
                <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>

              <Link to="/checkout" className="w-full btn-primary mb-3 text-lg py-4 shadow-purple-500/30">
                Proceed to Checkout
              </Link>

              <Link to="/" className="w-full text-center block text-slate-500 hover:text-purple-600 font-semibold py-3 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
