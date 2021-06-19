//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRouting} from './dashboard.routing'
import {HttpClientModule} from '@angular/common/http';
import {DeviceDetectorModule } from 'ngx-device-detector';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule } from '@angular/material'
import {FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CurrencyMaskModule } from "ng2-currency-mask";

//services
import {ExcelService} from './services/excel.service';
import {variablesGlobales} from '../../services/variablesGlobales';
import {InsumosService} from './inventario/services/insumos.service'
import {HistorialService} from './inventario/services/historial.service'
import {EmpleadosService} from './empleados/services/empleados.service'
import {TrabajadoresService} from './empleados/services/trabajadores.service'
import {CultivoService} from './cultivo/services/cultivo.service'

//componentes
import {EmpleadoModalComponent} from './modales/empleado-modal/empleado-modal.component'
import {ModalComponent} from './modales/modal/modal.component'
import {ModalEdicionComponent} from './modales/modal-edicion/modal-edicion.component'
import {ModalEditarTrabajadorComponent} from './modales/modal-editar-trabajador/modal-editar-trabajador.component'
import {DashboardComponent} from './dashboard.component'

//guards
import {CanActivateViaAuthGuard} from '../../guards/auth.guard';
import {CanActivateAuthGuardChild} from '../../guards/auth.guardChild';

//common
import {fechas} from '../../../common/fechas';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    MatSidenavModule,
    HttpClientModule,
    DeviceDetectorModule,
    //BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    CurrencyMaskModule
  ],
  declarations: [
      DashboardComponent,
      EmpleadoModalComponent,
      ModalComponent,
      ModalEdicionComponent,
      ModalEditarTrabajadorComponent
    ],
    entryComponents:[
        ModalComponent, ModalEdicionComponent, EmpleadoModalComponent, ModalEditarTrabajadorComponent
      ],
    providers: [CanActivateViaAuthGuard, CanActivateAuthGuardChild, TrabajadoresService, CultivoService,
        variablesGlobales,  ExcelService, HistorialService, InsumosService, EmpleadosService, fechas],
    bootstrap: [DashboardComponent]
})
export class DashboardModule { }