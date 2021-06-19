import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventarioComponent} from './inventario.component'

const routes: Routes = [

  { path: '', 
    component: InventarioComponent }

];

 
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class InventarioRouting {}

// path: '', component: PaginaComponent,
//     children: [
//       { path: '', redirectTo: 'principal', pathMatch: 'full' },
//       { path: 'info', component: InfoComponent },
//       { path: 'principal', component: PaginaPrincipalComponent },
//     ]