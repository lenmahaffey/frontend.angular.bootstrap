import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';
import { ToolTipOptions } from 'src/app/shared/tooltip/tooltip-options';

@Component({
  selector: 'app-confirmation-demo',
  templateUrl: './confirmation-demo.component.html',
  styleUrl: './confirmation-demo.component.scss',
  standalone: false
})
export class ConfirmationDemoComponent {

  confirmationFormData: FormGroup
  confirmationResponseMessage: string | undefined
  private _confirmationResponse: boolean | undefined

  get confirmationResponse(): boolean | undefined {
    return this._confirmationResponse
  }
  set confirmationResponse(value: boolean | undefined) {
    this._confirmationResponse = value
    if(value == undefined)
    {
      this.confirmationResponseMessage = "You did not make a selection"
    }
    else if(value)
    {
      this.confirmationResponseMessage = "You clicked yes"
    }
    else
    {
      this.confirmationResponseMessage = this.confirmationResponseMessage = "You clicked no"
    }
  }
  constructor(private appStateService: AppStateService) {
    this.confirmationFormData = new FormGroup({
      title: new FormControl("Enter title text"),
      text: new FormControl("Enter message text"),
      okText: new FormControl("Ok"),
      cancelText: new FormControl("Cancel"),
    });
  }

  openConfirmationDialog()
  {
    const options = new ConfirmationDialogOptions()
    options.text = this.confirmationFormData.value.text
    options.title = this.confirmationFormData.value.title
    options.yesButtonText = this.confirmationFormData.value.okText
    options.noButtonText = this.confirmationFormData.value.cancelText
    let sub = this.appStateService.openConfirmationDialog(options).subscribe(
      {
        next: (data) =>
        {
          this.confirmationResponse = data
          console.log(this.confirmationResponseMessage)
          // this.appStateService.closeDialog()
          sub.unsubscribe()
        },
        error: () =>
        {
          let message = new Message()
          message.type = MessageType.Error
          message.text = "There was an error"
        },
        complete: () =>
        {
          sub.unsubscribe()
        }
      })
  }
  reset(){
    this.confirmationResponseMessage = undefined
  }
  onMouseOver(event: MouseEvent, text: string){
    const options = new ToolTipOptions(event, text)
    this.appStateService.toolTipText.next(options)
  }
}
