import { Component, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';
import { Modal } from 'bootstrap';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: false
})
export class SpinnerComponent implements OnDestroy {

  options: SpinnerOptions = new SpinnerOptions()
  sub: Subscription
  constructor(private elementRef: ElementRef, private appStateService: AppStateService) {
    this.sub = appStateService.spinnerOptions.subscribe(data =>
      {
        console.log("Data:", data ===null)
        console.log("Received at spinner:", data)
        if(data === null){
          this.closeDialog()
        } else {
          this.options = data
          this.openDialog()
        }
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  openDialog(): void{
    console.log("Opening Modal")
    let temp = new Modal(this.elementRef.nativeElement.children[0])
    temp.show()
  }

  closeDialog(): void {
    let temp = new Modal(this.elementRef.nativeElement.children[0])
    temp.hide()

  }
}
