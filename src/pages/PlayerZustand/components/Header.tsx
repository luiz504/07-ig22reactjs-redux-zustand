import { usePlayerCurrents, useStore } from '~/storeZustand'

export const Header = () => {
  const { currentLesson, currentModule } = usePlayerCurrents()
  const isCourseLoading = useStore((store) => store.isLoading)

  if (isCourseLoading) {
    return (
      <div className="flex flex-col gap-1">
        <h1 className=" text-2xl font-bold w-10">Carregando...</h1>
        <span className="text-sm text-zinc-400 w-6">...</span>
      </div>
    )
  }

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
