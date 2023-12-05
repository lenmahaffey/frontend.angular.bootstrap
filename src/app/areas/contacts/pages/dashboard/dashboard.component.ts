import { Component, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Output() data: Contact_DTO[] = []
  @Input() contact:Contact_DTO | undefined = undefined

  constructor(private service: ContactService, private _dialog: MatDialog, private appStateService: AppStateService)
  {
  }

  onContactSelected(contact: Contact_DTO)
  {
    this.contact = contact
  }
  drop(event:any)
  {
    console.log(event)
  }
}
