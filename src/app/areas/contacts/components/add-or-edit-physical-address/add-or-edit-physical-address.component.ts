import { Component, Input, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressType_DTO, Contact_DTO, PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';
import { AppStateService } from 'src/app/services/app-state/app-state-service';
import { take } from 'rxjs';
import { Message } from 'src/app/services/message';
import { MessageType } from 'src/app/services/message-type.interface';
import { ContactNamePipe } from 'src/app/shared/pipes/contact-name.pipe';
import { ConfirmationDialogOptions } from 'src/app/shared/confirmation-dialog/confirmation-dialog-options';

@Component({
  selector: 'app-address-form',
  templateUrl: './add-or-edit-physical-address.component.html',
  styleUrls: ['./add-or-edit-physical-address.component.scss']
})
export class AddOrEditPhysicalAddressComponent implements OnChanges {

  addressForm: any
  @Input() contact: Contact_DTO = new Contact_DTO()
  @Input() address: PhysicalAddress_DTO = new PhysicalAddress_DTO()
  @Output() addressChange = new EventEmitter<PhysicalAddress_DTO>()
  @Output() delete = new EventEmitter<PhysicalAddress_DTO>()

  get line1()
  {
    return this.addressForm.get('line1')
  }
  get line2()
  {
    return this.addressForm.get('line2')
  }
  get city()
  {
    return this.addressForm.get('city')
  }
  get state()
  {
    return this.addressForm.get('state')
  }
  get zip()
  {
    return this.addressForm.get('zip')
  }

  constructor(
    private service: ContactService,
    private appState: AppStateService,
    private namePipe: ContactNamePipe,)
  {
    this.address = new PhysicalAddress_DTO()
    this.addressForm = new FormGroup({
      line1: new FormControl('',[
        Validators.required,
        Validators.maxLength(75),
      ]),
      line2: new FormControl('',[
        Validators.maxLength(75),
      ]),
      city: new FormControl('',[
        Validators.required,
        Validators.maxLength(50),
      ]),
      state: new FormControl('',[
        Validators.required,
        Validators.maxLength(50),
      ]),
      zip: new FormControl('',[
        Validators.required,
        Validators.maxLength(10),
      ]),
    })
  }

  ngOnChanges(): void {
    this.setForm()
  }

  setForm()
  {
      this.addressForm.reset()
      this.addressForm.controls['line1'].setValue(this.address.line1)
      this.addressForm.controls['line2'].setValue(this.address.line2)
      this.addressForm.controls['city'].setValue(this.address.city)
      this.addressForm.controls['state'].setValue(this.address.state)
      this.addressForm.controls['zip'].setValue(this.address.postalCode)
  }

  setAddressFromInput(): PhysicalAddress_DTO
  {
    if(this.addressForm.valid && this.addressForm.dirty)
    {
      let addressUpdate = JSON.parse(JSON.stringify(this.address))
      addressUpdate.line1 = this.addressForm.value.line1
      addressUpdate.line2 = this.addressForm.value.line2
      addressUpdate.city = this.addressForm.value.city
      addressUpdate.state = this.addressForm.value.state
      addressUpdate.postalCode = this.addressForm.value.zip
      addressUpdate.addressType = this.address.addressType
      return addressUpdate
    }
    throw Error("Check the form")
  }

  addOrUpdatePhysicalAddress()
  {
    if(this.address.id > 0)
    {
      this.updatePhysicalAddress()
    }
    else
    {
      this.addPhysicalAddress()
    }
  }

  addPhysicalAddress()
  {
    const address = this.setAddressFromInput()
    this.appState.openSpinner(`Adding new ${AddressType_DTO[address.addressType].toLowerCase()} address`)
    address.id = 0
    address.contactInformationId = this.contact.contactInformationId!
    this.service.AddPhysicalAddress(address).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          this.address = data
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(this.contact)}'s ${AddressType_DTO[address.addressType].toLowerCase()} address has been added.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message()
          message.text = `There was an error and the ${AddressType_DTO[address.addressType].toLowerCase()} could not be added`
          this.appState.sendAlert(message)
        }
      })
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  updatePhysicalAddress()
  {
    const address = this.setAddressFromInput()
    this.appState.openSpinner(`Updating ${AddressType_DTO[address.addressType].toLowerCase()} address`)
    this.service.UpdatePhysicalAddress(address).pipe(take(1)).subscribe(
      {
        next: (data) =>
        {
          this.address = data
          this.setForm()
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(this.contact)}'s ${AddressType_DTO[address.addressType].toLowerCase()} address has been updated.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message()
          message.text = `There was an error and the ${AddressType_DTO[address.addressType].toLowerCase()} could not be updated`
          this.appState.sendAlert(message)
        }
      }
    )
    .add(() =>
    {
      this.appState.closeSpinner()
    })
  }

  openDeleteAddressModal()
  {
    var options = new ConfirmationDialogOptions()
    options.title = "Delete Address?"
    options.text = `Are you sure you want to delete ${this.namePipe.transform(this.contact)}'s ${AddressType_DTO[this.address.addressType].toLowerCase()} address?`

    this.appState.openConfirmationDialog(options).pipe(take(1)).subscribe(
      {
        next: (response) =>
        {
          if (response) this.deletePhysicalAddress()
        },
        error: () =>
        {
          let message = new Message()
          message.text = `There was an error with the dialog.`
          this.appState.sendAlert(message)
        }
      })
  }
  deletePhysicalAddress()
  {
    this.appState.openSpinner(`Deleting ${AddressType_DTO[this.address.addressType].toLowerCase()} address`)
    this.service.DeletePhysicalAddress(this.address).pipe(take(1)).subscribe(
      {
        next: () =>
        {
          this.addressForm.reset()
          const temp = this.address.addressType
          this.address = new PhysicalAddress_DTO()
          this.address.addressType = temp
          this.setForm()
          const message = new Message(MessageType.Success)
          message.text = `${this.namePipe.transform(this.contact)}'s ${AddressType_DTO[this.address.addressType].toLowerCase()} address has been deleted.`
          this.appState.sendAlert(message)
        },
        error: () =>
        {
          const message = new Message()
          message.text = `There was an error and the ${AddressType_DTO[this.address.addressType].toLowerCase()} could not be deleted`
          this.appState.sendAlert(message)
        }
      })
      .add(() =>
      {
        this.appState.closeSpinner()
      })
  }
}
