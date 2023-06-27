import { expect, describe, it } from 'vitest'
import { PlayerState, next, play, playerReducer } from './player'

const exampleState: PlayerState = {
  course: {
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
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const initialState = exampleState
    const state = playerReducer(
      initialState,
      play({ moduleIndex: 1, lessonIndex: 1 }),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should able to update the current module and lesson index if there no valid lesson with the indexs informed', () => {
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
