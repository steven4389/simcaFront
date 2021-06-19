import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  {CultivoComponent} from './cultivo.component'
import  {ObservacionesComponent} from './components/observaciones/observaciones.component'
import  {LoteCortadoComponent} from './components/lote-cortado/lote-cortado.component'
import {IncidenciaComponent} from './components/incidencia/incidencia.component'
import {SeveridadComponent} from './components/severidad/severidad.component'
import {ReporteComponent} from './components/reporte/reporte.component'

const routes: Routes = [
  { path: '', component: CultivoComponent },
  { path: 'observaciones', component: ObservacionesComponent },
  { path: 'loteCortado', component: LoteCortadoComponent },
  { path: 'incidencia', component: IncidenciaComponent },
  { path: 'severidad', component: SeveridadComponent },
  { path: 'reporte', component: ReporteComponent }
];

 
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CultivoRouting {}