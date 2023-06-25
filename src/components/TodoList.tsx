import React from 'react'
import { useStoreSelector } from '../store'

export const TodoList: React.FC = () => {
  const todos = useStoreSelector((store) => {
    return store.todo
  })

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  )
}
