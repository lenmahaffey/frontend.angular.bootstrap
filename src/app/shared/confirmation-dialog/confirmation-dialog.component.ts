import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogOptions } from './confirmation-dialog-options';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  options: ConfirmationDialogOptions = new ConfirmationDialogOptions()
  @Output() response: Subject<boolean | null> = new Subject()

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {options: ConfirmationDialogOptions})
  {
    this.options = data.options
  }

  ngOnInit(): void {
    const bodyRect = document.body.getBoundingClientRect();
    const config: MatDialogConfig = new MatDialogConfig();
    config.minWidth = 400
    config.position =
    {
      right: ((bodyRect.width / 2) - ( config.minWidth / 2) ).toString() + "px",
      top: '7%' }

    this.dialogRef.updatePosition(config.position)
    this.dialogRef.updateSize(`${config.minWidth.toString()}px`)
    this.dialogRef.disableClose = true;
  }

  onKeyDown(event: any)
  {
    if (event.key === "Escape") {
      this.response.next(null)
      this.dialogRef.close()
    }
  }
  yes(){
    this.response.next(true);
    this.dialogRef.close()
    this.response.complete();
  }

  no(){
    this.response.next(false);
    this.dialogRef.close()
    this.response.complete();
  }

  dismiss(){
    this.response.next(null);
    this.dialogRef.close()
    this.response.complete();
  }
}
