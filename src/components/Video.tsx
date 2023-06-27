import ReactPlayer from 'react-player'

import { next, usePlayerCurrents } from '../store/slices/player'
import { useStoreDispatch, useStoreSelector } from '../store'
import { Loader } from 'lucide-react'

export const Video = () => {
  const dispatch = useStoreDispatch()
  const { currentLesson } = usePlayerCurrents()
  const isCourseLoading = useStoreSelector((store) => store.player.isLoading)

  const currentLessonId = currentLesson?.id

  const videoURL = currentLessonId
    ? `https://www.youtube.com/watch?v=${currentLessonId}`
    : ''

  const handlePlayNext = () => {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading && (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-8 h-8 text-zinc-400 animate-spin" />
        </div>
      )}

      {!isCourseLoading && (
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
