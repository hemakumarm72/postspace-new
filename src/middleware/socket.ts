// import http from 'http'
// import { Server } from 'socket.io'

// import {
//   ClientToServerEvents,
//   InterServerEvents,
//   ServerToClientEvents,
//   SocketData,
// } from '../@types'

// export let io: Server
// export const SocketInitialize = (server: http.Server) => {
//   io = new Server<
//     ClientToServerEvents,
//     ServerToClientEvents,
//     InterServerEvents,
//     SocketData
//   >(server, {
//     cors: {
//       origin: '*',
//     },
//   })
//   // initSocket()
// }
// // export const initSocket = () => {
// //   console.log('🚀 Web socket connection')
// //   io.of('/api/user/socket').on('connection', userSocketAuth)
// // }

// // export const sendMessages = (talkRoomId: string, message: SocketData) => {
// //   return io.of('/api/user/socket').to(talkRoomId).emit('groupMessage', message)
// // }

// // export const typingMessage = (talkRoomId: string, message: SocketData) => {
// //   return io.of('/api/user/socket').to(talkRoomId).emit('typingEvent', message)
// // }
