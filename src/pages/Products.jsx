import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, productList, selectProductStatus, selectProductCategories } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(productList);
  const status = useSelector(selectProductStatus);
  const categories = useSelector(selectProductCategories);

  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProduct());
    }
  }, [dispatch, status]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setNotification(`${product.title.substring(0, 24)} added to cart`);
    setTimeout(() => setNotification(null), 2500);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const categoryMatch = filter === "all" ? true : product.category === filter;
        const searchMatch = product.title.toLowerCase().includes(search.toLowerCase());
        return categoryMatch && searchMatch;
      })
      .sort((a, b) => {
        if (sortBy === "priceLow") return a.price - b.price;
        if (sortBy === "priceHigh") return b.price - a.price;
        if (sortBy === "rating") return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        return 0;
      });
  }, [products, filter, search, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-48 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-48 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      {notification && (
        <div className="fixed top-24 right-4 glass-effect border-emerald-200 bg-white/80 text-emerald-800 px-6 py-4 rounded-2xl shadow-xl z-50 animate-slide-up flex items-center gap-3 font-medium">
          <span className="text-xl">✨</span>
          {notification}
        </div>
      )}

      {status === 'loading' ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center animate-slide-up">
            <div className="text-6xl mb-6 animate-bounce">🛍️</div>
            <p className="text-slate-600 text-xl font-medium">Curating premium products...</p>
          </div>
        </div>
      ) : status === 'failed' ? (
        <div className="min-h-screen flex items-center justify-center text-center">
          <div className="card max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
            <p className="text-slate-600 mb-4">We couldn't load the products. Please check your connection and try again.</p>
            <button onClick={() => dispatch(getProduct())} className="btn-primary w-full">Retry</button>
          </div>
        </div>
      ) : (
        <div className="py-8 md:py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="mb-10 md:mb-16 rounded-[2rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-8 py-12 md:px-14 md:py-16 text-white shadow-2xl relative overflow-hidden animate-slide-up">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="max-w-2xl text-center lg:text-left">
                  <p className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-bold uppercase tracking-wider text-purple-200 mb-6 backdrop-blur-md shadow-sm">✨ New Season Collection</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6">
                    Smart shopping for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 drop-shadow-sm">style & essentials.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                    Discover premium products with a smooth mobile experience and fast checkout. Elevate your everyday with our curated selection.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })} className="px-8 py-3.5 rounded-xl bg-white text-indigo-900 font-bold hover:bg-yellow-50 hover:scale-105 transition-all shadow-lg shadow-white/20">
                      Shop Now
                    </button>
                    <button className="px-8 py-3.5 rounded-xl bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md">
                      View Offers
                    </button>
                  </div>
                </div>

                {/* Visual Graphic */}
                <div className="hidden lg:block relative w-80 h-80 xl:w-96 xl:h-96">
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-purple-500 rounded-full animate-pulse-soft opacity-30 blur-2xl"></div>
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Shopping Fashion" className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl z-10" />

                  {/* Floating badges */}
                  <div className="absolute top-10 -left-6 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl z-20 animate-bounce">
                    <span className="text-3xl">🛍️</span>
                  </div>
                  <div className="absolute bottom-10 -right-6 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl z-20 animate-bounce" style={{ animationDelay: '1s' }}>
                    <span className="text-3xl">⭐</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter & Search Bar - Glassmorphic */}
            <div className="mb-10 sticky top-20 z-40 glass-effect p-4 rounded-2xl shadow-sm animate-slide-up stagger-1">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                  <input className="input-field pl-11 bg-white/50 focus:bg-white" placeholder="Search premium products..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="md:col-span-4">
                  <select className="input-field bg-white/50 focus:bg-white capitalize" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <select className="input-field bg-white/50 focus:bg-white" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Sort: Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="mt-4 flex flex-wrap gap-2 items-center px-1">
                <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider mr-2">Quick Filters:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-1.5 rounded-full capitalize text-sm font-medium transition-all duration-300 ${filter === category
                      ? "bg-[var(--primary-gradient)] text-blue-800 shadow-md shadow-purple-500/30 scale-105"
                      : "bg-white/60 text-slate-600 hover:bg-white hover:shadow-sm"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-slide-up stagger-2">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card group flex flex-col h-full bg-white/80 backdrop-blur-sm border-white/40">
                  <div className="relative bg-white rounded-xl p-6 flex items-center justify-center h-64 overflow-hidden mb-5 border border-slate-100 group-hover:border-purple-100 transition-colors">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm text-xs font-bold text-slate-700 flex items-center gap-1 border border-slate-100">
                      <span className="text-yellow-400 text-sm">★</span>
                      {(product.rating?.rate || 4).toFixed(1)}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-purple-600 mb-2">{product.category}</span>
                    <h3 className="font-bold text-slate-900 line-clamp-2 mb-3 text-lg leading-tight group-hover:text-purple-700 transition-colors">{product.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">{product.description}</p>

                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                      <div>
                        <p className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn-primary py-2 px-5 text-sm shadow-purple-500/20 hover:shadow-purple-500/40"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 card glass-effect max-w-2xl mx-auto mt-10 animate-slide-up">
                <div className="text-6xl mb-6 opacity-50">🔍</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No products found</h3>
                <p className="text-slate-500 text-lg">Try adjusting your search or category filters to find what you're looking for.</p>
                <button onClick={() => { setSearch(""); setFilter("all"); }} className="mt-6 btn-secondary">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
