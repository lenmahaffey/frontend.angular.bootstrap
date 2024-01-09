import { Component, Input, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhysicalAddress_DTO } from 'src/app/shared/api/api.models';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddAddressFormComponent implements OnInit, OnChanges {

  addressForm: any
  @Input() address: PhysicalAddress_DTO
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

  constructor(private service: ContactService)
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

  ngOnChanges(changes: SimpleChanges): void {
    this.setForm()
  }

  ngOnInit(): void {
    this.setForm()
  }

  setForm()
  {
    if(this.address != null)
    {
      this.addressForm.controls['line1'].setValue(this.address.line1)
      this.addressForm.controls['line2'].setValue(this.address.line2)
      this.addressForm.controls['city'].setValue(this.address.city)
      this.addressForm.controls['state'].setValue(this.address.state)
      this.addressForm.controls['zip'].setValue(this.address.postalCode)
    }
  }

  deleteAddress()
  {
    this.delete.next(this.address)
  }

  sendUpdate()
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
      this.addressChange.emit(addressUpdate)
    }
  }
}
