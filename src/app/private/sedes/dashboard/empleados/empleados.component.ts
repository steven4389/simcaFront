import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {EmpleadosService} from './services/empleados.service';
import {TrabajadoresService} from './services/trabajadores.service';
import {ModalEdicionComponent} from '../modales/modal-edicion/modal-edicion.component';
import {variablesGlobales} from '../../../services/variablesGlobales';
import {empleados} from './models/empleados';
import {fechas} from '../../../../common/fechas';
import {ExcelService} from '../../dashboard/services/excel.service';
import {MatDialog, MatPaginator, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { map } from 'rxjs/operators';
import {EmpleadoModalComponent} from '../modales/empleado-modal/empleado-modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import {ModalEditarTrabajadorComponent} from '../modales/modal-editar-trabajador/modal-editar-trabajador.component'

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  deviceInfo = null;
  isMobile=false
  public loading:boolean
  public role=[]
public empresa=''
public sede=''
displayedColumns: string[] = ['cedula', 'dependencia', 'nombre', 'entrada1', 'salida1', 'entrada2', 'salida2', 'HorasTrabajadas'];
dataSource :MatTableDataSource<any>;
_displayedColumns: string[] = ['Empleado', 'Cedula', 'Codigo', 'Dependencia', 'editar'];
_dataSource: MatTableDataSource<any>;
public empleados:empleados[]
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

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: false }) paginator2: MatPaginator;              

applyFilter(filterValue: string) {  
    this.dataSource.filter = filterValue.trim().toLowerCase();
    debugger
}
  constructor(private _EmpleadosService:EmpleadosService, 
              private excelService:ExcelService, 
              private _variablesGlobales:variablesGlobales,
              private _fechas:fechas,
              public dialog: MatDialog,
              public _TrabajadoresService:TrabajadoresService,
              private deviceService: DeviceDetectorService) {

       this.epicFunction();                
       this.loading=false         

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
  this.sede = localStorage.getItem('sede')
  this.empresa = localStorage.getItem('empresa')

  let roleArray= localStorage.getItem('role')
  this.role= JSON.parse(roleArray);
  
   
    this.DefaultDate();
    this.getTrabajadores();
  }

  descargarExcel():void{
      
      let registros=JSON.parse(localStorage.getItem('registros'));
                  
      let Empleados=[{ID:"", entrada1:"", salida1:"", entrada2:"", salida2:""}]

      for (let i = 0; i < (registros).length; i++) {
          delete registros[i]._id
          delete registros[i].__v
          Empleados[i]= registros[i]
      }
      debugger
      this.excelService.exportAsExcelFile(Empleados, 'control_de_horas_trabajadas');
                
  }

  public DefaultDate(){debugger
    this.dayOfMonth = this.dateBefore.getHours(); //estas 2 lineas son para 
    this.dateBefore.setHours(this.dayOfMonth - 24);//saber la fecha de un dia antes
    this._variablesGlobales.dateBefore=this.dateBefore  
    this.dateAfter.setHours(this.dayOfMonth + 1);    
    this._variablesGlobales.dateAfter=this.dateAfter
    let datebef=this._variablesGlobales.getdateBefore()
    
    let dateaft=this._variablesGlobales.getdateAfter()
       
     this.getRegistros(datebef, dateaft, this.empresa, this.sede)
  }

  public fechaIngresada(){
    this.loading=true
        this._variablesGlobales.dateBefore=this.dateBefore
        this._variablesGlobales.dateAfter=this.dateAfter

         let datebef=this._variablesGlobales.getdateBefore()
        
         let dateaft=this._variablesGlobales.getdateAfter()
         
         this.getRegistros(datebef, dateaft, this.empresa, this.sede)
        
        debugger
  }

  EditarTrabajador(elemento):void{
    //this._variablesGlobales.titulo="Adicionar Cantidad"
    this._variablesGlobales.TrabajadorAeditar=elemento
    const dialogRef = this.dialog.open(ModalEditarTrabajadorComponent, {
      width: '420px',
      height: '450px'
      
    });
    debugger
    dialogRef.afterClosed().subscribe(result => {
      this.getTrabajadores();
      //let datebef=this._variablesGlobales.getdateBefore()
      //let dateaft=this._variablesGlobales.getdateAfter()
      //this.getHistorial(datebef, dateaft)
      
    });
    
  }

  getRegistros(dateB:string, dateA:string, empresa:string, sede:string){debugger

     this._EmpleadosService.query(dateB, dateA, empresa, sede).subscribe(response=>{debugger
        if(response.empleados){
            
    
              response.empleados.forEach((elemento, index) =>{
                  this.loading=false
                  if(elemento.salida1 == "0" && 
                     elemento.entrada2 == "0" &&
                     elemento.salida2 == "0"){
                       
                            elemento.entrada1 = "000000000000"
                            elemento.salida1 = "000000000000"
                            elemento.entrada2 = "000000000000"
                            elemento.salida2 = "000000000000"
                            response.empleados[index]=elemento
                      }

                    
              });
          
            
            this.empleados = this._fechas.separadores(response.empleados, 'entrada1')
            this.empleados = this._fechas.separadores(response.empleados, 'salida1')
            this.empleados = this._fechas.separadores(response.empleados, 'entrada2')
            this.empleados = this._fechas.separadores(response.empleados, 'salida2')

                          
              //this.empleados= response.empleados;
              
              localStorage.setItem('registros', JSON.stringify(this.empleados));  
              this.dataSource = new MatTableDataSource(this.empleados);
              this.dataSource.paginator = this.paginator;
            
        }
        error=>{
          console.log(<any>error);
        }
    });
  }

  empleadoNuevo(){
 
    this._variablesGlobales.titulo="Eliminar un insumo"
    const dialogRef = this.dialog.open(EmpleadoModalComponent, {
      width: '420px',
      height: '450px'
      
    });
    debugger
    dialogRef.afterClosed().subscribe(result => {
      this.getTrabajadores()
    });

  }

  deleteTrabajador(id, elemento){
    debugger
    this._variablesGlobales.id=id
    this._variablesGlobales.TrabajadorAeditar=elemento
    this._variablesGlobales.titulo="Eliminar un Empleado"
    const dialogRef = this.dialog.open(ModalEdicionComponent, {
      width: '420px',
      height: '350px'
      
    });
    debugger
    dialogRef.afterClosed().subscribe(result => {
      this.getTrabajadores()
    });
  }

  getTrabajadores(){
    debugger
    this._TrabajadoresService.getTrabajadores(this.empresa, this.sede).subscribe(
      response => {debugger
        console.log(this.sede)
          if(response.trabajador){
             
             this._dataSource = new MatTableDataSource(response.trabajador);
             this._dataSource.paginator = this.paginator2;
          }
      },
      error=>{
          console.log(<any>error);
      }
    );
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





