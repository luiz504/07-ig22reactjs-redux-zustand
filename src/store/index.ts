import { configureStore, createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Make Coffee', 'Study Redux', 'Study Zustand'],
  reducers: {
    add: (state, action) => {
      state.push(action.payload.newTodo)
      console.log(state, action)
    },
  },
})
export const { add } = todoSlice.actions

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector
