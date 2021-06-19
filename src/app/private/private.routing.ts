import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import {LoginComponent} from './login/login.component'

const routes: Routes = [

  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () => import("./sedes/dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: 'sedes',
    loadChildren: () => import("./sedes/sedes.module").then(m => m.SedeModule)
  },
];

//export const PrivateRouting = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRouting { }