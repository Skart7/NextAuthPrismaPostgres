import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { userReducer } from './slices/user'
import { cartReducer } from './slices/cart'
import { modalReducer } from './slices/modal'
import { searchReducer } from './slices/search'
import { orderReducer } from './slices/order'

export function makeStore() {
  return configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        modal: modalReducer,
        search: searchReducer,
        order: orderReducer,
    },
    devTools: true
  })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppState,unknown,Action<string>>

export const wrapper = createWrapper<AppStore>(makeStore)