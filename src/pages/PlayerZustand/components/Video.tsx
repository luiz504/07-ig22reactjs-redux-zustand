import ReactPlayer from 'react-player'

import { Loader } from 'lucide-react'

import { usePlayerCurrents, useStore } from '~/storeZustand'

export const Video = () => {
  const { isLoading, next } = useStore((store) => ({
    next: store.next,
    isLoading: store.isLoading,
  }))

  const { currentLesson } = usePlayerCurrents()

  const currentLessonId = currentLesson?.id

  const videoURL = currentLessonId
    ? `https://www.youtube.com/watch?v=${currentLessonId}`
    : ''

  const handlePlayNext = () => {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-8 h-8 text-zinc-400 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          {currentLesson && (
            <ReactPlayer
              width={'100%'}
              height={'100%'}
              controls
              url={videoURL}
              onEnded={handlePlayNext}
            />
          )}
        </>
      )}
    </div>
  )
}
