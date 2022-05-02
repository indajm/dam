import { Injectable } from '@angular/core';
import { Log } from '../model/Log';
import { HttpClient } from '@angular/common/http';

import { catchError, retry, pluck, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class LogService {
  
  
    constructor(private http: HttpClient) { }
  
    
    
    getLogs(id:number):Promise<Log[]>{
      let url = `http://localhost:8000/dispositivo/${id}/log`;
      console.log(`url getLogs: ${url}`);
      return this.http.get(url).toPromise().then((array_logs:Log[])=>{
        console.log(`Logs: ${array_logs}`)
        return array_logs;
      });
    };
    
  }