import { Component, OnInit } from '@angular/core';
import {CultivoService} from '../../services/cultivo.service';
import {MatTableDataSource} from '@angular/material';
import {variablesGlobales} from '../../../../../services/variablesGlobales';
import { DeviceDetectorService } from 'ngx-device-detector';

interface Severidad{
  fecha:string,  
  empresa:string, 
  sede:string,  
  severidad:number, 
  lote:string,
  plagayenfermedad:String,
  rango:String
}

interface severidad{
  fecha:Date,
  lote:number,
  plagayenfermedad:string,
  desdeCama:number,
  hastaCama:number
}

@Component({
  selector: 'app-severidad',
  templateUrl: './severidad.component.html',
  styleUrls: ['./severidad.component.css']
})
export class SeveridadComponent implements OnInit {
  public loading:boolean=false
  public habilitarBoton:boolean=false
  deviceInfo = null;
  isMobile=false
  public _severidad:Severidad={fecha:"",  empresa:"", sede:"",  severidad:null, lote:"", plagayenfermedad:"", rango:""};
  public error:boolean=false
  public Severidad:severidad={lote:null, plagayenfermedad:"", desdeCama:null, hastaCama:null, fecha:null}
  public dateBefore:string;
  public dateAfter:string
  public severidad=null;
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
  public displayedColumnsSeveridad: string[] = ['fecha', 'lote', 'plagayenfermedad', 'rango', 'severidad'];
  public dataSourceSeveridad :MatTableDataSource<any>;
  public ObtenerSeveridad:Severidad[];


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
    {name: 'Araña roja'},
    {name: 'Nematodos'},
    {name: 'Rhizoctonia'},
    {name: 'Botritis'},
    {name: 'Fusarium'},
    {name: 'Mildeo'},
    {name: 'Bacteria'},
    {name: 'Alternaría'},
    {name: 'Deficiencia'},
    {name: 'Amarillamiento'},
    {name: 'Ascochyta'},
    {name: 'Erwinia'}

  ];

  constructor(private _CultivoService:CultivoService, private _variablesGlobales:variablesGlobales,
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
    }else{debugger
       let temp = localStorage.getItem('sede')
       
       temp=temp.substr(1,temp.length-2)
       
       this.sede = temp

    }
    this.empresa = localStorage.getItem('empresa')
    
    console.log("aca esta la fecha",this.data)
    this.DefaultDate()
  }

  calcularSeveridad(form){
    this.loading=true
    
      if(form.valid){
        console.log(this.Severidad.fecha)
        let fecha = this.Severidad.fecha.toString()
        fecha = fecha.substr(0,10)
        fecha = fecha.replace("-","")
        fecha = fecha.replace("-","")
        console.log("form",this.Severidad)
        let lote= this.Severidad.lote.toString()

        if(this.Severidad.desdeCama == null &&  this.Severidad.hastaCama == null){
          
          this.desdeCama=""
          this.hastaCama=""

          this._CultivoService._getPYEflores(fecha, this.empresa, this.sede, lote, this.desdeCama, this.hastaCama, 
                                              this.Severidad.plagayenfermedad).subscribe(
              res=>{debugger
                    this.data= res.floresC
                    console.log("este es el tamaño de la data", this.data.length)

                    let sumatoria=0
                    this.data.forEach(element => {
                      
                      if(element.individuos) {
                        sumatoria = sumatoria + element.individuos
                      }else{
                        sumatoria = sumatoria
                      }
                    });

                      console.log("la suma",sumatoria)
                        
                          this.severidad = ((sumatoria/(this.data.length))).toFixed(2)
                          this.loading=false
                          this._severidad.severidad= this.severidad
                          this._severidad.empresa= this.empresa
                          this._severidad.sede= this.sede
                          this._severidad.lote= lote
                          this._severidad.fecha= fecha
                          this._severidad.plagayenfermedad= this.Severidad.plagayenfermedad
                          this._severidad.rango= "Todas las camas muestreadas"

                          if((this.severidad != 0) && (this.severidad != null) ){
                            this.habilitarBoton=true
                          }
 
              
                  })
                  
                  this.error=false
        }else{
          debugger
          this.desdeCama=this.Severidad.desdeCama-1
          this.hastaCama=this.Severidad.hastaCama+1

            this._CultivoService._getPYEflores(fecha, this.empresa, this.sede, lote, this.desdeCama, this.hastaCama, 
                                                this.Severidad.plagayenfermedad).subscribe(
                res=>{
                  this.data=  res.floresC; 
                  console.log(res.floresC);
                  console.log("aca esta la data",this.data)

                  let sumatoria=0
                  this.data.forEach(element => {
                      if(element.individuos) {
                        sumatoria = sumatoria + element.individuos
                      }else{
                        sumatoria = sumatoria
                      }
                  });

                
                  this.severidad = ((sumatoria/(this.data.length))).toFixed(2)
                  this.loading=false
                  
                  this._severidad.severidad= this.severidad
                  this._severidad.empresa= this.empresa
                  this._severidad.sede= this.sede
                  this._severidad.lote= lote
                  this._severidad.fecha= fecha
                  this._severidad.plagayenfermedad= this.Severidad.plagayenfermedad
                  this._severidad.rango= (this.desdeCama + 1) + " - " + (this.hastaCama - 1)
                
                  if((this.severidad != 0) && (this.severidad != null) ){
                    this.habilitarBoton=true
                    
                  }
                })
        }
        
        this.error=false

     }else{
        this.error=true
     }
  }

  guardarResultado(){
      this._CultivoService.saveSeveridad(this._severidad).subscribe(res=>{
        alert("Severidad guardada correctamente")
        this.habilitarBoton=false
        this.DefaultDate()
      })
  }

  getSeveridad(dateBefore:string, dateAfter:string, empresa:string, sede:string){debugger
    this._CultivoService.getSeveridad(dateBefore, dateAfter, empresa, sede).subscribe((res:any)=>{
      this.ObtenerSeveridad= res.severidadStored
      this.dataSourceSeveridad = new MatTableDataSource(this.ObtenerSeveridad);
    })
  }

  public fechaIngresada(){

        this._variablesGlobales.dateBefore=this._dateBefore
        this._variablesGlobales.dateAfter=this._dateAfter

         let datebef=this._variablesGlobales.getdateBefore()
        
         let dateaft=this._variablesGlobales.getdateAfter()

         datebef=datebef.substr(0,8)
         dateaft=dateaft.substr(0,8)

         this.getSeveridad(datebef, dateaft, this.empresa, this.sede)
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

    this.getSeveridad(datebef, dateaft, this.empresa, this.sede)
    
  }

}
