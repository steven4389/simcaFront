import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  {GraphicsComponent} from './components/graphics/graphics.component'


const routes: Routes = [
  { path: '', component: GraphicsComponent },
  
];

 
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AnalyticsRouting {}