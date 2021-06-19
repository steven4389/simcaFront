import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
//import {insumos} from '../models/insumos';
import {Global} from '../../../../../services/global';
import {historial} from '../models/historial';

interface insumos{
   _id:string,
   nombre:string,
   proveedor:string,
   cantidad:number,
   unidadMedida:string,
   costo:number,
   clasificacion:string
}

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  public url: string; 
  

  constructor(private _httpclient:HttpClient ) {

    this.url= Global.url;
   }

   saveRegistro(_historial:historial): Observable<any>{
     
      let params = JSON.stringify(_historial);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      debugger
      return this._httpclient.post(this.url + 'save-registro', params, {headers: headers});
   }

   testService(){
     return 'probando';
   }

   saveInsumo(insumo:insumos): Observable<any>{
      let params = JSON.stringify(insumo);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this._httpclient.post(this.url + 'save-insumo', params, {headers: headers});
   }

   getInsumos(empresa: string, sede: string):Observable<any>{debugger
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      //return this._httpclient.get(this.url+'insumos', {headers:headers});
      return this._httpclient.get(`${this.url}insumos?empresa=${empresa}&sede=${sede}`, {headers:headers});
   }

   getInsumo(id):Observable<any>{
     let headers = new HttpHeaders().set('Content-Type', 'application/json'); 
     return this._httpclient.get(this.url+'insumo/'+id, {headers:headers});
   }

   deleteInsumo(id): Observable<any>{
     let headers = new HttpHeaders().set('Content-Type', 'application/json');
     return this._httpclient.delete(this.url+'insumo/'+id, {headers:headers});
   }

    updateInsumo(insumo){
      let params = JSON.stringify(insumo);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.put(this.url+'insumo/'+insumo._id, params, {headers: headers});
    }
}

