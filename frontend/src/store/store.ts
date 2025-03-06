import { configureStore } from '@reduxjs/toolkit'
// ...
import counterSlice from './features/counterSlice'
import productSlice from './features/productSlice'
import productByPageSlice from './features/productByPageSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    product: productSlice,
    productByPage: productByPageSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch