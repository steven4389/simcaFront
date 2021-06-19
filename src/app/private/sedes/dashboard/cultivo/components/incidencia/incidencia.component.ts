import { Component, OnInit } from '@angular/core';
import {CultivoService} from '../../services/cultivo.service';
import {floresPYE} from '../../models/floresPYE';
import {fechas} from '../../../../../../common/fechas'
import { async } from 'q';
import {MatTableDataSource} from '@angular/material';
import {variablesGlobales} from '../../../../../services/variablesGlobales';
import { DeviceDetectorService } from 'ngx-device-detector';

interface Incidencia{
  fecha:string,  
  empresa:string, 
  sede:string,  
  incidencia:number, 
  lote:string,
  plagayenfermedad:String,
  rango:String
}

interface incidencia{
  fecha:Date,
  lote:number,
  plagayenfermedad:string,
  desdeCama:number,
  hastaCama:number
}

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {
  public loading:boolean=false
  public habilitarBoton:boolean=false
  deviceInfo = null;
  isMobile=false
  public _incidencia:Incidencia={fecha:"",  empresa:"", sede:"",  incidencia:null, lote:"", plagayenfermedad:"", rango:""};
  public error:boolean=false
  public Incidencia:incidencia={lote:null, plagayenfermedad:"", desdeCama:null, hastaCama:null, fecha:null}
  public dateBefore:string;
  public dateAfter:string
  public incidencia;
  public desdeCama= null;
  public hastaCama= null;
  public _dateBefore=new Date();
  public dayOfMonth = this._dateBefore.getDate();
  public _dateAfter=new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm a',
    defaultOpen: false,
    closeOnSelect: true
  }

  //tabla
  public displayedColumnsIncidencia: string[] = ['fecha', 'lote', 'plagayenfermedad', 'rango', 'incidencia'];
  public dataSourceIncidencia :MatTableDataSource<any>;
  public ObtenerIncidencia:Incidencia[];

  public plagas = [
    {name: 'Lepidoptero (huevo, larva, adulto)'},
    {name: 'Cucarron marceño'},
    {name: 'Minador'},
    {name: 'Afido'},
    {name: 'Acaro tetranychus'},
    {name: 'Acaro blanco'},
    {name: 'Babosa'},
    {name: 'Mosca blanca'},
    {name: 'Sinfilido'},
    {name: 'Colembolos'},
    {name: 'Libélula'},
    {name: 'Mariquita'},
    {name: 'Abeja'},
    {name: 'Trips'},
    {name: 'Erwinia'},
    {name: 'Araña roja'},
    {name: 'Nematodos'},
    {name: 'Rhizoctonia'},
    {name: 'Botritis'},
    {name: 'Fusarium'},
    {name: 'Mildeo'},
    {name: 'Bacteria'},
    {name: 'Alternaría'},
    {name: 'Deficiencia'},
    {name: 'Amarillamiento'}

  ];

  constructor(private _CultivoService:CultivoService, private _fechas:fechas, private _variablesGlobales:variablesGlobales,
              private deviceService: DeviceDetectorService,) { this.epicFunction();}
 
  public role=[];
  public sede='';
  public empresa='';
  public data=[];
  static muestras=[];

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

   calcularIncidencia(form){
     this.loading=true
      if(form.valid){
        
        let fecha = this.Incidencia.fecha.toString()
        fecha = fecha.substr(0,10)
        fecha = fecha.replace("-","")
        fecha = fecha.replace("-","")
        
        let lote= this.Incidencia.lote.toString()

        if(this.Incidencia.desdeCama == null &&  this.Incidencia.hastaCama == null){
          this.desdeCama=""
          this.hastaCama=""

          this._CultivoService._getPYEflores(fecha, this.empresa, this.sede, lote, this.desdeCama, this.hastaCama, 
                                              this.Incidencia.plagayenfermedad).subscribe(
              res=>{
                    this.data= res.floresC
                    

                    this._CultivoService.getMuestras(fecha, this.empresa, this.sede, lote).subscribe(
                    (res:any)=>{
                    
                    IncidenciaComponent.muestras=  res.muestras

                      if(res.muestras.length != 0){
                          let muestras= IncidenciaComponent.muestras[0].muestras
                          
                          
                          this.incidencia = ((this.data.length/(muestras*3))*100).toFixed(2)
                          this.loading=false
                          this._incidencia.incidencia= this.incidencia
                          this._incidencia.empresa= this.empresa
                          this._incidencia.sede= this.sede
                          this._incidencia.lote= lote
                          this._incidencia.fecha= fecha
                          this._incidencia.plagayenfermedad= this.Incidencia.plagayenfermedad
                          this._incidencia.rango= "Todas las camas muestreadas"

                          if((this.incidencia != 0) && (this.incidencia != null) ){
                            this.habilitarBoton=true
                          }
                      }
                    })
              
                  })
                  
                  this.error=false
        }else{
          this.desdeCama=this.Incidencia.desdeCama-1;
          this.hastaCama=this.Incidencia.hastaCama+1;
            this._CultivoService._getPYEflores(fecha, this.empresa, this.sede, lote, this.desdeCama, this.hastaCama, 
                                                this.Incidencia.plagayenfermedad).subscribe(
                res=>{
                  this.data=  res.floresC; 
                  
                  let camas=((this.Incidencia.hastaCama-this.Incidencia.desdeCama)+1)*3
                  
                  this.incidencia = ((this.data.length/(camas))*100).toFixed(2)
                  this.loading=false
                  this._incidencia.incidencia= this.incidencia
                    this._incidencia.empresa= this.empresa
                    this._incidencia.sede= this.sede
                    this._incidencia.lote= lote
                    this._incidencia.fecha= fecha
                    this._incidencia.plagayenfermedad= this.Incidencia.plagayenfermedad
                    this._incidencia.rango= (this.desdeCama + 1) + " - " + (this.hastaCama - 1)
                })
        }
        if((this.incidencia != 0) && (this.incidencia != null) ){
          this.habilitarBoton=true
        }
        this.error=false
   
      }else{
        this.error=true
      }
      
  }

  guardarResultado(){
    this._CultivoService.saveIncidencia(this._incidencia).subscribe(res=>{
      alert("Incidencia guardada correctamente")
      this.habilitarBoton=!this.habilitarBoton
      this.DefaultDate()
    })
  }

  getIncidencia(dateBefore:string, dateAfter:string, empresa:string, sede:string){
    this._CultivoService.getIncidencia(dateBefore, dateAfter, empresa, sede).subscribe((res:any)=>{
      this.ObtenerIncidencia= res.incidenciaStored
      this.dataSourceIncidencia = new MatTableDataSource(this.ObtenerIncidencia);
    })
  }

  public fechaIngresada(){debugger
    //this.loading=true
        this._variablesGlobales.dateBefore=this._dateBefore
        this._variablesGlobales.dateAfter=this._dateAfter

         let datebef=this._variablesGlobales.getdateBefore()
        
         let dateaft=this._variablesGlobales.getdateAfter()

         datebef=datebef.substr(0,8)
         dateaft=dateaft.substr(0,8)


         this.getIncidencia(datebef, dateaft, this.empresa, this.sede)
  }

  public DefaultDate(){
    this.dayOfMonth = this._dateBefore.getHours(); //estas 2 lineas son para 
    this._dateBefore.setHours(this.dayOfMonth - 168);//saber la fecha de un dia antes
    this._variablesGlobales.dateBefore=this._dateBefore  
    this._dateAfter.setHours(this.dayOfMonth +24);    
    this._variablesGlobales.dateAfter=this._dateAfter
    let datebef=this._variablesGlobales.getdateBefore()
    
    let dateaft=this._variablesGlobales.getdateAfter()
    datebef=datebef.substr(0,8)
    dateaft=dateaft.substr(0,8)
debugger
    this.getIncidencia(datebef, dateaft, this.empresa, this.sede)
  }

}
