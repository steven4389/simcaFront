import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLogin:boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  showFiller = false;

  constructor(private _router:Router, private _activatedRoute: ActivatedRoute) { }
  
    

  ngOnInit() {
 
  }


  onClickLogout(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  moveCultivo(){
    this._router.navigate(['./cultivo'], { relativeTo: this._activatedRoute });      
  }

  moveEmpleados(){
      this._router.navigate(['./empleados'], { relativeTo: this._activatedRoute });
  }

  moveFinanzas(){
    debugger
      this._router.navigate(['./finanzas'], { relativeTo: this._activatedRoute });
  }

}
