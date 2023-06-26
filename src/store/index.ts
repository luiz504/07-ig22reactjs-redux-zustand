import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { playerReducer } from './slices/player'

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector

export type StoreDispatch = typeof store.dispatch
export const useStoreDispatch: () => StoreDispatch = useDispatch
