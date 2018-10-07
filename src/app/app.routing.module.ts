import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './components/form/';
import { FormBootstrapComponent } from './components/formBootstrap';
import { StepperComponent } from './components/stepper';
import { EditUserComponent } from './components/editUser';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'formbootstrap', component: FormBootstrapComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'stepper/:id/edit', component: EditUserComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: '**', redirectTo: '/form', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
