export class ResponseData {

   role: string;
   username: string;
   empresa: string
   sedes: Array<any>

   constructor( data:
      {
         role?: string,
         username?: string
         empresa?: string
         sedes?: Array<any>
      }
   ){
      this.role = data.role;
      this.username = data.username;
      this.empresa = data.empresa;
      this.sedes =  data.sedes;
   }

}