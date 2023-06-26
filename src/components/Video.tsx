import React from 'react'
import ReactPlayer from 'react-player'

export const Video: React.FC = () => {
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width={'100%'}
        height={'100%'}
        controls
        url="https://www.youtube.com/watch?v=wDjeBNv6ip0"
      />
    </div>
  )
}
