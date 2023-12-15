import { MessageType } from "./message-type.interface"

export class Message {
  title: string
  text: string
  type: MessageType
  time: Date
  autoDismiss: boolean
  duration: number

  constructor(type?: MessageType, message: string = "") {
    this.type = type ?? MessageType.Error
    this.autoDismiss = false
    this.time = new Date()
    this.title = ""
    this.text = message
    this.duration = 3
  }
}


