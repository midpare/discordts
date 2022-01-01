export interface IntervalType{
  execute: () => Promise<void>
  interval: string
  immediate: boolean
}