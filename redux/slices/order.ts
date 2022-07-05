import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import axios from 'axios'
import { AppState } from '../store'

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (_,{getState}) => {
    const state:any = getState()
    const res = await axios.post('http://localhost:3000/api/order/get', {user: state.user.data})
    return { data: res.data.data, message: res.data.message }
})

interface InitialState {
    message: string,
    status: "loading" | "success" | "error",
    data: any[]
}

const initialState: InitialState = {
    message: "",
    status: "loading",
    data: null,    
}

const name = "order"

export const orderSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    setOrder: (state, action:PayloadAction<InitialState>) => {
        state.data = action.payload.data
        state.message = action.payload.message
    }
  },
  extraReducers: {
    [fetchOrder.pending.toString()]: (state) => {
      state.status = "loading",
      state.message = "",
      state.data = null
    },
    [fetchOrder.fulfilled.toString()]: (state, action) => {
      state.status = "success",
      state.message = action.payload.message
      state.data = action.payload.data
    },
    [fetchOrder.rejected.toString()]: (state, action) => {
      state.message = action.payload.message
      state.status = "error"
      state.data = null
    }
  }
})

export const { setOrder } = orderSlice.actions

export const selectOrder = (state: AppState) => state.order

export const orderReducer = orderSlice.reducer

