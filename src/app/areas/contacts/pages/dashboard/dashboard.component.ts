import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { Contact_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() id = undefined
  selectedContactId = 100

  constructor(private router: Router)
  {
  }
  ngOnInit(): void {
    if(this.id != undefined)
    {
      this.selectedContactId = this.id
    }
  }

  onContactSelected(contactId: number)
  {
    console.log(contactId)
    this.selectedContactId = contactId
    this.router.navigate([`contacts/dashboard/${contactId}`])
  }
}
