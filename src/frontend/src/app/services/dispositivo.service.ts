import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../model/Medicion';

import { catchError, retry, pluck, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {


  //lista:Array<Dispositivo> = new Array<Dispositivo>();
  
  constructor(private http:HttpClient) {}
   
   getTodosLosDispositivos():Promise<Dispositivo[]>{
    return this.http.get("http://localhost:8000/dispositivo").toPromise().then((lista:Dispositivo[])=>{
      return lista;
    });
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

    public cambiarEstadoElectrovalvula(abrir_EV: Boolean, id: number){
      console.log("Cambiar estado electroválvula");
      let ruta_destino = null;
      if (abrir_EV){
        // Call ABRIR ELECTROVALVULA
        console.log(`http://localhost:8000/electrovalvula/abrir/${id}`)
        ruta_destino = (`http://localhost:8000/electrovalvula/abrir/${id}`)
      } else{
        // Call CERRAR ELECTROVALVULA
        console.log(`http://localhost:8000/electrovalvula/cerrar/${id}`)
        ruta_destino = (`http://localhost:8000/electrovalvula/cerrar/${id}`)
      }
      console.log("BEFORE PUT");
    return this.http.put(ruta_destino, null).toPromise().then(()=>{});
    }

    public agregarMedicion(medicion:Medicion){
      console.log("dispositivo.service.ts - agregarMedicion");
      return this.http.post(`http://localhost:8000/medicion`, {
        fecha:medicion.fecha, valor:medicion.valor, dispositivoId:medicion.dispositivoId
      }).toPromise().then((result)=>{ 
        return result; 
      });
    }
    
    
}
