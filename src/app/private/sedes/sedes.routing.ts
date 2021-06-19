import { RouterModule, Routes } from '@angular/router';
import {SedeComponent} from './sede.component'
import { NgModule } from '@angular/core';

const routes: Routes = [
 {
    path: '',
    component: SedeComponent
 },
 {
    path: 'dashboard',
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },

];

// export const SedeRouting = RouterModule.forChild(routes);

 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class SedeRouting { }