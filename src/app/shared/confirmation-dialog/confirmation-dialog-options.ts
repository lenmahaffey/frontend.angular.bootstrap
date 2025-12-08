export interface IConfirmationDialogOptions {
  title:string
  text: string
  noButtonText: string
  yesButtonText:string
}

export class ConfirmationDialogOptions implements IConfirmationDialogOptions
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
