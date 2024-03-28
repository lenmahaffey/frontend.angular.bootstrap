import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Constants } from "../constants"
import { NotificationService } from "../services/notification/notification.service"
import { throwError } from "rxjs"
import { Message } from "../services/message"
import { MessageType } from "../services/message-type.interface"

export class ServiceBase {

  headers = Constants.headers
  constructor(private notesService: NotificationService) { }

  protected handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error.length > 0) {
      console.log(err.error)
      err.error.forEach((x: any) => {
        errorMessage = `An error occured: ${x.errorMessage}`
        const message = new Message()
        message.type = MessageType.Error
        message.title = "Error"
        message.text = errorMessage
        this.notesService.sendNotification(message)
      });
    }
    else {
        errorMessage = `Server returned code ${err.status}, error message is ${err.message}`
        const message = new Message()
        message.type = MessageType.Error
        message.title = "Error"
        message.text = errorMessage
        this.notesService.sendNotification(message)
    }
    return throwError(() => errorMessage)
  }
}
