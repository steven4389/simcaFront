export class fechas {
    public fecha=[];

    getCadenaFechaHTML(date){debugger
        this.fecha=[];
        
        this.fecha.push(date.substr(0,4));
        this.fecha.push(date.substr(5,2));
        this.fecha.push(date.substr(8,2));
        this.fecha.push(date.substr(11,2));
        this.fecha.push(date.substr(14,2));

        let cadena=this.fecha.toString()
        cadena = cadena.replace(',', '');
        cadena = cadena.replace(',', '');
        cadena = cadena.replace(',', '');
        cadena = cadena.replace(',', '');
        
        
    return cadena;
        
    }

    getCadenaFechaSinHoraHTML(date){
        this.fecha=[];
        
        this.fecha.push(date.substr(0,4));
        this.fecha.push(date.substr(5,2));
        this.fecha.push(date.substr(8,2));
        

        let cadena=this.fecha.toString()
        cadena = cadena.replace(',', '');
        cadena = cadena.replace(',', '');
        
        
        
    return cadena;
        
    }

    getCadenaFecha(date: Date){
        this.fecha=[];
        var cadena = date.toString();

        this.fecha.push(cadena.substr(11,4));
        this.fecha.push(cadena.substr(4,3));
        this.fecha.push(cadena.substr(8,2));
        this.fecha.push(cadena.substr(16,2));
        this.fecha.push(cadena.substr(19,2));

    //el mes aparece en letras (Nov, Dec... etc)
    //se cambia a numeros 
    //--------------------------------------
    switch (this.fecha[1]) {
    case "Jan":
        this.fecha[1] = "01";
        break;
    case "Feb":
        this.fecha[1] = "02";
        break;
    case "Mar":
        this.fecha[1] = "03";
        break;
    case "Apr":
        this.fecha[1] = "04";
        break;
    case "May":
        this.fecha[1] = "05";
        break;
    case "Jun":
        this.fecha[1] = "06";
        break;
    case "Jul":
        this.fecha[1] = "07";
        break;
    case "Aug":
        this.fecha[1] = "08";
        break;
    case "Sep":
        this.fecha[1] = "09";
        break;
    case "Oct":
        this.fecha[1] = "10";
        break;
    case "Nov":
        this.fecha[1] = "11";
        break;
    case "Dec":
        this.fecha[1] = "12";
        break;
    }
    //---------

    //despues de castiar el vector a string
    //hay que quitarle las comas
    cadena=this.fecha.toString()
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    
    return cadena;
    }

    ChangeDateFormat(myDate: Date){
    this.fecha=[];  
    
    var cadena = myDate.toString();
    this.fecha.push(cadena.substr(11,4));
    this.fecha.push(cadena.substr(4,3));
    this.fecha.push(cadena.substr(8,2));
    this.fecha.push(cadena.substr(16,2));
    this.fecha.push(cadena.substr(19,2));

    //el mes aparece en letras (Nov, Dec... etc)
    //se cambia a numeros 
    //--------------------------------------
    switch (this.fecha[1]) {
    case "Jan":
        this.fecha[1] = "01";
        break;
    case "Feb":
        this.fecha[1] = "02";
        break;
    case "Mar":
        this.fecha[1] = "03";
        break;
    case "Apr":
        this.fecha[1] = "04";
        break;
    case "May":
        this.fecha[1] = "05";
        break;
    case "Jun":
        this.fecha[1] = "06";
        break;
    case "Jul":
        this.fecha[1] = "07";
        break;
    case "Aug":
        this.fecha[1] = "08";
        break;
    case "Sep":
        this.fecha[1] = "09";
        break;
    case "Oct":
        this.fecha[1] = "10";
        break;
    case "Nov":
        this.fecha[1] = "11";
        break;
    case "Dec":
        this.fecha[1] = "12";
        break;
    }
    //---------

    //despues de castiar el vector a string
    //hay que quitarle las comas
    cadena=this.fecha.toString()
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    
    return cadena;    
  }

    separadores(response, prop){
         
         let vector = response
         let propiedad = prop
         
            
            vector.forEach((elemento, index) =>{

                elemento[prop]=elemento[prop].slice(0, 4) + "-" + elemento[prop].slice(4);
                elemento[prop]=elemento[prop].slice(0, 7) + "-" + elemento[prop].slice(7);
                elemento[prop]=elemento[prop].slice(0, 10) + " " + elemento[prop].slice(10);
                elemento[prop]=elemento[prop].slice(0, 13) + ":" + elemento[prop].slice(13);
                vector[index]=elemento
                
            });
            return vector
    }

}