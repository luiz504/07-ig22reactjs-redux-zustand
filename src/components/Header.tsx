import { usePlayerCurrents } from '../store/slices/player'

export const Header = () => {
  const { currentLesson, currentModule } = usePlayerCurrents()

  if (!currentLesson || !currentModule) return null

  return (
    <div className="flex flex-col gap-1">
      <h1 className=" text-2xl font-bold">{currentLesson.title}</h1>
      <span className="text-sm text-zinc-400">
        Module: &quot;{currentModule.title}&quot;
      </span>
    </div>
  )
}
