import { Provider as ReduxProvider } from 'react-redux'

import { store } from './storeRedux'
import { PlayerRedux } from './pages/PlayerRedux'
import { PlayerZustand } from './pages/PlayerZustand'

export function App() {
  const mode: 'zustand' | 'redux' = 'zustand'

  // @ts-expect-error If you set the mod to 'zustand'
  if (mode === 'redux') {
    return (
      <ReduxProvider store={store}>
        <PlayerRedux />
      </ReduxProvider>
    )
  }
  return <PlayerZustand />
}
