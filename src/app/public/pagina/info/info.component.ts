import { Component, OnInit } from '@angular/core';
import {variablesGlobales} from '../../../private/services/variablesGlobales';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})


export class InfoComponent implements OnInit {
  public rutaPagina=""

  constructor(private _variablesGlobales:variablesGlobales) { }

  ngOnInit() {
    this.rutaPagina=this._variablesGlobales.getRutaPagina()
    
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    console.log('Back button pressed');
  }

  
}
