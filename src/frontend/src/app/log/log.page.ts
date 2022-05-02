import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from '../model/Log';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  array_logs:Log[];
  constructor(private router:ActivatedRoute, public service_logs:LogService) { }

  ngOnInit() {
  }

  async ImprimoLogs(id:number){
    let arrayL= await this.service_logs.getLogs(id);
    this.array_logs=arrayL;
  }

  ionViewWillEnter() {
    let idDispositivo= this.router.snapshot.paramMap.get('id');
    console.log(`idDispositivo Logs:${idDispositivo}`)
    this.ImprimoLogs(Number.parseInt(idDispositivo));

  }

}
