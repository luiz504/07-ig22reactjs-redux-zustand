export type Course = {
  id: number
  modules: Array<{
    id: string
    title: string
    lessons: Array<{ id: string; title: string; duration: string }>
  }>
}
