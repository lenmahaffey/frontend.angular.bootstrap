import { Component, Input, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhysicalAddress_DTO } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements AfterViewInit, OnChanges {

  @Input() address: PhysicalAddress_DTO | undefined
  @Input() title: string = ""
  @Output() addressUpdate = new EventEmitter<PhysicalAddress_DTO>()

  isVisible = "hide"
  addressForm: FormGroup = new FormGroup({
    line1: new FormControl('',[
      Validators.required
    ]),
    line2: new FormControl(''),
    city: new FormControl('',[
      Validators.required
    ]),
    state: new FormControl('',[
      Validators.required
    ]),
    zip: new FormControl('',[
      Validators.required
    ])
  })

  constructor(private cdr: ChangeDetectorRef)
  {
    this.addressForm.disable()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.address != undefined)
    {
      this.isVisible = "show"
      this.addressForm.enable()
      this.cdr.detectChanges()
    }
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
    console.log(this.addressForm)
    if(this.addressForm.valid && this.addressForm.dirty)
    {
      let addressUpdate = new PhysicalAddress_DTO()
      addressUpdate.line1 = this.addressForm.value.line1
      addressUpdate.line2 = this.addressForm.value.line2
      addressUpdate.city = this.addressForm.value.city
      addressUpdate.state = this.addressForm.value.state
      addressUpdate.postalCode = this.addressForm.value.zip
      this.addressUpdate.emit(addressUpdate)
    }

  }
}
