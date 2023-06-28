import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import { RootStore } from '..'
import { api } from '../../lib/axios'
import { Course } from '~/types/Course'

export type PlayerState = {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
}

export const loadCourse = createAsyncThunk('player/load', async () => {
  const response = await api.get('/courses/1')
  return response.data
})

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (
      state,
      { payload }: PayloadAction<{ moduleIndex: number; lessonIndex: number }>,
    ) => {
      const { moduleIndex, lessonIndex } = payload

      const lesson = state.course?.modules?.[moduleIndex]?.lessons[lessonIndex]

      if (lesson) {
        state.currentModuleIndex = moduleIndex
        state.currentLessonIndex = lessonIndex
      }
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1

        const nextModule = state.course?.modules[nextModuleIndex]

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      Object.assign(state, initialState)
    })
    builder.addCase(
      loadCourse.fulfilled,
      (state, { payload }: PayloadAction<Course>) => {
        state.course = payload
        state.isLoading = false
      },
    )
    builder.addCase(loadCourse.rejected, (state) => {
      state.isLoading = false
      state.course = null
    })
  },
})

export const playerReducer = playerSlice.reducer

export const { play, next } = playerSlice.actions

const getPlayerState = (state: RootStore) => state.player

export const playerCurrentsSelector = createSelector(
  [getPlayerState],
  (state) => {
    const { currentModuleIndex, currentLessonIndex, course } = state

    const currentModule = course?.modules[currentModuleIndex]

    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  },
)
