import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../store'

export interface iCart {
    items: any[],
    qty: number,
    amount: number
}

interface Item {
    id: string,
    title: string,
    price: number,
    image: string,
    totalPrice?: number,
    count?: number
}

const initialState: iCart = {
    items: [],
    qty: 0,
    amount: 0
}

const totalQty = (storage) => storage.qty = storage.items.reduce((acc, i) => acc+(parseInt(i.count)), 0)

const totalAmount = (storage) => storage.amount = storage.items.reduce((acc, i) => acc+(parseInt(i.price)*i.count), 0)

const saveStorageCart = (storage) => window.localStorage.setItem('cart', JSON.stringify(storage) )

const getStorageCart = () => {
  if(typeof window !== 'undefined') {
    const storage = JSON.parse(window.localStorage.getItem('cart'))
    if(storage) {
      return storage
    }
  }
  return initialState
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: getStorageCart(),
  reducers: {
    addToCart: (state, action:PayloadAction<Item>) => {
        const existItem = state.items.find(i => i.id === action.payload.id)

        if(existItem) {
            existItem.count++
            existItem.totalPrice = existItem.totalPrice + action.payload.price
        }
        else {
          state.items.push({
            id: action.payload.id,
            title: action.payload.title,
            price: action.payload.price,
            totalPrice: action.payload.price,
            count: 1,
            image: action.payload.image
          })
        }
        totalAmount(state)
        totalQty(state)
        saveStorageCart(state)
    },
    removeFromCart: (state, action: PayloadAction<Item>) => {
      const existItem = state.items.find(i => i.id === action.payload.id)

      if(existItem && existItem.count === 1) {
        state.items.splice( state.items.indexOf(existItem), 1)
      }
      else if(existItem) {
        existItem.count--
        existItem.totalPrice = existItem.totalPrice - action.payload.price
      }
      totalAmount(state)
      totalQty(state)
      saveStorageCart(state)
    },
    resetCart: (state) => {
      Object.assign(state, initialState)

      saveStorageCart(state)
    },
    deleteFromCart: (state, action: PayloadAction<Item>) => {
      const existItem = state.items.find(i => i.id === action.payload.id)
      
      if(existItem) {
        state.items.splice( state.items.indexOf(existItem), 1)
      }

      totalAmount(state)
      totalQty(state)
      saveStorageCart(state)
    }

   },
   extraReducers: {
    [HYDRATE]: (state, action) => {
      state = action.payload.cart
    }
  }
})

export const { addToCart, removeFromCart, resetCart, deleteFromCart } = cartSlice.actions
export const selectCart = (state: AppState) => state.cart
export const cartReducer = cartSlice.reducer

