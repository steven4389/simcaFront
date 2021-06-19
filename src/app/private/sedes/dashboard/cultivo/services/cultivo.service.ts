import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Global} from '../../../../../services/global';


interface severidad{
  fecha:string,
  severidad:number,
  empresa:string,
  sede:string
}

interface incidencia{
  fecha:string,
  incidencia:number,
  empresa:string,
  sede:string
}

@Injectable({
  providedIn: 'root'
})
export class CultivoService {
  public url: string; 

  constructor(private _httpclient:HttpClient ) {

    this.url= Global.url;
   }


  getEspeciesTrazabilidad(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}especiesTrazabilidad?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
  }


  getEspeciesPYE(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}especiesPYE?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
}

  getSiembraEspecies(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      debugger
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}especiesSiembra?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
}

 

  getFloresTrazabilidad(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}floresTrazabilidad?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
  }


  getFloresCorte(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}floresCorte?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
  }

  getloteCortado(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}floresCorteSistemaLoteCortado?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
  }

  //para la tabla normal
  getPYEflores(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      debugger
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}floresPYE?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
  }

  //para la incidencia
  _getPYEflores(fecha: string, empresa: string, sede:string, lote:string,
                desdeCama:string, hastaCama:string, plagayenfermedad:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}_floresPYE?fecha=${fecha}
          &empresa=${empresa}&sede=${sede}&lote=${lote}&desdeCama=${desdeCama}&hastaCama=${hastaCama}
          &plagayenfermedad=${plagayenfermedad}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
  }

  //para el reporte del ICA
  __getPYEflores(date: string, empresa: string, sede:string, lote:number): Observable<any>{
    try {
      debugger
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}__floresPYE?date=${date}
          &empresa=${empresa}&sede=${sede}&lote=${lote}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  
  }

  getSiembraFlores(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}floresSiembra?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  }

  getObservacionesCorte(dateBefore: string, dateAfter: string, empresa: string, sede:string): Observable<any>{
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}observaciones?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  }

  getMuestras(fecha: string, empresa: string, sede:string, lote:string){
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}muestras?fecha=${fecha}
          &empresa=${empresa}&sede=${sede}&lote=${lote}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  }

  saveSeveridad(_severidad:severidad){
    let params = JSON.stringify(_severidad);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    debugger
    return this._httpclient.post(this.url + 'severidad', params, {headers: headers});
  }

  getSeveridad(dateBefore: string, dateAfter: string, empresa: string, sede:string){
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}severidad?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  }

  saveIncidencia(_incidencia:incidencia){
    let params = JSON.stringify(_incidencia);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    debugger
    return this._httpclient.post(this.url + 'incidencia', params, {headers: headers});
  }

  getIncidencia(dateBefore: string, dateAfter: string, empresa: string, sede:string){
    try {
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._httpclient.get(`${this.url}incidencia?dateBefore=${dateBefore}&dateAfter=${dateAfter}
          &empresa=${empresa}&sede=${sede}`, {headers:headers});

    } catch (error) {
      console.log(error); 
    }
  }


  getFloresPlantasMadre(dateBefore: string, dateAfter: string, empresa: string, sede:string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpclient.get(`${this.url}floresSiembraPlantasMadres?dateBefore=${dateBefore}&dateAfter=${dateAfter}
        &empresa=${empresa}&sede=${sede}`, {headers:headers});
  }

  
   
}


