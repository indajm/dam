import { Component } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listaDispositivos:Dispositivo[];

  constructor(public servicio_dispositivo:DispositivoService) {}


  async cargarTodosLosDispositivos(){
    let lista = await this.servicio_dispositivo.getTodosLosDispositivos();
    this.listaDispositivos = lista;
  }

  ionViewDidEnter(){
    this.cargarTodosLosDispositivos();
  }

}
