import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './components/form/form.component';
import { FormBootstrapComponent } from './components/formBootstrap/formbootstrap.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'formbootstrap', component: FormBootstrapComponent },
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
