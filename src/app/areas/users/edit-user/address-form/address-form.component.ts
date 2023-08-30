import { Component, Input, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PhysicalAddress } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements AfterViewInit, OnChanges {

  @Input() address: PhysicalAddress = new PhysicalAddress()
  @Output() addressUpdate = new EventEmitter<PhysicalAddress>()

  addressForm: FormGroup = new FormGroup({
    line1: new FormControl(''),
    line2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  })

  ngOnChanges(changes: SimpleChanges): void {
    this.setForm()
  }

  ngAfterViewInit(): void {
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

  sendUpdate()
  {
    let addressUpdate = new PhysicalAddress()
    addressUpdate.line1 = this.addressForm.value.line1
    addressUpdate.line2 = this.addressForm.value.line2
    addressUpdate.city = this.addressForm.value.city
    addressUpdate.state = this.addressForm.value.state
    addressUpdate.postalCode = this.addressForm.value.zip
    this.addressUpdate.emit(addressUpdate)
  }
}
