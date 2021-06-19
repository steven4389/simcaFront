import { Component, OnInit } from '@angular/core';
import { CultivoService } from '../../services/cultivo.service';
//import { loteCortado } from '../../models/loteCortado';

@Component({
  selector: 'app-lote-cortado',
  templateUrl: './lote-cortado.component.html',
  styleUrls: ['./lote-cortado.component.css']
})
export class LoteCortadoComponent implements OnInit {
  public sede
  public empresa
  public loteCortado=[]

  constructor(public _CultivoService:CultivoService) { }

  ngOnInit() {
    this.sede = localStorage.getItem('sede')
    this.empresa = localStorage.getItem('empresa')

    let fechas = localStorage.getItem('fechaObservaciones')
    fechas= JSON.parse(fechas);
    
    this._CultivoService.getloteCortado(fechas[0], fechas[1], this.empresa, this.sede).subscribe(response=>{
        
      response.loteCortado.forEach((elemento, index) =>{
        elemento.fecha= elemento.fecha.slice(0, 4) + "-"+ elemento.fecha.slice(4);
        elemento.fecha= elemento.fecha.slice(0, 7) + "-"+ elemento.fecha.slice(7);
        elemento.fecha= elemento.fecha.slice(0, 10) + " "+ elemento.fecha.slice(10);
        elemento.fecha= elemento.fecha.slice(0, 13) + ":"+ elemento.fecha.slice(13);
        response.loteCortado[index].fecha=elemento.fecha
      })
      this.loteCortado= response.loteCortado
      
      
    })
  }

}
