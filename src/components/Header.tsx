import React from 'react'

// import { Container } from './styles';

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className=" text-2xl font-bold">Redux Fundamentals</h1>
      <span className="text-sm text-zinc-400">Module: Abangente Modu</span>
    </div>
  )
}
