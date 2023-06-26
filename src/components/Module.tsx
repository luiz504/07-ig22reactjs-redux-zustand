import { FC } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

import { Lesson } from './Lesson'

import { useStoreSelector } from '../store'
import { useDispatch } from 'react-redux'
import { play } from '../store/slices/player'

interface ModulePros {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export const Module: FC<ModulePros> = ({
  moduleIndex,
  title,
  amountOfLessons,
}) => {
  const dispatch = useDispatch()
  const module = useStoreSelector(
    (store) => store.player.course.modules[moduleIndex],
  )

  const handlePlayLesson = (lessonIndex: number) => {
    dispatch(play({ moduleIndex, lessonIndex }))
  }

  return (
    <Collapsible.Root className="group">
      <Collapsible.Trigger asChild>
        <button className="flex w-full p-4 items-center gap-3  bg-zinc-800  border border-zinc-800 hover:bg-zinc-700         hover:border-zinc-700 transition  focus:outline-none focus:border-zinc-100">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-950 text-xs">
            {moduleIndex + 1}
          </div>
          <div className="flex flex-col gap-1 text-left">
            <strong className="text-sm">{title}</strong>
            <span className="text-xs text-zinc-400">
              {amountOfLessons === 1
                ? `${amountOfLessons} lesson`
                : `${amountOfLessons} lessons`}
            </span>
          </div>

          <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition" />
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content asChild>
        <nav className="relative flex flex-col gap-4 p-6">
          {module?.lessons?.map((lesson, index) => (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              duration={lesson.duration}
              onPlay={() => handlePlayLesson(index)}
            />
          ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
