import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import{Router, ActivatedRoute} from '@angular/router';
import {InsumosService} from '../../inventario/services/insumos.service';
import {variablesGlobales} from '../../../../services/variablesGlobales';
import {HistorialService} from '../../inventario/services/historial.service';
import {historial} from '../../inventario/models/historial';
import {fechas} from '../../../../../common/fechas';
import { UUID } from 'angular2-uuid';
import { SedeComponent } from '../../../sede.component';


interface insumos{
   _id:string,
   nombre:string,
   proveedor:string
   cantidad:number,
   unidadMedida:string,
   costo:number,
   empresa:string,
   sede:string,
   clasificacion:string
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [InsumosService]
})


export class ModalComponent {
  public role= []
  public loading:boolean
  public sede= ""
  public empresa=""
  public undef=false
  public opcionfecha:string=""
  public quieroFecha=false
  public uniEmpaque:number
  public isError = false;
  public negativo = false
  public title:string;
  public uso:string
  public Insumos:insumos={ _id:"",  nombre:"", clasificacion:"", proveedor:"", cantidad:null,  unidadMedida:"",  
                            costo:null, empresa:"", sede:""};

  public Historial:historial={ _id:"",  nombre:"", clasificacion:"", proveedor:"", cantidad:null,  
                              fecha:"",  unidadMedida:"", CostoUnidad:null, costo:null, lote:null,accion:"", empresa:"", sede:""};

  value=0
   public unidades = [
    {name: 'Unds'},
    {name: 'Kgs'},
    {name: 'grs'},
    {name: 'mgrs'},
    {name: 'Lbs'},
    {name: 'Lts'},
    {name: 'mlts'},
    {name: 'Onz'},
    {name: 'galón'}
  ];

  constructor(private _InsumosService:InsumosService,
              public dialogRef: MatDialogRef<ModalComponent>,
              private _variablesGlobales:variablesGlobales,
              private _HistorialService:HistorialService,
              private router: Router,
              // private _Historial: historial,
              private _fechas: fechas){
      
      this.loading=false
  }

  ngOnInit(){debugger
    
    this.empresa = localStorage.getItem('empresa')

    let roleArray= localStorage.getItem('role')
    this.role= JSON.parse(roleArray);
    
    if(this.role[0] =="empleadoFlores"){

       let temp = localStorage.getItem('sede')
       
       temp=temp.substr(1,temp.length-2)
       
       this.sede = temp
      
    }else{
      this.sede = localStorage.getItem('sede')
    }

     this.uso=this._variablesGlobales.getUso()
     if(this.uso == "eliminarHistorial"){
          this.title= "Eliminar Historial"
     }else{
          this.title= "Crear Insumo"
     }
  }



  eliminarHistorial(){
    this.loading=true
    this._HistorialService.eliminarHistorial(this.empresa, this.sede).subscribe(
      response => {
        if(response){
          this.dialogRef.close();
        }
        console.log(response);
      }, error =>{
        console.log(<any>error)
      })
    
    debugger
  }

  Cancelar(){
    this.dialogRef.close();
  }

  cerrar(){
    this.dialogRef.close();
  }

  opcionFecha(){
      this.quieroFecha=true
  }

  onSubmit(form){
    this.loading=true
    debugger
    console.log(this.opcionfecha)
    
    if(this.opcionfecha==undefined){
      this.undef=true
    }

    if(form.valid && this.Insumos.cantidad > 0 && this.Insumos.costo >0 && this.uniEmpaque > 0){
      
           let uuid = UUID.UUID();
           debugger
           this.Historial._id= uuid
           this.Historial.cantidad= this.Insumos.cantidad
           this.Historial.costo= this.Insumos.costo
           if(this.quieroFecha){
              let fecha = this._fechas.getCadenaFechaHTML(this.opcionfecha)
              this.Historial.fecha=fecha
           }else{
             this.Historial.fecha= this._fechas.getCadenaFecha(new Date())
           }
           this.Historial.nombre= this.Insumos.nombre
           this.Historial.proveedor= this.Insumos.proveedor
           this.Historial.unidadMedida= this.uniEmpaque +" "+ this.Insumos.unidadMedida
           this.Historial.accion= "Insumo Nuevo"
           //this.empresa.slice(0,1)
           this.Historial.empresa= this.empresa
           this.Historial.sede= this.sede
           this.Historial.clasificacion= this.Insumos.clasificacion
           this._HistorialService.saveRegistro(this.Historial).subscribe(
              response=>{
              
            },
            error=>{
              console.log(<any>error);
            }
        );
        
      
      debugger
      this.Insumos.unidadMedida= this.uniEmpaque +" "+ this.Insumos.unidadMedida  
      this.Insumos.empresa= this.empresa
      this.Insumos.sede= this.sede
      this._InsumosService.saveInsumo(this.Insumos).subscribe(
        response => {
          if(response){
                this.dialogRef.close();
          }
          
          console.log(response);
        },
        error =>{
          
        }
      )

      }else{
          this.isError= true
      }
    
  }

}