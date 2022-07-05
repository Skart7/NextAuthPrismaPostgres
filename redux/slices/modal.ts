import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../store'

interface SnackbarObj {
    severity: "success" | "error" | "warning" | "info", 
    message: string, 
    show: boolean
}

interface iModalState {
    cart: boolean,
    login: boolean,
    search: boolean,
    snackbar: SnackbarObj
}

const initialState: iModalState = {
    cart: false,
    login: false,
    search: false,
    snackbar: { severity: "success", message: null, show: false }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalCart: (state, action:PayloadAction<boolean>) => {
        state.cart = action.payload
    },
    setModalLogin: (state, action:PayloadAction<boolean>) => {
        state.login = action.payload
    },
    setModalSearch: (state, action:PayloadAction<boolean>) => {
        state.search = action.payload
    },
    setSnackbar: (state, action:PayloadAction<SnackbarObj>) => {
      state.snackbar = action.payload
    },
    resetSnackbar: (state) => {
      state.snackbar = initialState.snackbar
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state = action.payload.modal
    }
  }
})

export const { setModalCart, setModalLogin, setModalSearch, setSnackbar, resetSnackbar } = modalSlice.actions

export const selectModal = (state: AppState) => state.modal

export const modalReducer = modalSlice.reducer

