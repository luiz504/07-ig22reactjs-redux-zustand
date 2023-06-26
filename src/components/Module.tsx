import { FC } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

import { Lesson } from './Lesson'

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
  return (
    <Collapsible.Root className="group">
      <Collapsible.Trigger asChild>
        <button className="flex w-full items-center gap-3 bg-zinc-800 p-4 hover:bg-zinc-700 transition">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-950 text-xs">
            {moduleIndex}
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
          <Lesson title="Redux Fundamentals" duration="09:13" />
          <Lesson title="Redux Fundamentals" duration="09:13" />
          <Lesson title="Redux Fundamentals" duration="09:13" />
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
