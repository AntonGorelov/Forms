import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatDialogModule,
  MatStepperModule,
  MatTableModule,
  MatSnackBarModule
} from '@angular/material';

const modules = [
  BrowserAnimationsModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatDialogModule,
  MatStepperModule,
  MatTableModule,
  MatSnackBarModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
  ,
})export class MaterialModule {}
