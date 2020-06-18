import { Stats } from "fs";

export const StatusDefault = {
  NEW: 'NEW',
  READY: 'READY',
  FAILIED: 'FAILED'
} as const

type Status = keyof typeof StatusDefault

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
}

interface Pagination {
  page: number
  perPage: number
  total: number
  totalPage: number 
}

export interface InitialState {
  users: Array<User>
  pagination: Pagination
  status: typeof StatusDefault[Status]
}