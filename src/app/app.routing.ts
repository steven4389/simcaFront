import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PaginaComponent } from './public/pagina/pagina/pagina.component'
import { InfoComponent } from './public/pagina/info/info.component'
import { PaginaPrincipalComponent } from './public/pagina/pagina-principal/pagina-principal.component'
import { NgModule } from '@angular/core';
import { NosotrosComponent } from './public/pagina/nosotros/nosotros.component';
import { GaleriaComponent } from './public/pagina/galeria/galeria.component';

const _Routes: Routes = [

  {
    path: '', component: PaginaComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'info', component: InfoComponent },
      { path: 'principal', component: PaginaPrincipalComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'galeria', component: GaleriaComponent },
    ]
  },
  {
    path: 'private',
    loadChildren: () => import("./private/private.module").then(m => m.PrivateModule)
  },

];


@NgModule({
  imports: [RouterModule.forRoot(_Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



