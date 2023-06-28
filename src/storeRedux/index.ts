import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { playerReducer } from './slices/player'

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
})

export type RootStore = ReturnType<typeof store.getState>
export const useStoreSelector: TypedUseSelectorHook<RootStore> = useSelector

export type StoreDispatch = typeof store.dispatch
export const useStoreDispatch: () => StoreDispatch = useDispatch
