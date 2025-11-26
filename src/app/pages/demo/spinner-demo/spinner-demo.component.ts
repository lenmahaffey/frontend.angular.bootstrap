import { Component } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';

@Component({
  selector: 'app-spinner-demo',
  templateUrl: './spinner-demo.component.html',
  styleUrl: './spinner-demo.component.scss',
  standalone: false
})
export class SpinnerDemoComponent {
  message: string = "Spinning the spinner"
  disableClose: boolean = false

  constructor(private appStateService: AppStateService) {

  }
  openSpinner(){
    let options = new SpinnerOptions(this.message, this.disableClose)
    this.appStateService.openSpinner(options)
  }
}
