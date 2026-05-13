import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productList, getProduct } from "../slices/productSlice";
import { cartItems, addToCart, removeFromCart } from "../slices/cartSlice";

const ProductList = () => {
  const products = useSelector(productList);
  const cartCount = useSelector(cartItems).length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      <h2>cart List {useSelector(cartItems).length}</h2>
      <h1>ProductList</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{product.title}</h3>
            {/* <p>{product.description}</p> */}
            <p>${product.price}</p>
            <div>
              <button className="" onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>
              <button
                className=""
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
