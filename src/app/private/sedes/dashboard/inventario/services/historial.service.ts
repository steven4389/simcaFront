import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {historial} from '../models/historial';
import {Global} from '../../../../../services/global';
import {variablesGlobales} from '../../../../services/variablesGlobales'


@Injectable({
  providedIn: 'root'
})
export class HistorialService {
public url: string; 

  constructor(private _httpclient:HttpClient, 
              private _variablesGlobales:variablesGlobales ) { 

    this.url= Global.url;
  }

  saveRegistro(_historial:historial): Observable<any>{
    
      let params = JSON.stringify(_historial);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      
      return this._httpclient.post(this.url + 'save-registro', params, {headers: headers});
   }

   eliminarHistorial(empresa, sede){
     
       let headers = new HttpHeaders().set('Content-Type', 'application/json');
       
       return this._httpclient.delete(`${this.url}borrar-historial?empresa=${empresa}&sede=${sede}`, {headers:headers});       
   }

   query(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
     try {
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpclient.get(`${this.url}consulta?dateBefore=${dateBefore}&dateAfter=${dateAfter}
            &empresa=${empresa}&sede=${sede}`, {headers:headers});
        // return this._httpclient.get(this.url+'consulta'+ '?dateBefore=' + dateBefore + '&dateAfter='+ dateAfter , {headers:headers});
     } catch (error) {
       console.log(error); 
     }
     
   }

}



