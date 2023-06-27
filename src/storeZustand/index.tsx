import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { api } from '~/lib/axios'
import { Course } from '~/types/Course'

type PlayerState = {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
}

type PlayerActions = {
  loadCourse: () => Promise<void>
  play: (params: { moduleIndex: number; lessonIndex: number }) => void
  next: () => void
}

export const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
}

export const useStore = create<PlayerState & PlayerActions>()(
  devtools(
    (set, get) => {
      return {
        ...initialState,
        loadCourse: async () => {
          try {
            set(initialState)

            const response = await api.get('/courses/1')

            set({ course: response.data, isLoading: false })
          } catch (err) {
            set({ course: null, isLoading: false })
          }
        },
        play: ({ lessonIndex, moduleIndex }) => {
          const course = get().course
          const lesson = course?.modules?.[moduleIndex]?.lessons[lessonIndex]

          if (lesson) {
            set({
              currentModuleIndex: moduleIndex,
              currentLessonIndex: lessonIndex,
            })
          }
        },
        next: () => {
          const { currentLessonIndex, currentModuleIndex, course } = get()

          if (!course) return

          const nextLessonIndex = currentLessonIndex + 1
          const nextLesson =
            course.modules?.[currentModuleIndex]?.lessons?.[nextLessonIndex]

          if (nextLesson) {
            set({
              currentLessonIndex: nextLessonIndex,
            })
          } else {
            const nextModuleIndex = currentModuleIndex + 1

            const nextModule = course.modules?.[nextModuleIndex]

            if (nextModule) {
              set({
                currentModuleIndex: nextModuleIndex,
                currentLessonIndex: 0,
              })
            }
          }
        },
      }
    },
    { name: 'playue' },
  ),
)

export const usePlayerCurrents = () => {
  return useStore((store) => {
    const { currentModuleIndex, currentLessonIndex, course } = store

    const currentModule = course?.modules[currentModuleIndex]

    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}
