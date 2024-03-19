export interface ConfirmationDialogOptions {
  title:string
  text: string
  noButtonText: string
  yesButtonText:string
}

export class ConfirmationDialogOptions implements ConfirmationDialogOptions
{
  title: string = "Confirm"
  text: string = "Are you sure?"
  noButtonText: string = "Cancel"
  yesButtonText: string = "Ok";
  constructor(title: string = "", text: string = "") {
    title = title,
    text = text
  }
}
