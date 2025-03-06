import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductType } from "../../components/ProductCard"

interface FetchProductsByPageResponseData {
  first: number,
  prev: number | null, // previous page number
  next: number  | null, // next page number
  last: number, // last page number
  pages: number, // total page available
  items: number, // the total data available
  data: ProductType[]
}

interface FetchProductsByPageArgs {
  page: number
  perPageItem?: number
}

interface FetchProductsByPageReturnType {
  currentPage: number
  lastPage: number
  productLists: ProductType[]
}

export const fetchProductsByPage = createAsyncThunk<FetchProductsByPageReturnType,FetchProductsByPageArgs> ('productByPage/fetchProductsByPage', async(arg) => {
  const {page} = arg
  const perPageItem = arg.perPageItem || 8
  try{
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await fetch(`http://localhost:3000/products?_page=${page}&_per_page=${perPageItem}`)
    if(!response.ok) throw new Error("failed to fetch the product: Custom Error")
    const data: FetchProductsByPageResponseData = await response.json()
    const returnData: FetchProductsByPageReturnType = {
      currentPage: data.next ? data.next -1 : data.pages,
      lastPage: data.last,
      productLists: [...data.data]
    }
    return returnData
  } catch (error) {
    let errorMessage = ''
    if(error instanceof Error) errorMessage = error.message
    else errorMessage = 'unexpected error occurred.'
    throw new Error(errorMessage)
  }
})

interface ProductByPageState {
  isLoading: boolean,
  errorMessage: null | string,
  currentPage: number,
  lastPage: number,
  productLists: ProductType[]
}

// Define the initial state using that type
const initialState: ProductByPageState = {
  isLoading: false,
  errorMessage: null,
  currentPage: 0,
  lastPage: 0,
  productLists: []
}

const productByPageSlice = createSlice({
  name: 'productByPage',
  initialState,
  reducers: {
    reset: (state) => {
      state.productLists = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsByPage.pending, (state) => {
        state.errorMessage = null
        state.isLoading = true
      })
      .addCase(fetchProductsByPage.fulfilled, (state, action: PayloadAction<FetchProductsByPageReturnType>) => {
        const {productLists, currentPage, lastPage} = action.payload
        state.isLoading = false,
        state.currentPage = currentPage
        state.lastPage = lastPage
        console.log(productLists)
        state.productLists = state.productLists.concat(productLists)
      })
      .addCase(fetchProductsByPage.rejected, (state, action) => {
        state.isLoading = false,
        state.errorMessage = action.error.message || "Unknown Error"
      })
  }
})

export default productByPageSlice.reducer
export const {reset} = productByPageSlice.actions