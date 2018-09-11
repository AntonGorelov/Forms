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
import {
  FormComponent,
  FormBootstrapComponent,
  ValidatorMessageComponent,
  CardAnswerDialogComponent,
  CardAnswerDialogBootstrapComponent
} from './components';
import { AppRoutingModule } from './app.routing.module';
import { InputMaskDirective } from './directives';
import { FormService } from './services';

// NgX Bootstrap
import { ModalBackdropComponent } from 'ngx-bootstrap';
import { ModalContainerComponent } from 'ngx-bootstrap/modal';

// NgX Chips
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormBootstrapComponent,
    ValidatorMessageComponent,
    CardAnswerDialogComponent,
    CardAnswerDialogBootstrapComponent,
    InputMaskDirective,
    ModalBackdropComponent,
    ModalContainerComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTabsModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TagInputModule
  ],
  exports: [ModalBackdropComponent],
  entryComponents: [
    CardAnswerDialogComponent,
    CardAnswerDialogBootstrapComponent,
    ModalBackdropComponent,
    ModalContainerComponent
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
