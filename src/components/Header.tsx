import React from 'react'
import { useStoreSelector } from '../store'

// import { Container } from './styles';

export const Header: React.FC = () => {
  const { currentLesson, currentModule } = useStoreSelector((store) => {
    const { currentModuleIndex, currentLessonIndex, course } = store.player

    const currentModule = course.modules[currentModuleIndex]

    const currentLesson = currentModule.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
  return (
    <div className="flex flex-col gap-1">
      <h1 className=" text-2xl font-bold">{currentLesson.title}</h1>
      <span className="text-sm text-zinc-400">
        Module: &quot;{currentModule.title}&quot;
      </span>
    </div>
  )
}
