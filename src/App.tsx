import { Provider as ReduxProvider } from 'react-redux'

import { store } from './storeRedux'
import { PlayerRedux } from './pages/PlayerRedux'

export function App() {
  const mode: 'zustand' | 'redux' = 'redux'

  if (mode === 'redux') {
    return (
      <ReduxProvider store={store}>
        <PlayerRedux />
      </ReduxProvider>
    )
  }
  return null
}
