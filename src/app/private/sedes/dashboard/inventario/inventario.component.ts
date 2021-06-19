import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {MatDialog} from '@angular/material';
import {ModalComponent} from '../modales/modal/modal.component';
import {ModalEdicionComponent} from '../modales/modal-edicion/modal-edicion.component';
import {insumos} from './models/insumos';
import {historial} from './models/historial';
import {InsumosService} from './services/insumos.service';
import {HistorialService} from './services/historial.service';
import {variablesGlobales} from '../../../services/variablesGlobales';
import {ExcelService} from '../services/excel.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import {ModalEditarTrabajadorComponent} from '../modales/modal-editar-trabajador/modal-editar-trabajador.component'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [InsumosService, HistorialService]
})
export class InventarioComponent implements OnInit {
  
  deviceInfo = null;
  isMobile=false
  public loading:boolean
  public sede=''
  public empresa=''
  public role=[]
  public Historial:historial[]
  public Insumos: insumos[]
  public insumo: insumos[]
  public historial:historial[]
  public accion:string
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
  
  displayedColumns: string[] = ['fecha', 'lote','Insumo', 'clasificacion', 'proveedor', 'Cantidad', 'UnidadMedida', 'CostoUnidad', 'CostoTotal', 'accion'];
  dataSource :MatTableDataSource<any>;
 

