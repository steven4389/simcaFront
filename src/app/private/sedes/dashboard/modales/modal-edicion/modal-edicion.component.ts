import {Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TrabajadoresService} from '../../empleados/services/trabajadores.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule } from '@angular/material';
import {insumos} from '../../inventario/models/insumos';
import {trabajadores} from '../../empleados/models/trabajadores';
import {historial} from '../../inventario/models/historial';
import {InsumosService} from '../../inventario/services/insumos.service';
import {HistorialService} from '../../inventario/services/historial.service';
import {variablesGlobales} from '.././../../../services/variablesGlobales';
import {fechas} from '../../../../../common/fechas'


export interface datosAingresar {
  cantidad: number;
  costo: number;
  lote: number
}


@Component({
  selector: 'app-modal-edicion',
  templateUrl: './modal-edicion.component.html',
  styleUrls: ['./modal-edicion.component.css']
})
export class ModalEdicionComponent implements OnInit {
  public loading:boolean
  public sede= ""
  public role=[]
  public empresa=""
  public isError = false;
  public negativo = false
  public title:string;
  public Insumos:insumos;
  public Historial:historial={ _id:"",  nombre:"", clasificacion:"", proveedor:"", cantidad:null,  fecha:"",  
                                  unidadMedida:"", CostoUnidad:null, costo:null, accion:"", lote:null, empresa:this.empresa, sede:this.sede};
  public insumoParaEditar:insumos
  public trabajadorParaEditar:trabajadores
  public isumosForm:datosAingresar={cantidad:null, costo:null, lote:null}

  constructor(private _InsumosService:InsumosService, 
              private _TrabajadoresService:TrabajadoresService,
              private _variablesGlobales:variablesGlobales,
              private _HistorialService:HistorialService,
              private _fechas:fechas,
              public dialogRef: MatDialogRef<ModalEdicionComponent>,
              ) {this.loading=false }

  ngOnInit() {debugger
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
    this.title= this._variablesGlobales.getTitulo()
    this.insumoParaEditar=this._variablesGlobales.getinsumoAeditar()
    this.trabajadorParaEditar=this._variablesGlobales.getTrabajadorAeditar()
  }

 cerrar(){
    this.dialogRef.close();
  }

  onSubmit(form){debugger
    this.loading=true
       if(form.valid && this.isumosForm.cantidad > 0 && this.isumosForm.costo >0 && this.title=="Adicionar Cantidad"){
              
          
                    this.Historial.accion="Adición"

                    let currentDate = new Date();
                    this.insumoParaEditar.cantidad = this.insumoParaEditar.cantidad + this.isumosForm.cantidad 
                    
                    this.insumoParaEditar.costo = parseFloat((this.insumoParaEditar.costo + this.isumosForm.costo) .toFixed(2));  
                    
                    let fecha= this._fechas.getCadenaFecha(currentDate)
                    debugger
                    this.Historial._id=this.insumoParaEditar._id
                    this.Historial.nombre=this.insumoParaEditar.nombre
                    this.Historial.cantidad=this.isumosForm.cantidad
                    this.Historial.fecha=fecha
                    this.Historial.unidadMedida=this.insumoParaEditar.unidadMedida
                    this.Historial.costo=this.isumosForm.costo 
                    this.Historial.CostoUnidad=this.insumoParaEditar.CostoUnidad
                    this.Historial.proveedor=this.insumoParaEditar.proveedor
                    this.Historial.empresa=this.empresa
                    this.Historial.sede=this.sede
                    this.Historial.clasificacion=this.insumoParaEditar.clasificacion
                    this._HistorialService.saveRegistro(this.Historial).subscribe(
                          response=>{
                          
                        },
                        error=>{
                          console.log(<any>error);
                        }
                    );
                    debugger
                    

                    this._InsumosService.updateInsumo(this.insumoParaEditar).subscribe(
                      response=>{
                        if(response){
                            this.dialogRef.close();
                        }
                        
                      },
                      error=>{
                        console.log(<any>error);
                      }
                  );
  
                 
                  
       }else if(form.valid && this.title=="Extraer Cantidad" && this.isumosForm.cantidad > 0 
                && this.isumosForm.cantidad <= this.insumoParaEditar.cantidad){

                  
                          let currentDate = new Date();
                          this.Historial.accion="Extracción"
                          let variable=this.insumoParaEditar.cantidad
                          debugger
                        
                          this.insumoParaEditar.cantidad = this.insumoParaEditar.cantidad - this.isumosForm.cantidad 
                          this.insumoParaEditar.costo = parseFloat((this.insumoParaEditar.costo - (((this.insumoParaEditar.costo)/(variable))*this.isumosForm.cantidad)).toFixed(2))
                          
                          if(this.insumoParaEditar.cantidad < 0){
                              this.insumoParaEditar.cantidad=0
                          }

                            
                            this.Historial._id=this.insumoParaEditar._id
                            this.Historial.nombre=this.insumoParaEditar.nombre
                            this.Historial.cantidad=this.isumosForm.cantidad
                            this.Historial.fecha=this._fechas.getCadenaFecha(currentDate)
                            this.Historial.unidadMedida=this.insumoParaEditar.unidadMedida
                            this.Historial.costo=this.insumoParaEditar.CostoUnidad*this.isumosForm.cantidad
                            this.Historial.proveedor=this.insumoParaEditar.proveedor
                            this.Historial.CostoUnidad=this.insumoParaEditar.CostoUnidad
                            this.Historial.lote=this.isumosForm.lote
                            this.Historial.empresa=this.empresa
                            this.Historial.sede=this.sede
                            this.Historial.clasificacion=this.insumoParaEditar.clasificacion
                            console.log("aca",this.Historial)
                            
                            this._HistorialService.saveRegistro(this.Historial).subscribe( response=>{
                                
                              },
                              error=>{
                                console.log(<any>error);
                              }
                        );
                      

                      this._InsumosService.updateInsumo(this.insumoParaEditar).subscribe(
                        response=>{ 
                              if(response){
                                  this.dialogRef.close();
                              }
                              
                        },
                        error=>{
                          console.log(<any>error);
                        }
                    );
  
            
    
    }else if(this.title=="Eliminar un insumo"){
                    debugger
                    this.insumoParaEditar.nombre= this._variablesGlobales.getNombre()
                    let id= this._variablesGlobales.getId()
                    this._InsumosService.deleteInsumo(id).subscribe(
                      response=>{
                        if(response){
                            this.dialogRef.close();
                        }
                        
                      },
                      error=>{
                        console.log(<any>error)
                      }
                    );
        
            

    }else if(this.title=="Eliminar un Empleado"){

      debugger
      //this.trabajadorParaEditar.nombre= this._variablesGlobales.getNombre()
      let id= this._variablesGlobales.getId()
      this._TrabajadoresService.deleteTrabajador(id).subscribe(
        response=>{
          if(response){
              this.dialogRef.close();
          }
          
        },
        error=>{
          console.log(<any>error)
        }
      );

    }else{
      this.loading=false
      this.isError=true
    }
    

  }
}