class anuncio{

    id: number;
    titulo: string;
    transaccion: string;
    descripcion: string;
    precio: number;

    constructor(obj: any){
        this.id = obj.id;
        this.titulo = obj.titulo;
        this.transaccion = obj.transaccion;
        this.descripcion = obj.descripcion;
        this.precio = obj.precio;
    }
}

export class anuncio_auto extends anuncio{

    num_puertas: number;
    num_KMs: number;
    potencia: number;

    constructor(obj: any){
        super(obj);        
        this.num_puertas = obj.num_puertas;
        this.num_KMs = obj.num_KMs;
        this.potencia = obj.potencia;
    }
}