export interface SpinnerOptions{
  message: string
  disableClose: boolean
}

export class SpinnerOptions implements SpinnerOptions
{
  constructor(message: string = "Spinning the spinner", disableClose: boolean = false)
  {
    this.message = message
    this.disableClose = disableClose
  }
}
