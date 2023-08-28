import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToShortTimeStringPipe } from './pipes/to-short-time-string.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToShortDateStringPipe } from './pipes/to-short-date-string.pipe';
import { D3Module } from './d3/d3.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    ToShortTimeStringPipe,
    ConfirmationDialogComponent,
    ToShortDateStringPipe,
    SpinnerComponent,
  ],
  imports: [
    MaterialModule
  ],
  exports:[
    ToShortDateStringPipe,
    ToShortTimeStringPipe,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    D3Module,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers:[
    ToShortDateStringPipe,
    ToShortTimeStringPipe
  ]
})
export class SharedModule { }
