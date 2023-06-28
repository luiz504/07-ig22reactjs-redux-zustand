import { beforeEach, describe, expect, it } from 'vitest'
import { useStore as store, initialState } from '.'

import MockAdapter from 'axios-mock-adapter'
import { api } from '~/lib/axios'

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

describe('Zustand Player Store', () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('should set isLoading to true while loading', async () => {
    store.setState({ isLoading: false }) // true on first render, but can be false on subsequent
    const apiMock = new MockAdapter(api, { delayResponse: 500 })
    apiMock.onGet('/courses/1').reply(200, mockCourseData)

    const loadCourse = store.getState().loadCourse

    loadCourse()

    // Introduce a delay to allow the Promise to settle
    await new Promise((resolve) => setTimeout(resolve, 100))

    const isLoading = store.getState().isLoading

    expect(isLoading).toBe(true)
  })

  it('should set course data and isLoading to false after successful loading', async () => {
    const apiMock = new MockAdapter(api)

    apiMock.onGet('/courses/1').reply(200, mockCourseData)
    const loadCourse = store.getState().loadCourse

    await loadCourse()

    const { course, isLoading } = store.getState()

    expect(course).toStrictEqual(mockCourseData)
    expect(isLoading).toBe(false)
  })

  it('should set course to null and isLoading to false when an error occurs', async () => {
    const apiMock = new MockAdapter(api)

    apiMock.onGet('/courses/1').networkError()

    const loadCourse = store.getState().loadCourse

    await loadCourse()

    const { course, isLoading } = store.getState()

    expect(course).toBeNull()
    expect(isLoading).toBe(false)
  })

  it('should be able to play a lesson', () => {
    store.setState({ course: mockCourseData })
    const { play } = store.getState()

    play({ moduleIndex: 1, lessonIndex: 1 })

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(1)
  })

  it('should not be able to play a lesson if it doest exists', () => {
    const { play } = store.getState()

    play({ moduleIndex: 1, lessonIndex: 1 })

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(0)
  })

  it('Should be able to play the next Lesson automacally', () => {
    store.setState({ course: mockCourseData })

    const next = store.getState().next

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  it('Should be able to jump to the next Module automacally', () => {
    store.setState({ course: mockCourseData, currentLessonIndex: 1 })
    const next = store.getState().next

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(0)
  })

  it('Should not update the current module and lesson index if there is no next lesson available', () => {
    store.setState({
      course: mockCourseData,
      currentModuleIndex: 1,
      currentLessonIndex: 1,
    })
    const next = store.getState().next

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(1)
  })
})
