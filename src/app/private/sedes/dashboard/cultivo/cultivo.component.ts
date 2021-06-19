import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import {CultivoService} from './services/cultivo.service';
import {variablesGlobales} from '../../../services/variablesGlobales';
import { Router, ActivatedRoute } from '@angular/router';
import {ExcelService} from '../services/excel.service';

//especies
import {especiesTrazabilidad} from './models/especiesTrazabilidad'
import {especiesPYE} from './models/especiesPYE';
import {especiesSiembra} from './models/especiesSiembra';

//flores
import {floresCorte} from './models/floresCorte';
import {floresPYE} from './models/floresPYE';
import {floresTrazabilidad} from './models/floresTrazabilidad';
import {floresSiembra} from './models/floresSiembra';

import { DeviceDetectorService } from 'ngx-device-detector';
import { fechas } from '../../../../common/fechas';


@Component({
  selector: 'app-cultivo',
  templateUrl: './cultivo.component.html',
  styleUrls: ['./cultivo.component.css']
})
export class CultivoComponent implements OnInit {
  observaciones=[];
  deviceInfo = null;
  isMobile=false
  public sede=''
  public empresa=''
  public role=[]
  public dateBefore=new Date();
  public dayOfMonth = this.dateBefore.getDate();
  public dateAfter=new Date();
  settings = {
                bigBanner: true,
                timePicker: true,
                format: 'dd-MM-yyyy hh:mm a',
                defaultOpen: false,
                closeOnSelect: true
              }
  
  //especies-------------
  //tabla trazabilidad especies
  public displayedColumns: string[] = ['fecha', 'lote', 'cod_cama', 'codigoTrabajador', 'variedad', 'codTrazabilidad'];
  public dataSource :MatTableDataSource<any>;
  public especiesTrazabilidad: especiesTrazabilidad[]

  //tabla plaga y enfermedad especies
  public displayedColumnsEspeciesPYE: string[] = ['fecha', 'lote', 'cama', 'plagayenfermedad', 'sitio', 'variedad'];
  public dataSourceEspeciesPYE :MatTableDataSource<any>;
  public especiesPYE:especiesPYE[];

  //tabla siembra especies
  public displayedColumnsSiembraEspecies: string[] = ['fecha', 'codigoTrabajador', 'lote', 'cama', 'variedad', 'densidadLote', 'cubetaCama'];
  public dataSourceSiembraEspecies :MatTableDataSource<any>;
  public SiembraEspecies:especiesSiembra[];
  
  //flores---------------------
  //tabla corte flores
  public displayedColumnsFloresCorte: string[] = ['fechaInicial', 'fechaFinal', 'usuario', 'cantidad', 'tiempoTrabajado', 'rendimiento'];
  public dataSourceFloresCorte :MatTableDataSource<any>;
  public floresCorte:floresCorte[];

  //tabla trazabilidad flores
  public displayedColumnsFloresTrazabilidad: string[] = ['fecha', 'variedad', 'cama', 'lote', 'codigoTrabajador'];
  public dataSourceFloresTrazabilidad :MatTableDataSource<any>;
  public floresTrazabilidad:floresTrazabilidad[];

  //tabla plagas y enfermedades flores
  public displayedColumnsPYE: string[] = ['fecha', 'plagayenfermedad', 'variedad', 'sitio', 'cama', 'lote', 'individuosLarvas', 'individuosAdultos', 'individuos'];
  public dataSourcefloresPYE :MatTableDataSource<any>;
  public floresPYE:floresPYE[];

  //tabla siembra flores
  public displayedColumnsFloresSiembra: string[] = ['fecha', 'codigoTrabajador', 'lote', 'cama', 'variedad', 'dencidadLote', 'cubetaCama'];
  public dataSourceFloresSiembra :MatTableDataSource<any>;
  public floresSiembra:floresSiembra[];

