import { CurrencyMaskModule } from "ng2-currency-mask";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AppRoutingModule } from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

//guards
import {CanActivateViaAuthGuard} from './private/guards/auth.guard';
import {CanActivateAuthGuardChild} from './private/guards/auth.guardChild';

//services
import{variablesGlobales} from './private/services/variablesGlobales'

//components
import { PaginaComponent } from './public/pagina/pagina/pagina.component';
import { InfoComponent } from './public/pagina/info/info.component';
import { PaginaPrincipalComponent } from './public/pagina/pagina-principal/pagina-principal.component';
import {AppComponent} from './app.component'

//common
import {fechas} from './common/fechas';
import { NosotrosComponent } from './public/pagina/nosotros/nosotros.component';
import { GaleriaComponent } from './public/pagina/galeria/galeria.component';



@NgModule({
  declarations: [
    AppComponent,
    PaginaComponent,
    InfoComponent,
    PaginaPrincipalComponent,
    NosotrosComponent,
    GaleriaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularDateTimePickerModule,
    CurrencyMaskModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([]),
    CommonModule
  ],
  entryComponents:[],
  providers: [CanActivateViaAuthGuard, CanActivateAuthGuardChild, fechas, variablesGlobales],
  bootstrap: [AppComponent]
})
export class appModule { }
