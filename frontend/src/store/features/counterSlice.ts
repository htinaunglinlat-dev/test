import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toast'

// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      if(state.value === 0) {
        toast.warn('cannot decrease value from 0', {
          
        })
      } else {
        state.value--
      }
    },
    reset: (state) => {
      state.value = 0
    }
  },
})

export const { increment, decrement, reset } = counterSlice.actions

export default counterSlice.reducer