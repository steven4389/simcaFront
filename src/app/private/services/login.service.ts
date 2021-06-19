import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Global} from '../../services/global';

@Injectable()
export class LoginService {
public url: string; 

  constructor(private http: HttpClient) {
    this.url= Global.url;
  }

   login(body:any){
     
     return this.http.post(this.url +'login', body,{
       observe:'body'
     });
   }

    getUserName() {
    return this.http.get(this.url+ 'username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

}



