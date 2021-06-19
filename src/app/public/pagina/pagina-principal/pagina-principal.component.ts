import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute} from '@angular/router';
import {variablesGlobales} from '../../../private/services/variablesGlobales';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  constructor( private _activatedRoute: ActivatedRoute,
               public _variablesGlobales:variablesGlobales,
               private router: Router) { }

  ngOnInit() {
  }


  monitoreo(){
    this._variablesGlobales.rutaPagina="monitoreo"
    this.router.navigate(['../info'], { relativeTo: this._activatedRoute });    
  }

  inventario(){
    this._variablesGlobales.rutaPagina="inventario"
    this.router.navigate(['../info'], { relativeTo: this._activatedRoute });    
  }

  horas(){
    this._variablesGlobales.rutaPagina="horas"
    this.router.navigate(['../info'], { relativeTo: this._activatedRoute });      
  }
}
