/**
 * イベントの送信およびブロードキャスト時に使用される型定義
 */
export type ServerToClientEvents = {
  receiverAccessPermission: (message: object) => void
  typingEvent: (message: object) => void
  groupMessage: (message: object) => void
  postEvent: (message: object) => void
  notification: (message: object) => void
  userActivity: (message: object) => void
  userStatus: (receiverId: string, status: 'online' | 'offline') => void
  Error: (message: object) => void
}

/**
 * イベント受信時に使用する型定義
 */
export type ClientToServerEvents = {
  sendNotification: (message: object) => void
}

export type InterServerEvents = {
  ping: () => void
}

export type SocketData = {
  userId: string
  role: string
  message: string
  isTyping: boolean
  receiver: string
  sender: string
  talkRoomId: string
  userId: string
  type: string
  message: string
  readBy: false
  sessionId: string
  status: string
  messageId: string
}

export type ErrorWebSocket = {
  message: string
  subStatusCode: number
}

export type AwsPathList = {
  Key: string
}

export type inputSignedUrl = {
  userId: string
  fileName: string
  contentType: string
  maxFileSize: number
}


export type FileData = {
  files: [
    {
      groupId: string
      fileName: string
      filePath: string
      fileSize: number
    },
  ]
}
