import { Component, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationDialogOptions } from './confirmation-dialog-options';
import { Subject, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    standalone: false
})
export class ConfirmationDialogComponent implements OnDestroy {

  sub:Subscription
  options: ConfirmationDialogOptions = new ConfirmationDialogOptions()
  @Output() response: Subject<boolean | null> = new Subject()

  constructor(private appStateService: AppStateService, public modal: NgbActiveModal)
  {
    this.sub = this.appStateService.confirmationOptions.subscribe(
      {
        next: (data) =>{
          this.options = data
        },
        error: (error)=>{

        },
        complete: () =>{

        }
      })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onKeyDown(event: any)
  {
    if (event.key === "Escape") {
      this.response.next(null)
      this.modal.close()
    }
  }
  yes(){
    this.response.next(true);
    this.response.complete();
    this.modal.close()
  }

  no(){
    this.response.next(false);
    this.response.complete();
    this.modal.close()
  }

  dismiss(){
    this.response.next(null);
    this.response.complete();
    this.modal.close()
  }
}
