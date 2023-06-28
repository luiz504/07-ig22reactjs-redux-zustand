import ReactPlayer from 'react-player'

import { Loader } from 'lucide-react'
import { useStoreDispatch, useStoreSelector } from '~/storeRedux'
import { next, playerCurrentsSelector } from '~/storeRedux/slices/player'

export const Video = () => {
  const dispatch = useStoreDispatch()
  const { currentLesson } = useStoreSelector(playerCurrentsSelector)
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
