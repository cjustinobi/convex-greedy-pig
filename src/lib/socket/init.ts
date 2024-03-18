import io, { Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initSocket = async () => {
  if (!socket) {
    await fetch('/api/socket')
    socket = io()
  }
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized')
  }
  return socket
}
