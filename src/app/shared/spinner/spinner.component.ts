import { Component, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: false
})
export class SpinnerComponent implements OnDestroy {

  currentModal?: any
  options: SpinnerOptions = new SpinnerOptions()
  sub: Subscription
  constructor(private elementRef: ElementRef, private appStateService: AppStateService, private modalService: NgbModal) {
    this.sub = appStateService.spinnerOptions.subscribe(data =>
      {
        if(data){
          this.options = data
        }
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  // openDialog(): void{
  //   console.log("Opening Modal")
  //   // this.currentModal = this.modalService.open(SpinnerComponent)
  //   this.currentModal = new bootstrap.Modal(this.elementRef.nativeElement)
  //   this.currentModal
  //   console.log(this.elementRef)
  //   console.log(this.currentModal)
  //   this.currentModal.show()
  // }

  // closeDialog(): void {
  //   this.currentModal?.close()
  // }
}
