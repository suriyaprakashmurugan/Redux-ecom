import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk("products/getProduct", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: "productList",
  initialState: { 
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; 
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { removeProduct, updateProduct } = productSlice.actions;

// Selectors
export const productList = (state) => state.products.products;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;

// Memoized Selector for Categories
export const selectProductCategories = createSelector(
  [productList],
  (products) => ["all", ...new Set(products.map((p) => p.category))]
);

export default productSlice.reducer;
