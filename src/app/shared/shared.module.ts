import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToShortTimeStringPipe } from './pipes/to-short-time-string.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToShortDateStringPipe } from './pipes/to-short-date-string.pipe';
import { D3Module } from './d3/d3.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { PhoneNumberToFormattedStringPipe } from './pipes/phone-number-to-formatted-string.pipe';
import { StringToPhoneNumberPipe } from './pipes/string-to-phone-number.pipe';
import { CurrencyFormatterPipe } from './pipes/currency-formatter.pipe';
import { MonthNameFromDatePipe } from './pipes/month-name-from-date.pipe';
import { StringToFormattedPhoneNumberStringPipe } from './pipes/string-to-formatted-phone-number-string.pipe';
import { ContactNamePipe } from './pipes/contact-name.pipe';
import { UtcToLocalPipe } from './pipes/utc-to-local.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UtcToLocalPipe,
    ToShortTimeStringPipe,
    ToShortDateStringPipe,
    PhoneNumberToFormattedStringPipe,
    StringToPhoneNumberPipe,
    ConfirmationDialogComponent,
    SpinnerComponent,
    CurrencyFormatterPipe,
    MonthNameFromDatePipe,
    StringToFormattedPhoneNumberStringPipe,
    ContactNamePipe,
  ],
  imports: [
    MaterialModule,
    NgbModal
  ],
  exports:[
    UtcToLocalPipe,
    CurrencyFormatterPipe,
    ToShortDateStringPipe,
    ToShortTimeStringPipe,
    PhoneNumberToFormattedStringPipe,
    StringToPhoneNumberPipe,
    ContactNamePipe,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    D3Module,
    MaterialModule,
    BrowserAnimationsModule,
    SpinnerComponent,
    HttpClientModule
  ],
  providers:[
    UtcToLocalPipe,
    ToShortDateStringPipe,
    ToShortTimeStringPipe,
    PhoneNumberToFormattedStringPipe,
    StringToPhoneNumberPipe,
    CurrencyFormatterPipe,
    StringToFormattedPhoneNumberStringPipe,
    ContactNamePipe
  ]
})
export class SharedModule { }
