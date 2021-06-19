import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Global} from '../../../../../services/global';
import {trabajadores} from '../models/trabajadores';

@Injectable()
export class TrabajadoresService {
public url: string; 

  constructor(private http: HttpClient, private _httpclient:HttpClient) {
    this.url= Global.url;
  }

  saveRegistro(_trabajadores:trabajadores): Observable<any>{
    
     let params = JSON.stringify(_trabajadores);
     let headers = new HttpHeaders().set('Content-Type', 'application/json');
     debugger
     return this._httpclient.post(this.url + 'trabajadorNuevo', params, {headers: headers});
  }

  getTrabajadores(empresa: string, sede: string):Observable<any>{debugger
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    //return this._httpclient.get(this.url+'insumos', {headers:headers});
    return this._httpclient.get(`${this.url}trabajadores?empresa=${empresa}&sede=${sede}`, {headers:headers});
 }

 getTrabajador(id):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type', 'application/json'); 
   return this._httpclient.get(this.url+'trabajador/'+id, {headers:headers});
 }

 deleteTrabajador(id): Observable<any>{
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this._httpclient.delete(this.url+'trabajador/'+id, {headers:headers});
 }

  updateTrabajador(trabajador){debugger
    let params = JSON.stringify(trabajador);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpclient.put(this.url+'trabajador/'+trabajador._id, params, {headers: headers});
  }

}



