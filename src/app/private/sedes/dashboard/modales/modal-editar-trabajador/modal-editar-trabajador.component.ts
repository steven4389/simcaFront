import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {TrabajadoresService} from '../../empleados/services/trabajadores.service';
import {variablesGlobales} from '../../../../services/variablesGlobales';
import {trabajadores} from '../../empleados/models/trabajadores';
import {insumos} from '../../inventario/models/insumos';
import {InsumosService} from '../../inventario/services/insumos.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-modal-editar-trabajador',
  templateUrl: './modal-editar-trabajador.component.html',
  styleUrls: ['./modal-editar-trabajador.component.css']
})
export class ModalEditarTrabajadorComponent implements OnInit {
  public role=[]
  public modal=''
  public loading:boolean
  public empresa=''
  public sede= ''
  public error=false
  public Trabajadores:trabajadores={ _id:"", nombre:"", dependencia:"", cedula:"", codigo:"", empresa:"", sede:""};
  public Insumos:insumos={ _id:"", nombre:"", proveedor:"", cantidad:null, unidadMedida:"", CostoUnidad:null, 
                            costo:null, empresa:"", sede:"", clasificacion:""};

  public trabajadorAEditar:trabajadores
  public insumoAEditar:insumos
  public valor= "esto e un valor"
  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    dependencia: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required)
 });

 formularioInsumo = new FormGroup({
  nombre: new FormControl('', Validators.required),
  proveedor: new FormControl('', Validators.required),
  cantidad: new FormControl('', Validators.required),
  unidadMedida: new FormControl('', Validators.required),
  CostoUnidad: new FormControl('', Validators.required),
  costo: new FormControl('', Validators.required),
  clasificacion: new FormControl('', Validators.required),
});

 
  constructor(public dialogRef: MatDialogRef<ModalEditarTrabajadorComponent>, private _trabajadoresService:TrabajadoresService,
              private _InsumosService:InsumosService,
              public _variablesGlobales:variablesGlobales) { 
                
                this.loading=false
                
        }

  ngOnInit() {debugger
    this.modal=this._variablesGlobales.getTitulo()
    this.empresa= localStorage.getItem('empresa')

    let roleArray= localStorage.getItem('role')
    this.role= JSON.parse(roleArray);
    
    if(this.role[0] =="admin"){
      this.sede = localStorage.getItem('sede')
    }else{
       let temp = localStorage.getItem('sede')
       
       temp=temp.substr(1,temp.length-2)
       
       this.sede = temp

    }

    this.trabajadorAEditar= this._variablesGlobales.getTrabajadorAeditar()
    this.insumoAEditar= this._variablesGlobales.getinsumoAeditar()
    
    if(this.modal==""){
      this.formulario.setValue({
        nombre: this.trabajadorAEditar.nombre,
        dependencia: this.trabajadorAEditar.dependencia,
        cedula: this.trabajadorAEditar.cedula,
        codigo: this.trabajadorAEditar.codigo,
     });
    }else{
      this.formularioInsumo.setValue({
        nombre: this.insumoAEditar.nombre,
        proveedor: this.insumoAEditar.proveedor,
        cantidad: this.insumoAEditar.cantidad,
        unidadMedida: this.insumoAEditar.unidadMedida,
        CostoUnidad: this.insumoAEditar.CostoUnidad,
        costo: this.insumoAEditar.costo,
        clasificacion: this.insumoAEditar.clasificacion,
     });
    }
  }

  editar(){
    this.loading=true
    if(this.formulario.valid){
      debugger
      this.Trabajadores._id=this.trabajadorAEditar._id
      this.Trabajadores.empresa=this.empresa
      this.Trabajadores.sede=this.sede
      this.Trabajadores.nombre=this.formulario.controls.nombre.value
      this.Trabajadores.dependencia=this.formulario.controls.dependencia.value
      this.Trabajadores.cedula=this.formulario.controls.cedula.value
      this.Trabajadores.codigo=this.formulario.controls.codigo.value
      this._trabajadoresService.updateTrabajador(this.Trabajadores).subscribe(
        response=>{this.loading=false
          alert("El empleado(a) " + this.Trabajadores.nombre + " con el codigo " + this.Trabajadores.codigo +"," +
                " fue editado(a) correctamenete")
          this.dialogRef.close();
      },
      error=>{
        console.log(<any>error);
      })
    }else{debugger
      this.error=true
    }
    
  }

  editarInsumo(){
    this.loading=true
    if(this.formularioInsumo.valid){
      debugger
      this.Insumos._id=this.insumoAEditar._id
      this.Insumos.empresa=this.empresa
      this.Insumos.sede=this.sede
      this.Insumos.nombre=this.formularioInsumo.controls.nombre.value
      this.Insumos.proveedor=this.formularioInsumo.controls.proveedor.value
      this.Insumos.cantidad=this.formularioInsumo.controls.cantidad.value
      this.Insumos.unidadMedida=this.formularioInsumo.controls.unidadMedida.value
      this.Insumos.CostoUnidad=this.formularioInsumo.controls.CostoUnidad.value
      this.Insumos.costo=this.formularioInsumo.controls.costo.value
      this.Insumos.clasificacion=this.formularioInsumo.controls.clasificacion.value
      this._InsumosService.updateInsumo(this.Insumos).subscribe(
        response=>{this.loading=false
          alert("El insumo " + this.Insumos.nombre + " fue editado(a) correctamenete")
          this.dialogRef.close();
      },
      error=>{
        console.log(<any>error);
      })
    }else{debugger
      this.error=true
    }
    
  }

  

  cerrar(){
    this.dialogRef.close();
  }

}
