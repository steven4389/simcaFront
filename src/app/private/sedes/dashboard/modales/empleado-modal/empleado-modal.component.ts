import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {TrabajadoresService} from '../../empleados/services/trabajadores.service'
import {variablesGlobales} from '../../../../services/variablesGlobales';
import {trabajadores} from '../../empleados/models/trabajadores';

@Component({
  selector: 'app-empleado-modal',
  templateUrl: './empleado-modal.component.html',
  styleUrls: ['./empleado-modal.component.css']
})
export class EmpleadoModalComponent implements OnInit {
  public loading:boolean
  public empresa=''
  public sede= ''
  public error=false
  public Trabajadores:trabajadores={ _id:"", nombre:"", dependencia:"", cedula:"", codigo:"", empresa:"", sede:""};


  constructor(public dialogRef: MatDialogRef<EmpleadoModalComponent>, private _trabajadoresService:TrabajadoresService,
              public _variablesGlobales:variablesGlobales) { 
          this.loading=false
  }

  ngOnInit() {
    this.empresa= localStorage.getItem('empresa')
    this.sede = localStorage.getItem('sede')
  }

  registrar(form){
    this.loading=!this.loading
    if(form.valid){debugger
      this.Trabajadores.empresa=this.empresa
      this.Trabajadores.sede=this.sede
      this._trabajadoresService.saveRegistro(this.Trabajadores).subscribe(
        response=>{this.loading=!this.loading
          alert("El empleado(a) " + this.Trabajadores.nombre + " con el codigo " + this.Trabajadores.codigo +"," +
                " fue ingresado(a) correctamenete")
          this.dialogRef.close();
      },
      error=>{
        console.log(<any>error);
      })
    }else{
      this.error=true
    }
    
  }

  cerrar(){
    this.dialogRef.close();
  }

}
