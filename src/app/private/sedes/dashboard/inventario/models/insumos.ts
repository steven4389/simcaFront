export class insumos{
    constructor(
        public _id:string,
        public nombre:string,
        public proveedor:string,
        public cantidad:number,
        public unidadMedida:string,
        public CostoUnidad:number,
        public costo:number,
        public empresa: string,
        public sede:string,
        public clasificacion:string
    ){}
}

