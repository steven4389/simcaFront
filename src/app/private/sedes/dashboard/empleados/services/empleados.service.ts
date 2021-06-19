import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Global} from '../../../../../services/global';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  public url: string; 

  constructor(private _httpclient:HttpClient) { 
    this.url= Global.url;
  }

  getEmpleados():Observable<any>{debugger
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this._httpclient.get(this.url+'obtener', {headers:headers});
   }

   query(dateBefore: string, dateAfter: string, empresa:string, sede:string): Observable<any>{
     try {
        debugger
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
        return this._httpclient.get(this.url+'obtener'+ '?dateBefore=' + dateBefore + 
                '&dateAfter='+ dateAfter + '&empresa='+ empresa  + '&sede='+ sede, {headers:headers});
     } catch (error) {
       console.log(error); 
     }

  }
}