 _displayedColumns: string[] = ['Insumo', 'clasificacion', 'proveedor', 'Cantidad', 'UnidadMedida', 'CostoUnidad', 'CostoTotal', 'editar'];
  _dataSource: MatTableDataSource<any>;

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: false }) paginator2: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this._dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  constructor(public dialog: MatDialog,
              private _InsumosService:InsumosService,
              public _variablesGlobales:variablesGlobales,
              private _HistorialService:HistorialService,
              private excelService:ExcelService, 
              private deviceService: DeviceDetectorService
              ) { 

                this.loading=false;
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

    let roleArray= localStorage.getItem('role')
    this.role= JSON.parse(roleArray);
    
    //this.role = localStorage.getItem('role')
    if(this.role[0] =="admin"){
      this.sede = localStorage.getItem('sede')
    }else{
       let temp = localStorage.getItem('sede')
       
       temp=temp.substr(1,temp.length-2)
       
       this.sede = temp

    }
    this.empresa = localStorage.getItem('empresa')
    this.getInsumos();
    this.DefaultDate()
    
  }

  openDialog(): void {
    this._variablesGlobales.uso="insertarNuevo"
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '420px',
      height: '650px'
    });
     
    dialogRef.afterClosed().subscribe(result => {debugger
      this.getInsumos();
      let datebef=this._variablesGlobales.getdateBefore()
      let dateaft=this._variablesGlobales.getdateAfter()
      this.getHistorial(datebef, dateaft)
      
    });
  }

  getInsumos(){
    
    this._InsumosService.getInsumos(this.empresa, this.sede).subscribe(
      response => {
        console.log("la response")
        console.log(response)
          if(response.insumo){
             //this.Insumos.= response.insumo;
            
            
            let vector=[]
            response.insumo.forEach((element, index) => {
             
               let objeto={_id:"", nombre:"", clasificacion:"", proveedor:"", cantidad:null, unidadMedida:"", CostoUnidad:null, costo:null}
              
                objeto._id= element._id
                objeto.nombre= element.nombre
                objeto.proveedor= element.proveedor
                objeto.cantidad= element.cantidad
                objeto.unidadMedida= element.unidadMedida
                objeto.clasificacion= element.clasificacion
                //objeto.CostoUnidad= parseFloat((element.costo/element.cantidad).toFixed(2));  
                objeto.costo= element.costo

                 if(element.cantidad==0){
                     objeto.CostoUnidad=0
                  }else{
                      objeto.CostoUnidad=parseFloat((element.costo/element.cantidad).toFixed(2));  
                  }

                vector[index]=objeto
            });

           this.Insumos=vector
             console.log(vector)
                debugger
             this._dataSource = new MatTableDataSource(this.Insumos);
             
             console.log(this._dataSource)
             
             this._dataSource.paginator = this.paginator2;
             localStorage.setItem('Insumos', JSON.stringify(this.Insumos));
            
          }
      },
      error=>{
          console.log(<any>error);
      }
    );
  }

  deleteInsumo(id, elemento){
    this._variablesGlobales.id=id
    this._variablesGlobales.insumoAeditar=elemento
    this._variablesGlobales.titulo="Eliminar un insumo"
    const dialogRef = this.dialog.open(ModalEdicionComponent, {
      width: '420px',
      height: '350px'
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getInsumos();
      let datebef=this._variablesGlobales.getdateBefore()
      let dateaft=this._variablesGlobales.getdateAfter()
      this.getHistorial(datebef, dateaft)          
    });
  }

  getInsumo(id){
    
    this._InsumosService.getInsumo(id).subscribe(
      response=>{
        this.insumo = response.insumo;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  ingresarCantidad(insumo):void{
    this._variablesGlobales.titulo="Adicionar Cantidad"
    this._variablesGlobales.insumoAeditar=insumo
    const dialogRef = this.dialog.open(ModalEdicionComponent, {
      width: '420px',
      height: '400px'
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getInsumos();
      let datebef=this._variablesGlobales.getdateBefore()
      let dateaft=this._variablesGlobales.getdateAfter()
      this.getHistorial(datebef, dateaft)
    });
    
  }

  extraerCantidad(insumo){
    this._variablesGlobales.titulo="Extraer Cantidad"
    this._variablesGlobales.insumoAeditar=insumo
    const dialogRef = this.dialog.open(ModalEdicionComponent, {
      width: '420px',
      height: '24rem'
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      this.getInsumos();
      let datebef=this._variablesGlobales.getdateBefore()
      let dateaft=this._variablesGlobales.getdateAfter()
      this.getHistorial(datebef, dateaft)
      
    });
  }

  eliminarHistorial(){
    
    this._variablesGlobales.uso="eliminarHistorial"
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '420px',
      height: '250px'
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      let datebef=this._variablesGlobales.getdateBefore()
      let dateaft=this._variablesGlobales.getdateAfter()
      this.getHistorial(datebef, dateaft)
      
    });
  }

  //esta es el rango de registros que aparece por defecto
  //las ultimas 24 horas
  public DefaultDate(){
    this.dayOfMonth = this.dateBefore.getHours(); //estas 2 lineas son para 
    this.dateBefore.setHours(this.dayOfMonth - 24);//saber la fecha de un dia antes
    this._variablesGlobales.dateBefore=this.dateBefore  
    this.dateAfter.setHours(this.dayOfMonth +1);    
    this._variablesGlobales.dateAfter=this.dateAfter
    let datebef=this._variablesGlobales.getdateBefore()
    
    let dateaft=this._variablesGlobales.getdateAfter()
            
    this.getHistorial(datebef, dateaft)
  }

  editarCantidad(elemento):void{
    this._variablesGlobales.titulo="editar cantidad"
    this._variablesGlobales.insumoAeditar=elemento
    const dialogRef = this.dialog.open(ModalEditarTrabajadorComponent, {
      width: '420px',
      height: '600px'
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getInsumos();
      
    });
    
  }

  public fechaIngresada(){
    this.loading=true
        this._variablesGlobales.dateBefore=this.dateBefore
        this._variablesGlobales.dateAfter=this.dateAfter

         let datebef=this._variablesGlobales.getdateBefore()
        
         let dateaft=this._variablesGlobales.getdateAfter()
         
         this.getHistorial(datebef, dateaft)
        
        
  }


  getHistorial(dateB:string, dateA:string){
     
     this._HistorialService.query(dateB, dateA, this.empresa, this.sede).subscribe(response=>{

       
        if(response){
          this.loading=false
          console.log(response)
          let vector = response.Historial
          
          vector.forEach((elemento, index) =>{
            
            let objeto={_id:"", fecha:"", nombre:"", lote:null, proveedor:"",  cantidad:null,  clasificacion:"", unidadMedida:"", costo:null, CostoUnidad:null, 
                             accion:""}

              elemento.fecha=elemento.fecha.slice(0, 4) + "-"+ elemento.fecha.slice(4);
              elemento.fecha=elemento.fecha.slice(0, 7) + "-"+ elemento.fecha.slice(7);
              elemento.fecha=elemento.fecha.slice(0, 10) + " "+ elemento.fecha.slice(10);
              elemento.fecha=elemento.fecha.slice(0, 13) + ":"+ elemento.fecha.slice(13);

              objeto._id=elemento._id
              objeto.cantidad=elemento.cantidad
              objeto.costo=elemento.costo
              objeto.nombre=elemento.nombre
              objeto.lote=elemento.lote
              objeto.proveedor=elemento.proveedor
              objeto.unidadMedida=elemento.unidadMedida
              objeto.fecha=elemento.fecha
              objeto.CostoUnidad=elemento.CostoUnidad
              objeto.accion=elemento.accion
              objeto.clasificacion=elemento.clasificacion
              
              // if(elemento.cantidad==0){
              //     objeto.costoUnidad=0
              // }else if (elemento.accion == "Adición"){
              //     objeto.costoUnidad=parseFloat((elemento.costo/elemento.cantidad).toFixed(2));  
              // }else if (elemento.accion == "Extracción"){
              //   objeto.costoUnidad=parseFloat((elemento.costo/elemento.cantidad).toFixed(2));  
              //   objeto.costo=objeto.costoUnidad*elemento.cantidad
              // }

              vector[index]=objeto
              
              
          });
                this.dataSource = new MatTableDataSource(vector);
                this.dataSource.paginator = this.paginator;
                localStorage.setItem('historial', JSON.stringify(vector));
            
          } 
        error=>{
          console.log(<any>error);
        }
    });
  }

  descargarExcel():void{
      
      let registros=JSON.parse(localStorage.getItem('historial'));
      
      let historial=[{Fecha:"", Nombre:"",  Proveedor:"", UnidadMedida:"", Costo:"", Clasificacion:"", Accion:""}]

      for (let i = 0; i < (registros).length; i++) {
          delete registros[i]._id
          //delete registros[i].__v
          historial[i]= registros[i]
      }
      
      this.excelService.exportAsExcelFile(historial, 'Inventario');
                
  }

  descargarInventario():void{
      
    let registros=JSON.parse(localStorage.getItem('Insumos'));
    console.log(registros)
    let insumos=[{Insumo:"", Clasificacion:"",  Proveedor:"", Unidades:"", UnidadEmpaque:"", CostoUnidad:"", CostoTotal:""}]

    for (let i = 0; i < (registros).length; i++) {
        delete registros[i]._id
        delete registros[i].__v
        insumos[i]= registros[i]
    }
    console.log(insumos)
    
    this.excelService.exportAsExcelFile(insumos, 'Inventario');
              
}

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
          break;
        case 1:
          !this._dataSource.paginator ? this._dataSource.paginator = this.paginator2 : null;
      }
    });
  }

}







              
     