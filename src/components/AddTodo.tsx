import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../store'

// import { Container } from './styles';

export const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (newTodo) {
      dispatch(add({ newTodo }))
    }
    setNewTodo('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="New To-do"
        value={newTodo}
        onChange={({ target }) => setNewTodo(target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
