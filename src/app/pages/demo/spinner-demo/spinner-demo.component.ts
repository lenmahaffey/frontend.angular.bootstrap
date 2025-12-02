import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Constants } from 'src/app/constants';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { MessageType } from 'src/app/services/message-type.interface';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';

@Component({
  selector: 'app-spinner-demo',
  templateUrl: './spinner-demo.component.html',
  styleUrl: './spinner-demo.component.scss',
  standalone: false
})
export class SpinnerDemoComponent {
  spinnerFormData: FormGroup

  constructor(private appStateService: AppStateService) {
    this.spinnerFormData = new FormGroup({
      message: new FormControl("Spinning the spinner"),
      disableClose: new FormControl(false),
      displayTime: new FormControl({value: 3, disabled: true}),
      countdownTime: new FormControl({value: 3, disabled: true})
    });

    this.spinnerFormData.get('disableClose')?.valueChanges.subscribe(value =>
    {
      if(value){
        this.spinnerFormData.get('displayTime')?.enable()
        this.spinnerFormData.get('countdownTime')?.enable()
      } else {
        this.spinnerFormData.get('displayTime')?.disable()
        this.spinnerFormData.get('countdownTime')?.disable()
      }
    })
  }

  async startSpinner(){
    let message = this.spinnerFormData.value.message
    let disableClose = this.spinnerFormData.value.disableClose
    let displayTime = this.spinnerFormData.value.displayTime
    let countdownTime = this.spinnerFormData.value.countdownTime

    let options = new SpinnerOptions(message, disableClose)
    this.openSpinner(options)


    if(disableClose){
      await Constants.wait(displayTime)
      for(let i = 0; i <= countdownTime; i++){
        if(i === countdownTime){
          this.closeSpinner()
        } else {
          options.message = `Closing in ${countdownTime - i} seconds`
          this.appStateService.spinnerOptions.next(options)
          await Constants.wait(1)
        }
      }
    } else {

    }
  }

  openSpinner(options: SpinnerOptions){
    this.appStateService.openSpinner(options)
  }

  closeSpinner(){
    this.appStateService.closeSpinner()
  }
}
