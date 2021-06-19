import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {variablesGlobales} from '../services/variablesGlobales';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {
  deviceInfo = null;
  isMobile=false
  public loading:boolean
  username = '';
  role= [];
  empresa='';
  sedes= [];
  

  constructor(private _router: Router,
              private _variablesGlobales:variablesGlobales, 
              private _activatedRoute: ActivatedRoute,
              private deviceService: DeviceDetectorService)
  { 
    this.loading=false
    this.epicFunction();
   
              
  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  ngOnInit() {
    debugger

    this.username= localStorage.getItem('username')
    let roleArray= localStorage.getItem('role')
    this.role= JSON.parse(roleArray);
    this.empresa= localStorage.getItem('empresa')
    let array = localStorage.getItem('sedes')
    this.sedes= JSON.parse(array);

  }

 

  Sede(sede){console.log("la sede")
    this.loading=true
      localStorage.setItem('sede', sede);   
      this._router.navigate(['/private/sedes/dashboard']);   
  }

  onClickLogout(){
    this.loading=true
    localStorage.removeItem('token');
    localStorage.removeItem('empresa');
    localStorage.removeItem('registros');
    localStorage.removeItem('role');
    localStorage.removeItem('sede');
    localStorage.removeItem('sedes');
    localStorage.removeItem('Insumos');
    localStorage.removeItem('historial');
    this._router.navigate(['/principal'], { relativeTo: this._activatedRoute });
  }

  
}
