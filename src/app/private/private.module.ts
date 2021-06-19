import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {PrivateRouting} from './private.routing'
import {HttpClientModule} from '@angular/common/http';
import {DeviceDetectorModule } from 'ngx-device-detector';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule } from '@angular/material'
import {FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

//services
import {LoginService} from './services/login.service';
import { UserService } from './services/user.service';
import {variablesGlobales} from './services/variablesGlobales';
import {ResponseData} from '../common/ResponseData'

//component
import {LoginComponent} from './login/login.component'



@NgModule({
  imports: [
    //RouterModule.forChild(routes),
    CommonModule,
    PrivateRouting,
    HttpClientModule,
    DeviceDetectorModule,
    //BrowserAnimationsModule,
    //BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [LoginComponent],
  providers:[LoginService, UserService, variablesGlobales],
  bootstrap:[LoginComponent]
})
export class PrivateModule { }