import { Component } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { InventoryService } from '../../inventory.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { InventorySideBarNavLinks } from '../../inventory-side-bar-links';

@Component({
    selector: 'app-inventory-import',
    templateUrl: './inventory-import.component.html',
    styleUrls: ['./inventory-import.component.scss'],
    standalone: false
})
export class InventoryImportComponent {

  links: InventorySideBarNavLinks = new InventorySideBarNavLinks()
  constructor(private appStateService: AppStateService,
              private alertService:AlertService,
              private api: InventoryService)
  {
    this.appStateService.setLeftSideMenuItems(this.links)
  }
  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.ImportInventoryItems(fileInputEvent.target.files[0])
  }

  ImportInventoryItems(file: File)
  {
    this.appStateService.openSpinner("Uploading File");
    this.api.ImportInventoryItems(file).subscribe(
      {
        next: (event) =>
        {

        },
        error: (error) =>
        {

        },
        complete: () =>
        {
          let message = new Message()
          message.text = `The file was successfully uploaded`
          message.type = MessageType.Success
          message.autoDismiss = true
          this.appStateService.closeSpinner()
          this.alertService.sendAlert(message)
          this.appStateService.closeSpinner()
        }
      })
  }
}
