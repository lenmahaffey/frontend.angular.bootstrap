import { Component, Input } from '@angular/core';
import { Contact_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent {
  @Input() contact: Contact_DTO | undefined = undefined
}
