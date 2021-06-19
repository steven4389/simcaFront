import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard.component'
import { NgModule } from '@angular/core';

const routes: Routes = [
 {
    path: '',
    component: DashboardComponent,
    children: [
                { path: '', redirectTo: 'inventario', pathMatch: 'full' },
                {
                  path: 'cultivo',
                  loadChildren: () => import("./cultivo/cultivo.module").then(m => m.CultivoModule)
                },
                {
                  path: 'empleados',
                  loadChildren: () => import("./empleados/empleados.module").then(m => m.EmpleadosModule)
                },
                {
                  path: 'inventario',
                  loadChildren: () => import("./inventario/inventario.module").then(m => m.InventarioModule)
                },
                {
                  path: 'analytics',
                  loadChildren: () => import("./analytics/analytics.module").then(m => m.AnalyticsModule)
                },
          ]
 },
 
];

//export const DashboardRouting =RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting { }

