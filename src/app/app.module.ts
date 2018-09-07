import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MaterialModule } from './material.module';
import { MatTabsModule } from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// My Modules
import { AppComponent } from './app.component';
import { FormComponent, FormBootstrapComponent, ValidatorMessageComponent } from './components';
import { AppRoutingModule } from './app.routing.module';
import { InputMaskDirective } from './directives';
import { FormService } from './services';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormBootstrapComponent,
    ValidatorMessageComponent,
    InputMaskDirective
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
