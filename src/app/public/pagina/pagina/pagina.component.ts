import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute} from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import {variablesGlobales} from '../../../private/services/variablesGlobales';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css'],
  providers: [NgbCarouselConfig]
})

export class PaginaComponent implements OnInit {
  
  principal:boolean
  deviceInfo = null;
  isMobile=false
  navbarOpen = false;

  constructor(private router: Router, config: NgbCarouselConfig, 
              private deviceService: DeviceDetectorService,
               public _variablesGlobales:variablesGlobales,
               private _activatedRoute: ActivatedRoute) {
     // customize default values of carousels used by this component tree
     this.epicFunction();
     this.principal=true
     config.interval = 3000;
     config.wrap = true;
     config.keyboard = true;
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
    this.principal=true
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  Ingresar(){
    this.router.navigate(['/private']);
  }

  inicio(){
    this.principal=true
    this._variablesGlobales.rutaPagina="inicio"
    this.router.navigate(['/']); 
  }

  galeria(){
    this.principal=false
    this._variablesGlobales.rutaPagina="galeria"
    this.router.navigate(['/galeria'], { relativeTo: this._activatedRoute });    
  }

  nosotros(){
    this.principal=false
    this._variablesGlobales.rutaPagina="nosotros"
    this.router.navigate(['/nosotros'], { relativeTo: this._activatedRoute });    
  }

  // monitoreo(){
  //   debugger
  //   this.principal=false
  //   this._variablesGlobales.rutaPagina="monitoreo"
  //   this.router.navigate(['/info'], { relativeTo: this._activatedRoute });    
  // }

  // inventario(){
  //   this.principal=false
  //   this._variablesGlobales.rutaPagina="inventario"
  //   this.router.navigate(['./info'], { relativeTo: this._activatedRoute });    
  // }

  // horas(){
  //   this.principal=false
  //   this._variablesGlobales.rutaPagina="horas"
  //   this.router.navigate(['./info'], { relativeTo: this._activatedRoute });      
  // }

}
