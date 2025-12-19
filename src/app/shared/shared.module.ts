import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToShortTimeStringPipe } from './pipes/to-short-time-string.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToShortDateStringPipe } from './pipes/to-short-date-string.pipe';
import { D3Module } from './d3/d3.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyFormatterPipe } from './pipes/currency-formatter.pipe';
import { MonthNameFromDatePipe } from './pipes/month-name-from-date.pipe';
import { UtcToLocalPipe } from './pipes/utc-to-local.pipe';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StringToFormattedPhoneNumberStringPipe } from './pipes/string-to-formatted-phone-number-string.pipe';

@NgModule({
  declarations: [
    UtcToLocalPipe,
    ToShortTimeStringPipe,
    ToShortDateStringPipe,
    ConfirmationDialogComponent,
    SpinnerComponent,
    CurrencyFormatterPipe,
    MonthNameFromDatePipe,
    StringToFormattedPhoneNumberStringPipe,
    TooltipDirective
  ],
  imports: [
    NgbModule,
  ],
  exports:[
    UtcToLocalPipe,
    CurrencyFormatterPipe,
    ToShortDateStringPipe,
    ToShortTimeStringPipe,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    D3Module,
    BrowserAnimationsModule,
    SpinnerComponent,
    HttpClientModule,
    NgbModule,
    TooltipDirective,
    DragDropModule,
  ],
  providers:[
    UtcToLocalPipe,
    ToShortDateStringPipe,
    ToShortTimeStringPipe,
    CurrencyFormatterPipe,
    StringToFormattedPhoneNumberStringPipe,
    NgbActiveModal,
  ]
})
export class SharedModule { }
