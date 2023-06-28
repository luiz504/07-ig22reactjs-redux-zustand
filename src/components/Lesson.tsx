import { FC } from 'react'
import { PlayCircle, Video } from 'lucide-react'

interface LessonProps {
  title: string
  duration: string
  onPlay: () => void
  isCurrent: boolean
}

export const Lesson: FC<LessonProps> = ({
  title,
  duration,
  onPlay,
  isCurrent = false,
}) => {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100 hover:transition"
    >
      {isCurrent ? (
        <PlayCircle className="w-4 h-4 text-emerald-400" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}
      <span>{title}</span>
      <span className="ml-auto font-mono text-sm text-zinc-500">
        {duration}
      </span>
    </button>
  )
}
