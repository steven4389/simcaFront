//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventarioRouting} from './inventario.routing'
import {HttpClientModule} from '@angular/common/http';
import {DeviceDetectorModule } from 'ngx-device-detector';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTableModule } from '@angular/material'
import {MatInputModule } from '@angular/material'
import {FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularDateTimePickerModule } from 'angular2-datetimepicker';
import {MatTabsModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

//services
import {ExcelService} from '../services/excel.service';
import {variablesGlobales} from '../../../services/variablesGlobales';
import {InsumosService} from './services/insumos.service'
import {HistorialService} from './services/historial.service'

//components
import {InventarioComponent} from './inventario.component'

//guards
import {CanActivateViaAuthGuard} from '../../../guards/auth.guard';
import {CanActivateAuthGuardChild} from '../../../guards/auth.guardChild';

//common
import {fechas} from '../../../../common/fechas';




@NgModule({
  imports: [
    CommonModule,
    InventarioRouting,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    //BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularDateTimePickerModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [InventarioComponent],
  providers: [CanActivateViaAuthGuard, CanActivateAuthGuardChild, 
    variablesGlobales, fechas, ExcelService, HistorialService, InsumosService],
})
export class InventarioModule { }