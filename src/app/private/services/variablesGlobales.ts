import { Injectable } from '@angular/core';
import {insumos} from '../sedes/dashboard/inventario/models/insumos';
import {trabajadores} from '../sedes/dashboard/empleados/models/trabajadores';
import {fechas} from '../../common/fechas'

@Injectable()
export class variablesGlobales{
    public insumoAeditar:insumos
    public TrabajadorAeditar:trabajadores
    public titulo:string
    public isLogin:boolean
    public accion:string
    public dateBefore:Date
    public dateAfter:Date
    public uso:string
    public id:string
    public nombre:string
    public rutaPagina:string
    
    
    constructor(private _fechas:fechas){}

    getRutaPagina(){
        let data = this.rutaPagina
        this.rutaPagina= ""
        return data
    }

    getNombre(){
         let data = this.nombre
        this.nombre= ""
        return data
    }


    getId(){
        let data = this.id
        this.id= ""
        return data
    }
     
    getUso(){
        let data = this.uso
        this.uso= ""
        return data
    }

    getAccion(){
        return this.accion
    }

    getisLogin(){
        let data = this.isLogin
        this.isLogin= false
        return data
    }

    getTitulo(){
        let data = this.titulo
        this.titulo=""
        return data
    }

    getTrabajadorAeditar(){
        let data = this.TrabajadorAeditar
        this.TrabajadorAeditar=null
        return data
    }

    getinsumoAeditar(){
        let data = this.insumoAeditar
        this.insumoAeditar=null
        return data
    }

    getdateBefore(){
      return this._fechas.ChangeDateFormat(this.dateBefore)
    }

    getdateAfter(){
     return this._fechas.ChangeDateFormat(this.dateAfter)
    }
}