import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
  CardAnswerDialogBootstrapComponent,
  StepperComponent,
  AddressComponent,
  EditUserComponent
} from './components';
import { AppRoutingModule } from './app.routing.module';
import { InputMaskDirective } from './directives';
import { FormService, StepperService } from './services';

// NgX Bootstrap
import { ModalBackdropComponent } from 'ngx-bootstrap';
import { ModalContainerComponent } from 'ngx-bootstrap/modal';

// NgX Chips
import { TagInputModule } from 'ngx-chips';

// Angular Google Maps
import { AgmCoreModule } from '@agm/core';

// Interceptors
import { TokenInterceptor } from './token.interceptor';


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
    ModalContainerComponent,
    StepperComponent,
    AddressComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTabsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TagInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqnv30J63X9uYnr5yXA7lkUSKrp_cHGIM',
      libraries: ['places']
    })
  ],
  exports: [ModalBackdropComponent],
  entryComponents: [
    CardAnswerDialogComponent,
    CardAnswerDialogBootstrapComponent,
    ModalBackdropComponent,
    ModalContainerComponent
  ],
  providers: [
    FormService,
    StepperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
