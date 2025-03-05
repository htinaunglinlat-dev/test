import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../components/ProductCard";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await fetch('http://localhost:3000/products')

    if(!response.ok) {
      throw new Error("failed to fetch the product: Custom Error")
    }
    const data = await response.json()
    return data 
  } catch (error) {
    let errorMessage = ''
    if(error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = 'unexpected error occurred.'
    }
    throw new Error(errorMessage)
  }
})

interface ProductState {
  isLoading: boolean,
  errorMessage: null | string,
  productLists: [] | ProductType[]
}

// Define the initial state using that type
const initialState: ProductState = {
  isLoading: false,
  errorMessage: null,
  productLists: []
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.errorMessage = null
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.productLists = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message!
      })
  }
})

export default productSlice.reducer
