import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CultivoService } from '../../../cultivo/services/cultivo.service'
import { fechas } from '../../../../../../common/fechas'
import { floresCorte } from '../../../cultivo/models/floresCorte';
import { debug } from 'util';
//import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  public sede = ''
  public empresa = ''
  public role = []
  public dateBefore = new Date();
  public dayOfMonth = this.dateBefore.getDate();
  public dateAfter = new Date();
  public fecha: any = [];
  public incidencia: any = [];
  public fallo: boolean
  public BarChart = [];

  constructor(private _CultivoService: CultivoService, private _fechas: fechas) { }

  @ViewChild("barChart", { static: true }) canvas: ElementRef
  private Graph: ElementRef;

  public graph = {
    data: [{ x: [], y: [], type: 'bar' }],
    layout: {width: 600, height: 400, title: 'Incidencia Minador %'}
  };

  public torta = {
     data: [{
      values: [19, 26, 55],
      labels: ['Lote 1', 'Lote 2', 'Lote 3'],
      type: 'pie'
    }],
    
    layout: {
      height: 400,
      width: 600,
      title:'Incidencia de Minador'
    }
    
  };

  public barras = {
    data : [
      {
        x: ['Alfonso Ramirez', 'Argiro Gutierrez', 'Arturo Quintero'],
        y: [20, 14, 23],
        type: 'scatter'
      }
    ],
    layout: {
      height: 400,
      width: 600,
      title:'Rendimiento de Empleados'
    }
  }

  ngOnInit(): void {

    let roleArray = localStorage.getItem('role')
    this.role = JSON.parse(roleArray);

    if (this.role[0] == "admin") {
      this.sede = localStorage.getItem('sede')
    } else {
      debugger
      let temp = localStorage.getItem('sede')

      temp = temp.substr(1, temp.length - 2)

      this.sede = temp

    }
    this.empresa = localStorage.getItem('empresa')

    this.dayOfMonth = this.dateBefore.getHours(); //estas 2 lineas son para 
    this.dateBefore.setHours(this.dayOfMonth - 168);//saber la fecha de un dia antes
    this.dateAfter.setHours(this.dayOfMonth + 1);

    let dateBef:string = this._fechas.ChangeDateFormat(this.dateBefore)
    let dateAft:string = this._fechas.ChangeDateFormat(this.dateAfter)
    
    dateBef=dateBef.substr(0,8)
    dateAft=dateAft.substr(0,8)
    

    this._CultivoService.getIncidencia(dateBef, dateAft, this.empresa, this.sede).subscribe(
      (res:any) => {
        if (res.incidenciaStored.length > 0) {console.log("dfghjk" ,res)

           res.incidenciaStored.forEach((elemento, index) => {

            elemento.fecha=elemento.fecha.slice(0, 4) + "-"+ elemento.fecha.slice(4);
            elemento.fecha=elemento.fecha.slice(0, 7) + "-"+ elemento.fecha.slice(7);
            elemento.fecha=elemento.fecha.slice(0, 10) + " "+ elemento.fecha.slice(10);
            elemento.fecha=elemento.fecha.slice(0, 13) + "fecha"+ elemento.fecha.slice(13);

             this.fecha[index]= elemento.fecha
             this.incidencia[index]= elemento.incidencia

            });

            

            debugger
            this.graph.data[0].x=this.fecha
            this.graph.data[0].y=this.incidencia

          

        }else{debugger
          let fecha=[1,2,3,4,5,6,7]
            let incidencia=[5,8,2,1,5,4,10]
            
            this.graph.data[0].x=fecha
            this.graph.data[0].y=incidencia
        }
      }
      )

  }

  

}
