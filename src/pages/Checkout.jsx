import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartItems, clearCart, selectCartTotalPrice } from "../slices/cartSlice";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Checkout = () => {
  const cart = useSelector(cartItems);
  const subTotal = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
  });

  const tax = subTotal * 0.1;
  const shipping = subTotal > 99 ? 0 : 9;
  const total = subTotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(form).every((value) => value.trim() !== "");

  const completeOrder = () => {
    dispatch(clearCart());
    navigate("/", { replace: true });
  };

  const openRazorpay = async () => {
    setIsPaying(true);
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Unable to load Razorpay checkout. Please try again.");
      setIsPaying(false);
      return;
    }

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag";

    const options = {
      key,
      amount: Math.round(total * 100),
      currency: "INR",
      name: "ShopHub",
      description: "Demo payment for order",
      handler: function () {
        alert("Payment successful (demo mode). Order placed!");
        completeOrder();
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: `${form.address}, ${form.city}, ${form.pinCode}`,
      },
      theme: {
        color: "#a855f7",
      },
      modal: {
        ondismiss: function () {
          setIsPaying(false);
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setIsPaying(false);
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid) {
      alert("Please fill all delivery details.");
      return;
    }

    if (paymentMethod === "cod") {
      alert("Order placed with Cash on Delivery (demo).");
      completeOrder();
      return;
    }

    await openRazorpay();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="card glass-effect text-center max-w-md w-full relative z-10 animate-slide-up p-10">
          <div className="text-6xl mb-4 opacity-70">📦</div>
          <h2 className="text-3xl font-black text-slate-900 mb-3">Empty Checkout</h2>
          <p className="text-slate-500 mb-8 font-medium">Your cart is empty. Add some products before checking out.</p>
          <Link to="/" className="btn-primary w-full shadow-lg shadow-purple-500/20">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12 px-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 relative z-10">
        <div className="lg:col-span-7 xl:col-span-8 animate-slide-up stagger-1">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">Secure Checkout</h1>
            <p className="text-slate-500 font-medium text-lg">Complete your order by providing your details below.</p>
          </div>

          <div className="card glass-effect mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input className="input-field bg-white/70 focus:bg-white" name="name" placeholder="Full Name" value={form.name} onChange={handleInputChange} />
              <input className="input-field bg-white/70 focus:bg-white" name="email" placeholder="Email Address" type="email" value={form.email} onChange={handleInputChange} />
              <input className="input-field bg-white/70 focus:bg-white" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleInputChange} />
              <input className="input-field bg-white/70 focus:bg-white" name="city" placeholder="City" value={form.city} onChange={handleInputChange} />
              <input className="input-field bg-white/70 focus:bg-white md:col-span-2" name="address" placeholder="Street Address" value={form.address} onChange={handleInputChange} />
              <input className="input-field bg-white/70 focus:bg-white" name="pinCode" placeholder="PIN Code" value={form.pinCode} onChange={handleInputChange} />
            </div>
          </div>

          <div className="card glass-effect">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            <div className="space-y-4">
              <label className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'razorpay' ? 'border-purple-500 bg-purple-50/50' : 'border-slate-200 bg-white/50 hover:border-purple-200'}`}>
                <div className="relative flex items-center justify-center">
                  <input type="radio" name="paymentMethod" className="peer sr-only" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")} />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-purple-600' : 'border-slate-300'}`}>
                    {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 rounded-full bg-purple-600"></div>}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block text-lg">Razorpay Checkout</span>
                  <span className="text-sm text-slate-500 font-medium">Credit Card, UPI, NetBanking (Test Mode)</span>
                </div>
                <div className="text-2xl">💳</div>
              </label>

              <label className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? 'border-purple-500 bg-purple-50/50' : 'border-slate-200 bg-white/50 hover:border-purple-200'}`}>
                <div className="relative flex items-center justify-center">
                  <input type="radio" name="paymentMethod" className="peer sr-only" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-purple-600' : 'border-slate-300'}`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-purple-600"></div>}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block text-lg">Cash on Delivery</span>
                  <span className="text-sm text-slate-500 font-medium">Pay when you receive the order</span>
                </div>
                <div className="text-2xl">💵</div>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 animate-slide-up stagger-2">
          <div className="card glass-effect sticky top-28 border-white/50 shadow-xl shadow-purple-100/50">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 border-b border-slate-200/60 pb-6 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-bold text-slate-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-slate-600 font-medium mb-6">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-slate-900 font-bold">${subTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (10%)</span><span className="text-slate-900 font-bold">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-emerald-500 font-bold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
            </div>

            <div className="flex justify-between items-end bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <span className="text-lg font-bold text-slate-600">Total to pay</span>
              <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                ${total.toFixed(2)}
              </span>
            </div>

            <button onClick={handlePlaceOrder} disabled={isPaying} className="btn-primary w-full py-4 text-lg shadow-purple-500/30 group">
              {isPaying ? "Processing..." : (
                <span className="flex items-center justify-center gap-2">
                  {paymentMethod === "razorpay" ? "Pay Securely" : "Place Order"}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
