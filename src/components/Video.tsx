import React from 'react'
import ReactPlayer from 'react-player'
import { useStoreSelector } from '../store'

export const Video: React.FC = () => {
  const videoURL = useStoreSelector((store) => {
    const { currentModuleIndex, currentLessonIndex, course } = store.player
    const currentLessonId =
      course.modules[currentModuleIndex].lessons[currentLessonIndex].id

    const videoURL = currentLessonId
      ? `https://www.youtube.com/watch?v=${currentLessonId}`
      : ''

    return videoURL
  })

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer width={'100%'} height={'100%'} controls url={videoURL} />
    </div>
  )
}
