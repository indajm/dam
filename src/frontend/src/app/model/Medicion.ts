export class Medicion{
    private _medicionId: number;
    private _fecha: Date; 
    private _valor: string;
    private _dispositivoId: number;

    constructor(medicionId,fecha,valor:string,dispositivoId){
        console.log("Constructor model for Medicion");
        this._medicionId=medicionId;
        this.fecha=fecha;
        this._valor=valor;
        this._dispositivoId=dispositivoId;
    }

    

    public get medicionId(): number {
        console.log("Constructor model for MedicionId");
        return this._medicionId;
    }
    public set medicionId(value: number) {
        this._medicionId = value;
    }

    public get fecha(): Date {
        return this._fecha;
    }
    public set fecha(value: Date) {
        this._fecha = value;
    }

    public get valor(): string {
        return this._valor;
    }
    public set valor(value: string) {
        this._valor = value;
    }
    
    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }
}