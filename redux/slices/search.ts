import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../store'

const name = "search"

interface Item {
    label: string,
    date: string,
}
interface iSearch {
    recentQuerys: Item[]
}
const initialState: iSearch = {
    recentQuerys: []
}

const saveStorage = (storage) => window.localStorage.setItem(name, JSON.stringify(storage) )

const getStorage = () => {
  if(typeof window !== 'undefined') {
    const storage = JSON.parse(window.localStorage.getItem(name))
    if(storage) {
      return storage
    }
  }
  return initialState
}

export const searchSlice = createSlice({
  name: name,
  initialState: getStorage(),
  reducers: {
        setQuery: (state, action:PayloadAction<string>) => {
            const existQuery = state.recentQuerys.find(obj => obj.label === action.payload.toLowerCase())

            if(!existQuery) {
              state.recentQuerys.push({
                label: action.payload.toLowerCase(),
              })
              saveStorage(state)
            }
        },
        removeQuery: (state, action:PayloadAction<string>) => {
            const existQuery = state.recentQuerys.find(obj => obj.label === action.payload)
    
            if(existQuery) {
                state.recentQuerys.splice( state.recentQuerys.indexOf(existQuery), 1)
            }
            saveStorage(state)
        },
        resetQuerys: (state) => {
            Object.assign(state, initialState)
            saveStorage(state)
        }
   },
   extraReducers: {
    [HYDRATE]: (state, action) => {
      state = action.payload.search
    }
  }
})

export const { setQuery, removeQuery, resetQuerys } = searchSlice.actions
export const selectSearch = (state: AppState) => state.search
export const searchReducer = searchSlice.reducer

