import { expect, describe, it } from 'vitest'

import {
  PlayerState,
  loadCourse,
  next,
  play,
  playerReducer,
  playerSlice,
} from './player'
import { configureStore } from '@reduxjs/toolkit'

const mockCourseData = {
  id: 1,
  modules: [
    {
      id: '1',
      title: 'Iniciando com React',
      lessons: [
        { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
        {
          id: 'w-DW4DhDfcw',
          title: 'Estilização do Post',
          duration: '10:05',
        },
      ],
    },
    {
      id: '2',
      title: 'Estrutura da aplicação',
      lessons: [
        {
          id: 'gE48FQXRZ_o',
          title: 'Componente: Comment',
          duration: '13:45',
        },
        { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
      ],
    },
  ],
}
const exampleState: PlayerState = {
  course: mockCourseData,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}
const playerSliceInitialState = playerSlice.getInitialState()

describe('Redux Player slice', () => {
  it('should be able to handle loadCourse.pending action', async () => {
    const store = configureStore({
      reducer: { player: playerReducer },
      preloadedState: {
        player: {
          ...playerSliceInitialState,
          isLoading: false, // true on first render, but can be false on subsequent
          course: {} as any, // test if it will be reset on the process
        },
      },
    })

    store.dispatch(loadCourse())

    const state = store.getState().player

    expect(state.isLoading).toBe(true)
    expect(state.course).toBeNull()
  })

  it('should be able to handle loadCourse.fulfilled action"', async () => {
    const store = configureStore({
      reducer: { player: playerReducer },
      preloadedState: {
        player: playerSliceInitialState,
      },
    })

    const action = {
      type: loadCourse.fulfilled.type,
      payload: mockCourseData,
    }

    store.dispatch(action)

    const state = store.getState().player

    expect(state.isLoading).toBe(false)
    expect(state.course).toEqual(mockCourseData)
  })

  it('should be able to handle loadCourse.rejected action', () => {
    const store = configureStore({
      reducer: { player: playerReducer },
      preloadedState: {
        player: { ...playerSliceInitialState, course: {} as any },
      },
    })

    const action = {
      type: loadCourse.rejected.type,
    }

    store.dispatch(action)

    const state = store.getState().player

    expect(state.isLoading).toBe(false)
    expect(state.course).toBeNull()
  })

  it('should be able to play a lesson', () => {
    const initialState = exampleState
    const state = playerReducer(
      initialState,
      play({ moduleIndex: 1, lessonIndex: 1 }),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should not be able to play a lesson if it doest exists', () => {
    const initialState = exampleState
    const state = playerReducer(
      initialState,
      play({ moduleIndex: 5, lessonIndex: 2 }),
    )

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('Should be able to play the next Lesson automacally', () => {
    const initialState = exampleState
    const state = playerReducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('Should be able to jump to the next Module automacally', () => {
    const initialState: typeof exampleState = {
      ...exampleState,
      currentModuleIndex: 0,
      currentLessonIndex: 1,
    }
    const state = playerReducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('Should not update the current module and lesson index if there is no next lesson available', () => {
    const initialState: typeof exampleState = {
      ...exampleState,
      currentModuleIndex: 1,
      currentLessonIndex: 1,
    }
    const state = playerReducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
