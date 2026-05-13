import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('user', JSON.stringify({ email }));
        setIsLoading(false);
        navigate('/');
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    const demoEmail = 'demo@example.com';
    localStorage.setItem('user', JSON.stringify({ email: demoEmail }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl shadow-xl border border-gray-200">
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-purple-700 to-indigo-700 text-white p-10">
          <p className="text-sm uppercase tracking-widest text-purple-100">ShopHub</p>
          <h1 className="text-4xl font-extrabold mt-3">Welcome back to your shopping space.</h1>
          <p className="mt-4 text-purple-100">Track orders, manage cart, and complete checkout in seconds.</p>
        </div>

        <div className="bg-white p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🛍️</div>
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-600 mt-2">Continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold text-white transition-all ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <button
              onClick={handleDemoLogin}
              className="w-full py-2 px-4 rounded-lg font-semibold text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              Try Demo Account
            </button>
            <p className="text-center text-gray-600 text-sm mt-3">
              Use demo@example.com with any password
            </p>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account? <a href="#" className="text-purple-600 hover:underline font-semibold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
