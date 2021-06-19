import { Component, OnInit } from '@angular/core';
import {CultivoService} from '../../services/cultivo.service';
import {floresPYE} from '../../models/floresPYE';
import {MatTableDataSource} from '@angular/material';
import {variablesGlobales} from '../../../../../services/variablesGlobales';
import {fechas} from '../../../../../../common/fechas'

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  public fecha=new Date();
  public lote:number =null;
  public sede='';
  public empresa='';
  public role=[];
  public dateBefore=new Date();
  public dayOfMonth = this.dateBefore.getDate();
  public dateAfter=new Date();
  public Fecha='';

  public displayedColumnsPYE: string[] = ['fecha', 'plagayenfermedad', 'variedad', 'sitio', 'cama', 'lote', 'individuos'];
  public dataSourcefloresPYE :MatTableDataSource<any>;
  public floresPYE:floresPYE[];

  constructor(private _CultivoService:CultivoService, 
              private _variablesGlobales: variablesGlobales,
              private _fechas: fechas) { }

  ngOnInit() {
    let roleArray= localStorage.getItem('role')
    this.role= JSON.parse(roleArray);
  
    if(this.role[0] =="admin"){
      this.sede = localStorage.getItem('sede')
    }else{debugger
       let temp = localStorage.getItem('sede')
       
       temp=temp.substr(1,temp.length-2)
       
       this.sede = temp

    }
    this.empresa = localStorage.getItem('empresa')

    //this.DefaultDate()
  }


  public DefaultDate(){
    
    // this.dayOfMonth = this.dateBefore.getHours(); //estas 2 lineas son para 
    // this.dateBefore.setHours(this.dayOfMonth - 24);//saber la fecha de un dia antes
    // this._variablesGlobales.dateBefore=this.dateBefore  
    // this.dateAfter.setHours(this.dayOfMonth +1);    
    // this._variablesGlobales.dateAfter=this.dateAfter
    // let datebef=this._variablesGlobales.getdateBefore()
    
    // let dateaft=this._variablesGlobales.getdateAfter()
    // let fechas=[]
    // fechas[0]=datebef;
    // fechas[1]=dateaft;

    // localStorage.setItem('fechaObservaciones', JSON.stringify(fechas));

    // this.getFloresPYE(datebef, dateaft)
  }

 public buscar(){
   
  let fecha=this._fechas.getCadenaFechaSinHoraHTML(this.fecha);
  this.Fecha=fecha;
  this._CultivoService.__getPYEflores(fecha, this.empresa, this.sede, this.lote).subscribe(
    (response:any)=>{
        console.log(response)

        response.plagasYenfermedades.forEach((elemento, index) =>{
          response.plagasYenfermedades[index].fecha= response.plagasYenfermedades[index].fecha.slice(0, 4) + "-"+ response.plagasYenfermedades[index].fecha.slice(4);
          response.plagasYenfermedades[index].fecha= response.plagasYenfermedades[index].fecha.slice(0, 7) + "-"+ response.plagasYenfermedades[index].fecha.slice(7);
          response.plagasYenfermedades[index].fecha= response.plagasYenfermedades[index].fecha.slice(0, 10) + " "+ response.plagasYenfermedades[index].fecha.slice(10);
          response.plagasYenfermedades[index].fecha= response.plagasYenfermedades[index].fecha.slice(0, 13) + ":"+ response.plagasYenfermedades[index].fecha.slice(13);
  
          this.floresPYE= response.plagasYenfermedades
          })

          this.dataSourcefloresPYE = new MatTableDataSource(this.floresPYE);

  })
  

 }

}


// public getFloresPYE(dateB:string, dateA:string){debugger
//   this._CultivoService.getPYEflores(dateB, dateA, this.empresa, this.sede).subscribe(
//     response=>{debugger

//         response.floresC.forEach((elemento, index) =>{
//             response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 4) + "-"+ response.floresC[index].fecha.slice(4);
//             response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 7) + "-"+ response.floresC[index].fecha.slice(7);
//             response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 10) + " "+ response.floresC[index].fecha.slice(10);
//             response.floresC[index].fecha= response.floresC[index].fecha.slice(0, 13) + ":"+ response.floresC[index].fecha.slice(13);
//             this.floresPYE= response.floresC
//          })
//         //this.floresPYE= response.floresC
//       this.dataSourcefloresPYE = new MatTableDataSource(this.floresPYE);
//       localStorage.setItem('floresPYE', JSON.stringify(this.floresPYE));
      
//     }
//   )
// }