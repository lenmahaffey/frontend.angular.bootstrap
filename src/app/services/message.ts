import { MessageType } from "./message-type.interface"

export interface Message{
  title: string
  text: string
  type: MessageType
  time: Date
  autoDismiss: boolean
  duration: number
  isDismissed: boolean
}

export class Message implements Message {

  constructor(type?: MessageType, message?: string, autoDismiss?: boolean) {
    this.type = type ?? MessageType.Success
    this.autoDismiss = autoDismiss ?? true
    this.time = new Date()
    this.text = message ?? "There was an error"
    this.duration = 3
    this.isDismissed = false
  }
}


