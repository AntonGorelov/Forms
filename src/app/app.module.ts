import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBootstrapComponent } from './formBootstrap/formbootstrap.component';
import { AppRoutingModule } from './app.routing.module';

import { FormService } from './form.service';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormBootstrapComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTabsModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
