export interface Book {
  authors: string[]
  cacheId?: string
  id: string
  name: string
  date?: string
}

export interface BookInput {
  name: Book['name']
  authors: Book['authors']
}

export type Maybe<T> = T | void


export interface UserInput {
  email: string
  lastname: string
  firstname: string
  validate: boolean
}
