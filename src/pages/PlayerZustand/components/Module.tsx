import { FC } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

import { usePlayerCurrents, useStore } from '~/storeZustand'

import { Lesson } from '~/components/Lesson'

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
  const { play, module } = useStore((store) => ({
    play: store.play,
    module: store.course?.modules?.[moduleIndex],
  }))
  const { currentLesson } = usePlayerCurrents()

  const currentLessonId = currentLesson?.id

  const handlePlayLesson = (lessonIndex: number) => {
    play({ moduleIndex, lessonIndex })
  }

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
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
              isCurrent={lesson.id === currentLessonId}
            />
          ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
