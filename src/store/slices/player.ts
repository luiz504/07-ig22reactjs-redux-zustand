import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useStoreSelector } from '..'

type Lesson = {
  id: string
  title: string
  duration: string
}
type Module = {
  id: string
  title: string
  lessons: Lesson[]
}
type Course = {
  id: number
  modules: Module[]
}
export type PlayerState = {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, { payload }: PayloadAction<Course>) => {
      state.course = payload
    },
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
})

export const playerReducer = playerSlice.reducer

export const { start, play, next } = playerSlice.actions

export const usePlayerCurrents = () =>
  useStoreSelector((store) => {
    const { currentModuleIndex, currentLessonIndex, course } = store.player

    const currentModule = course?.modules[currentModuleIndex]

    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