  //tabla flores plantas madre
  public displayedColumnsFloresPlantasMadre: string[] = ['fecha', 'variedad', 'cuartoFrio', 'cosecha', 'inventarioCosecha', 'enrraizamientoProduccion', 'enrraizamientoPlantasMadres', 'observaciones'];
  public dataSourceFloresPlantasMadre :MatTableDataSource<any>;
  public FloresPlantasMadre:floresSiembra[];

  
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceFloresCorte.filter = filterValue.trim().toLowerCase();
    
}

  constructor(private _CultivoService:CultivoService, 
              private deviceService: DeviceDetectorService,
              private _variablesGlobales:variablesGlobales, 
              private _router: Router,
              private excelService:ExcelService, 
              private _activatedRoute: ActivatedRoute) 
              {this.epicFunction();}

  ngOnInit() {
    let roleArray= localStorage.getItem('role')
    this.role= JSON.parse(roleArray);
  
    if(this.role[0] =="admin"){
      this.sede = localStorage.getItem('sede')
    }else{
       let temp = localStorage.getItem('sede')
       
       temp=temp.substr(1,temp.length-2)
       
       this.sede = temp

    }
    this.empresa = localStorage.getItem('empresa')

    this.DefaultDate()
      
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

  //especies------------
  public getEspeciesTrazabilidad(dateB:string, dateA:string){
    this._CultivoService.getEspeciesTrazabilidad(dateB, dateA, this.empresa, this.sede).subscribe(
       response=>{

        response.trazabilidadEspecies.forEach((elemento, index) =>{
        response.trazabilidadEspecies[index].fecha= response.trazabilidadEspecies[index].fecha.slice(0, 4) + "-"+ response.trazabilidadEspecies[index].fecha.slice(4);
        response.trazabilidadEspecies[index].fecha= response.trazabilidadEspecies[index].fecha.slice(0, 7) + "-"+ response.trazabilidadEspecies[index].fecha.slice(7);
        response.trazabilidadEspecies[index].fecha= response.trazabilidadEspecies[index].fecha.slice(0, 10) + " "+ response.trazabilidadEspecies[index].fecha.slice(10);
        response.trazabilidadEspecies[index].fecha= response.trazabilidadEspecies[index].fecha.slice(0, 13) + ":"+ response.trazabilidadEspecies[index].fecha.slice(13);

        this.especiesTrazabilidad= response.trazabilidadEspecies
        })
     

        this.dataSource = new MatTableDataSource(this.especiesTrazabilidad);
         
         localStorage.setItem('especiesTrazabilidad', JSON.stringify(this.especiesTrazabilidad));
       })
  }

  public getEspeciesPYE(dateB:string, dateA:string){
    this._CultivoService.getEspeciesPYE(dateB, dateA, this.empresa, this.sede).subscribe(
      response=>{
        this.especiesPYE= response.plagayenfermedad
        this.dataSourceEspeciesPYE = new MatTableDataSource(this.especiesPYE);
        console.log(response)
        localStorage.setItem('especiesPYE', JSON.stringify(this.especiesPYE));
      }
    )
 }

 public getEspeciesSiembra(dateB:string, dateA:string){
  this._CultivoService.getSiembraEspecies(dateB, dateA, this.empresa, this.sede).subscribe(
    response=>{
      console.log(response)
      response.especiesSiem.forEach((elemento, index) =>{
        response.especiesSiem[index].fecha= response.especiesSiem[index].fecha.slice(0, 4) + "-"+ response.especiesSiem[index].fecha.slice(4);
        response.especiesSiem[index].fecha= response.especiesSiem[index].fecha.slice(0, 7) + "-"+ response.especiesSiem[index].fecha.slice(7);
        response.especiesSiem[index].fecha= response.especiesSiem[index].fecha.slice(0, 10) + " "+ response.especiesSiem[index].fecha.slice(10);
        response.especiesSiem[index].fecha= response.especiesSiem[index].fecha.slice(0, 13) + ":"+ response.especiesSiem[index].fecha.slice(13);

        this.SiembraEspecies= response.especiesSiem
        this.dataSourceSiembraEspecies = new MatTableDataSource(this.SiembraEspecies);
        localStorage.setItem('SiembraEspecies', JSON.stringify(this.SiembraEspecies));
        })})
        
 }

 //flores-----------------
  public getFloresCorte(dateB:string, dateA:string){
    this._CultivoService.getFloresCorte(dateB, dateA, this.empresa, this.sede).subscribe(
      response=>{

        response.floresCorte.forEach((elemento, index) =>{
          response.floresCorte[index].fechaInicial= response.floresCorte[index].fechaInicial.slice(0, 4) + "-"+ response.floresCorte[index].fechaInicial.slice(4);
          response.floresCorte[index].fechaInicial= response.floresCorte[index].fechaInicial.slice(0, 7) + "-"+ response.floresCorte[index].fechaInicial.slice(7);
          response.floresCorte[index].fechaInicial= response.floresCorte[index].fechaInicial.slice(0, 10) + " "+ response.floresCorte[index].fechaInicial.slice(10);
          response.floresCorte[index].fechaInicial= response.floresCorte[index].fechaInicial.slice(0, 13) + ":"+ response.floresCorte[index].fechaInicial.slice(13);
  
          this.floresCorte= response.floresCorte
          })

          response.floresCorte.forEach((elemento, index) =>{
            response.floresCorte[index].fechaFinal= response.floresCorte[index].fechaFinal.slice(0, 4) + "-"+ response.floresCorte[index].fechaFinal.slice(4);
            response.floresCorte[index].fechaFinal= response.floresCorte[index].fechaFinal.slice(0, 7) + "-"+ response.floresCorte[index].fechaFinal.slice(7);
            response.floresCorte[index].fechaFinal= response.floresCorte[index].fechaFinal.slice(0, 10) + " "+ response.floresCorte[index].fechaFinal.slice(10);
            response.floresCorte[index].fechaFinal= response.floresCorte[index].fechaFinal.slice(0, 13) + ":"+ response.floresCorte[index].fechaFinal.slice(13);
    
            this.floresCorte= response.floresCorte
            })

        
          this.dataSourceFloresCorte = new MatTableDataSource(this.floresCorte);
        
        localStorage.setItem('floresCorte', JSON.stringify(this.floresCorte));
      }
    )
  }

  public getFloresPYE(dateB:string, dateA:string){
    this._CultivoService.getPYEflores(dateB, dateA, this.empresa, this.sede).subscribe(
      response=>{

          response.floresC.forEach((elemento, index) =>{
              response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 4) + "-"+ response.floresC[index].fecha.slice(4);
              response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 7) + "-"+ response.floresC[index].fecha.slice(7);
              response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 10) + " "+ response.floresC[index].fecha.slice(10);
              response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 13) + ":"+ response.floresC[index].fecha.slice(13);
              this.floresPYE= response.floresC
           })
          //this.floresPYE= response.floresC
        this.dataSourcefloresPYE = new MatTableDataSource(this.floresPYE);
        localStorage.setItem('floresPYE', JSON.stringify(this.floresPYE));
        
      }
    )
  }
  

  public  getFloresTrazabilidad(dateB:string, dateA:string){
    this._CultivoService.getFloresTrazabilidad(dateB, dateA, this.empresa, this.sede).subscribe(
      response=>{

       response.floresTrazabilidad.forEach((elemento, index) =>{
       response.floresTrazabilidad[index].fecha= response.floresTrazabilidad[index].fecha.slice(0, 4) + "-"+ response.floresTrazabilidad[index].fecha.slice(4);
       response.floresTrazabilidad[index].fecha= response.floresTrazabilidad[index].fecha.slice(0, 7) + "-"+ response.floresTrazabilidad[index].fecha.slice(7);
       response.floresTrazabilidad[index].fecha= response.floresTrazabilidad[index].fecha.slice(0, 10) + " "+ response.floresTrazabilidad[index].fecha.slice(10);
       response.floresTrazabilidad[index].fecha= response.floresTrazabilidad[index].fecha.slice(0, 13) + ":"+ response.floresTrazabilidad[index].fecha.slice(13);

       this.floresTrazabilidad= response.floresTrazabilidad
       })
    

       this.dataSourceFloresTrazabilidad = new MatTableDataSource(this.floresTrazabilidad);
       localStorage.setItem('floresTrazabilidad', JSON.stringify(this.floresTrazabilidad));
      }
    )
  }

  public FloresSiembra(dateB:string, dateA:string){
    this._CultivoService.getSiembraFlores( dateB, dateA, this.empresa, this.sede).subscribe(
      response=>{

        response.floresSiem.forEach((elemento, index) =>{
          response.floresSiem[index].fecha= response.floresSiem[index].fecha.slice(0, 4) + "-"+ response.floresSiem[index].fecha.slice(4);
          response.floresSiem[index].fecha= response.floresSiem[index].fecha.slice(0, 7) + "-"+ response.floresSiem[index].fecha.slice(7);
          response.floresSiem[index].fecha= response.floresSiem[index].fecha.slice(0, 10) + " "+ response.floresSiem[index].fecha.slice(10);
          response.floresSiem[index].fecha= response.floresSiem[index].fecha.slice(0, 13) + ":"+ response.floresSiem[index].fecha.slice(13);

        //this.floresSiembra= response.floresSiem
      })
        this.floresSiembra= response.floresSiem
        this.dataSourceFloresSiembra = new MatTableDataSource(this.floresSiembra);
        localStorage.setItem('floresSiembra', JSON.stringify(this.floresSiembra));
        
      }
    )
  }


  public _FloresPlantasMadre(dateB:string, dateA:string){debugger
    this._CultivoService.getFloresPlantasMadre( dateB, dateA, this.empresa, this.sede).subscribe(
      (response:any)=>{debugger
        
          response.FloresSiembraPlantasMadres.forEach((elemento, index) =>{
          response.FloresSiembraPlantasMadres[index].fecha= response.FloresSiembraPlantasMadres[index].fecha.slice(0, 4) + "-"+ response.FloresSiembraPlantasMadres[index].fecha.slice(4);
          response.FloresSiembraPlantasMadres[index].fecha= response.FloresSiembraPlantasMadres[index].fecha.slice(0, 7) + "-"+ response.FloresSiembraPlantasMadres[index].fecha.slice(7);
          response.FloresSiembraPlantasMadres[index].fecha= response.FloresSiembraPlantasMadres[index].fecha.slice(0, 10) + " "+ response.FloresSiembraPlantasMadres[index].fecha.slice(10);
          response.FloresSiembraPlantasMadres[index].fecha= response.FloresSiembraPlantasMadres[index].fecha.slice(0, 13) + ":"+ response.FloresSiembraPlantasMadres[index].fecha.slice(13);

        //this.floresSiembra= response.floresSiem
      })
      console.log("plantas madre", response)
        this.FloresPlantasMadre= response.FloresSiembraPlantasMadres
        this.dataSourceFloresPlantasMadre = new MatTableDataSource(this.FloresPlantasMadre);
        localStorage.setItem('FloresPlantasMadre', JSON.stringify(this.FloresPlantasMadre));
        
      }
    )
  }


  public fechaIngresada(caso:string){
    //this.loading=true
        this._variablesGlobales.dateBefore=this.dateBefore  
        this._variablesGlobales.dateAfter=this.dateAfter

         let datebef=this._variablesGlobales.getdateBefore()
        
         let dateaft=this._variablesGlobales.getdateAfter()

         let fechas=[]
         fechas[0]=datebef;
         fechas[1]=dateaft;
         
         localStorage.setItem('fechaObservaciones', JSON.stringify(fechas));

         switch (caso) {
          case "te":
              this.getEspeciesTrazabilidad(datebef, dateaft)
              break;
          case "pyee":
              this.getEspeciesPYE(datebef, dateaft)
              break;
          case "es":
              this.getEspeciesSiembra(datebef, dateaft)
              break;
          case "fc":
              this.getFloresCorte(datebef, dateaft)
              break;
          case "pyef":
              this.getFloresPYE(datebef, dateaft)
              break;
          case "ft":
              this.getFloresTrazabilidad(datebef, dateaft)
              break;
          case "fs":
              this.FloresSiembra(datebef, dateaft)
              break;
          case "fp":
             this._FloresPlantasMadre(datebef, dateaft)
              break;    
              
         }
  }

  public DefaultDate(){
    this.dayOfMonth = this.dateBefore.getHours(); //estas 2 lineas son para 
    this.dateBefore.setHours(this.dayOfMonth - 24);//saber la fecha de un dia antes
    this._variablesGlobales.dateBefore=this.dateBefore  
    this.dateAfter.setHours(this.dayOfMonth +1);    
    this._variablesGlobales.dateAfter=this.dateAfter
    let datebef=this._variablesGlobales.getdateBefore()
    
    let dateaft=this._variablesGlobales.getdateAfter()
    let fechas=[]
    fechas[0]=datebef;
    fechas[1]=dateaft;

    localStorage.setItem('fechaObservaciones', JSON.stringify(fechas));

      if(this.role[1]=="especies"){
        this.getEspeciesTrazabilidad(datebef, dateaft)
        this.getEspeciesPYE(datebef, dateaft)
        this.getEspeciesSiembra(datebef, dateaft)
      }else{
        this.getFloresCorte(datebef, dateaft)
        this.getFloresPYE(datebef, dateaft)
        this.getFloresTrazabilidad(datebef, dateaft)
        this.FloresSiembra(datebef, dateaft)
        this._FloresPlantasMadre(datebef, dateaft)
      }
  }

  descargarExcel(caso:string):void{alert(caso)
    switch (caso) {
      case "especiesTrazabilidad":
        let registros1=JSON.parse(localStorage.getItem('especiesTrazabilidad'));
        
        let especiesTrazabilidad=[{Fecha:"", Nombre:"",  Proveedor:"", UnidadMedida:"", Costo:"", Clasificacion:"", Accion:""}]
        for (let i = 0; i < (registros1).length; i++) {
            delete registros1[i]._id
            delete registros1[i].__v
            especiesTrazabilidad[i]= registros1[i]
        }
        this.excelService.exportAsExcelFile(especiesTrazabilidad, 'especiesTrazabilidad');
        break;
        
      case "SiembraEspecies":
        let registros2=JSON.parse(localStorage.getItem('SiembraEspecies'));
        let SiembraEspecies=[{Fecha:"", Nombre:"",  Proveedor:"", UnidadMedida:"", Costo:"", Clasificacion:"", Accion:""}]
        for (let i = 0; i < (registros2).length; i++) {
            delete registros2[i]._id
            delete registros2[i].__v
            SiembraEspecies[i]= registros2[i]
        }
        this.excelService.exportAsExcelFile(SiembraEspecies, 'SiembraEspecies');
      break;

      case "floresCorte":
        let registros3=JSON.parse(localStorage.getItem('floresCorte'));
        console.log("flores corte",registros3)
        let floresCorte=[{Fecha:"", Nombre:"",  Proveedor:"", UnidadMedida:"", Costo:"", Clasificacion:"", Accion:""}]
        for (let i = 0; i < (registros3).length; i++) {
            delete registros3._id
            delete registros3[i].__v
            floresCorte[i]= registros3[i]
        }
        this.excelService.exportAsExcelFile(floresCorte, 'floresCorte');
        break;

        case "floresPYE":
          let registros4=JSON.parse(localStorage.getItem('floresPYE'));
          
          let floresPYE=[{Fecha:"", Nombre:"",  Proveedor:"", UnidadMedida:"", Costo:"", Clasificacion:"", Accion:""}]
          for (let i = 0; i < (registros4).length; i++) {
            
              delete registros4[i]._id
              delete registros4[i].__v
              floresPYE[i]= registros4[i]
          }
          console.log("flores p y e", floresPYE)
          this.excelService.exportAsExcelFile(floresPYE, 'floresPYE');
          break;

      case "floresTrazabilidad":
        let registros5=JSON.parse(localStorage.getItem('floresTrazabilidad'));
        let floresTrazabilidad=[{Fecha:"", Nombre:"",  Proveedor:"", UnidadMedida:"", Costo:"", Clasificacion:"", Accion:""}]
        for (let i = 0; i < (registros5).length; i++) {
            delete registros5[i]._id
            delete registros5[i].__v
            floresTrazabilidad[i]= registros5[i]
        }
        this.excelService.exportAsExcelFile(floresTrazabilidad, 'floresTrazabilidad');
        break;  

      case "floresSiembra":
        let registros6=JSON.parse(localStorage.getItem('floresSiembra'));
        let floresSiembra=[{Fecha:"", Nombre:"",  Proveedor:"", UnidadMedida:"", Costo:"", Clasificacion:"", Accion:""}]
        for (let i = 0; i < (registros6).length; i++) {
            delete registros6._id
            delete registros6[i].__v
            floresSiembra[6]= registros6[6]
        }
        this.excelService.exportAsExcelFile(floresSiembra, 'floresSiembra');
        break;   
    }
              
}

  Observaciones(){
    this._router.navigate(['/private/sedes/dashboard/cultivo/observaciones'], { relativeTo: this._activatedRoute });     
  }

  reporteICA(){
    this._router.navigate(['/private/sedes/dashboard/cultivo/reporte'], { relativeTo: this._activatedRoute });     
  }

  loteCortado(){
    this._router.navigate(['/private/sedes/dashboard/cultivo/loteCortado'], { relativeTo: this._activatedRoute });     
  }


  
}

