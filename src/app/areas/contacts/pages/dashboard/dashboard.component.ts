import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() id: undefined | number
  selectedContactId = 100

  constructor(private router: Router)
  {
  }
  ngOnInit(): void {
    if(this.id == undefined)
    {
      this.router.navigate([`contacts/dashboard/${this.selectedContactId}`])
    }
    else
    {
      this.selectedContactId = this.id
    }
  }

  onContactSelected(contactId: number)
  {
    this.router.navigate([`contacts/dashboard/${contactId}`])
    this.selectedContactId = contactId
  }
}
