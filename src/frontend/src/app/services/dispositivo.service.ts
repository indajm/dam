import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../model/Medicion';

import { catchError, retry, pluck, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {


  listado:Array<Dispositivo> = new Array<Dispositivo>();
  
  constructor(private http:HttpClient) {
    //constructor() {
    var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
    var disp2:Dispositivo= new Dispositivo(2,"Sensor 2","Cocina",2);
    var disp3:Dispositivo= new Dispositivo(3,"Sensor 3","Jardin Delantero",3);
    var disp4:Dispositivo= new Dispositivo(4,"Sensor 4","Living",4);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
    console.log("CONSTRUCTOR");
   }
   

   getDispositivo(id: number):Promise<Dispositivo>{
      console.log("getDispositivo - url: "+ `http://localhost:8000/dispositivo/${id}`);
      
      return this.http.get(`http://localhost:8000/dispositivo/${id}`).toPromise().then((disp:Dispositivo)=>{
        console.log("DISP 0: " + disp[0]);
        return disp[0];
      });
      
   }

    public getUltimaMedicion(id: number): Promise<Medicion> {
      const options = {
        observe: 'response' as const
      };
  
      return this.http
      .get<Medicion>(`http://localhost:8000/dispositivo/${id}/ultima-medicion`, options)
      .pipe(
        filter(resp => resp.status === 200),
        pluck('body'))
      .toPromise();
    }

}
