import { Component, OnInit } from '@angular/core';
import { CultivoService } from '../../services/cultivo.service';
import { fechas } from '../../../../../../common/fechas';


interface lote{
  loteInicial:number,
  loteFinal:number
}

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  public error:boolean=false
  public Filtro:boolean=false
  public Observaciones= []
  public vector= []
  public sede
  public empresa
  public observaciones=[]
  public Lote:lote={ loteInicial:null, loteFinal:null};

  constructor(private _CultivoService:CultivoService) { }

  ngOnInit() {

    this.sede = localStorage.getItem('sede')
    this.empresa = localStorage.getItem('empresa')

    let fechas = localStorage.getItem('fechaObservaciones')
    fechas= JSON.parse(fechas);
    
    this._CultivoService.getObservacionesCorte(fechas[0], fechas[1], this.empresa, this.sede).subscribe(response=>{
        debugger
      response.observacion.forEach((elemento, index) =>{
        elemento.fecha= elemento.fecha.slice(0, 4) + "-"+ elemento.fecha.slice(4);
        elemento.fecha= elemento.fecha.slice(0, 7) + "-"+ elemento.fecha.slice(7);
        elemento.fecha= elemento.fecha.slice(0, 10) + " "+ elemento.fecha.slice(10);
        elemento.fecha= elemento.fecha.slice(0, 13) + ":"+ elemento.fecha.slice(13);
        response.observacion[index].fecha=elemento.fecha
      })
      this.observaciones= response.observacion
      debugger
      console.log("observaciones",this.observaciones)
      localStorage.setItem("observaciones", JSON.stringify(this.observaciones))
    })
  }

  filtro(form){
    if(form.valid && this.Lote.loteInicial > 0 && this.Lote.loteFinal > 0 ){
      this.vector= []
      let observaciones= localStorage.getItem('observaciones')
      this.Observaciones = JSON.parse(observaciones);
      
      this.observaciones.forEach((element, index)=>{
  
        this.observaciones[index].lote = parseInt(this.observaciones[index].lote)
        let lote = this.observaciones[index].lote
  
          if((lote   >= this.Lote.loteInicial) && 
              ( lote  <= this.Lote.loteFinal)){
                
                let objeto= {Lote:"", fecha:"", Observacion:""}
               
                objeto.Lote=this.observaciones[index].lote
                objeto.fecha=this.observaciones[index].fecha
                objeto.Observacion=this.observaciones[index].observacion
                
                this.vector.push(objeto)
          }
  
      })
      
      this.Filtro=true
      this.error = false
    }else{
          this.error = true
    }
    
  }
}