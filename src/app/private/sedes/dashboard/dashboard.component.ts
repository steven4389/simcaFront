import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import {variablesGlobales} from '../../services/variablesGlobales';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  deviceInfo = null;
  isMobile=false
  navbarOpen = false;
  public role=[]
  public sede
  public empresa
  public isLogin:boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  showFiller = false;

  constructor(private _router:Router, private _activatedRoute: ActivatedRoute, private _variablesGlobales:variablesGlobales,
              private deviceService: DeviceDetectorService) { this.epicFunction()}
  
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
    let roleArray= localStorage.getItem('role')
    this.role= JSON.parse(roleArray);
    this.sede = localStorage.getItem('sede')
    this.empresa = localStorage.getItem('empresa')
      
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  inicio(){
    this.navbarOpen= false
    this._router.navigate(['/private/sedes'], { relativeTo: this._activatedRoute });
  }

  onClickLogout(){
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

  moveCultivo(){
    this.navbarOpen= false
    this._router.navigate(['/private/sedes/dashboard/cultivo'], { relativeTo: this._activatedRoute });      
  }

  moveEmpleados(){
    this.navbarOpen= false
      this._router.navigate(['/private/sedes/dashboard/empleados'], { relativeTo: this._activatedRoute });
  }

  moveFinanzas(){
    this.navbarOpen= false
    debugger
      this._router.navigate(['/private/sedes/dashboard/inventario'], { relativeTo: this._activatedRoute });
  }

  moveAnalytics(){
    this.navbarOpen= false
    debugger
      this._router.navigate(['/private/sedes/dashboard/analytics'], { relativeTo: this._activatedRoute });
  }

}
