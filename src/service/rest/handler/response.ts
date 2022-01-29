import express from "express"

export interface Response extends express.Response{
  status(code: number): this
  send(data?: any): this
  json(data?: any): this
  locals: LocalsContext
}

export interface LocalsContext {
  userId: string,
  deviceId: string,
  sourceType: UserTypes
  id: string,
  token: string
  isUserSuperAdmin: boolean
}

export type UserTypes = 'User' | 'Admin' | 'Device'