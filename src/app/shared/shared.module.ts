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
import { FormattedStringToPhoneNumberPipe } from './pipes/formatted-string-to-phone-number.pipe';
import { CurrencyFormatterPipe } from './pipes/currency-formatter.pipe';
import { MonthNameFromDatePipe } from './pipes/month-name-from-date.pipe';

@NgModule({
  declarations: [
    ToShortTimeStringPipe,
    ToShortDateStringPipe,
    PhoneNumberToFormattedStringPipe,
    FormattedStringToPhoneNumberPipe,
    ConfirmationDialogComponent,
    SpinnerComponent,
    CurrencyFormatterPipe,
    MonthNameFromDatePipe,
  ],
  imports: [
    MaterialModule
  ],
  exports:[
    CurrencyFormatterPipe,
    ToShortDateStringPipe,
    ToShortTimeStringPipe,
    PhoneNumberToFormattedStringPipe,
    FormattedStringToPhoneNumberPipe,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    D3Module,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers:[
    ToShortDateStringPipe,
    ToShortTimeStringPipe,
    PhoneNumberToFormattedStringPipe,
    FormattedStringToPhoneNumberPipe,
    CurrencyFormatterPipe
  ]
})
export class SharedModule { }
