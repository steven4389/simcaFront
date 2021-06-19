import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmpleadosComponent} from './empleados.component'

const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 { path: '', component: EmpleadosComponent },

];

 
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class EmpleadosRouting {}