import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SedeRouting} from './sedes.routing'
import {variablesGlobales} from '../services/variablesGlobales';
import { DeviceDetectorService } from 'ngx-device-detector';

//componentes
import {SedeComponent} from './sede.component'

@NgModule({
  imports: [
    CommonModule,
    SedeRouting
  ],
  declarations: [SedeComponent],
  providers:[variablesGlobales, DeviceDetectorService],
  bootstrap:[SedeComponent]
})
export class SedeModule { }