import ReactPlayer from 'react-player'

import { next, usePlayerCurrents } from '../store/slices/player'
import { useStoreDispatch } from '../store'

export const Video = () => {
  const dispatch = useStoreDispatch()
  const { currentLesson } = usePlayerCurrents()
  if (!currentLesson) return null

  const currentLessonId = currentLesson?.id

  const videoURL = currentLessonId
    ? `https://www.youtube.com/watch?v=${currentLessonId}`
    : ''

  const handlePlayNext = () => {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width={'100%'}
        height={'100%'}
        controls
        url={videoURL}
        onEnded={handlePlayNext}
      />
    </div>
  )
}
