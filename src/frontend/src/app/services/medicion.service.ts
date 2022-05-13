import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';
import { HttpClient } from '@angular/common/http';

import { catchError, retry, pluck, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class MedicionService {
  
  
    constructor(private http: HttpClient) { }
  
    
    
    getMedicionesEnUnDispositivo(id:number):Promise<Medicion[]>{
      let url = `http://localhost:8000/medicion/${id}`;
      console.log(`url getMedicionesEnUnDispositivo: ${url}`);
      return this.http.get(url).toPromise().then((array_medicion:Medicion[])=>{
        console.log(`Mediciones logueadas: ${array_medicion}`)
        return array_medicion;
      });
    };

    
    
  }