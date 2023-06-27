import React, { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

import { Header } from './components/Header'
import { Video } from './components/Video'
import { Module } from './components/Module'
import { usePlayerCurrents, useStore } from '~/storeZustand'

export const PlayerZustand: React.FC = () => {
  const { loadCourse, modules } = useStore((store) => ({
    modules: store?.course?.modules,
    loadCourse: store.loadCourse,
  }))
  const { currentLesson } = usePlayerCurrents()

  useEffect(() => {
    if (currentLesson?.title) {
      document.title = `Watching: ${currentLesson?.title}`
    }
  }, [currentLesson?.title])

  useEffect(() => {
    loadCourse()
  }, [loadCourse])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600 hover:transition">
            <MessageCircle className="w-4 h-4" />
            Give a Feedback
          </button>
        </div>

        <main className="relative pr-80 flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 absolute inset-y-0 right-0 border-l border-zinc-800 bg-zinc-900 divide-y-2 divide-zinc-900 overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules?.map((item, index) => (
              <Module
                key={item.id}
                moduleIndex={index}
                title={item.title}
                amountOfLessons={item.lessons.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  )
}
