import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';



@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {

  public array_mediciones:Medicion[];
  public idDispositivo:number;

  constructor(
    private router:ActivatedRoute,
    private medicion_service:MedicionService
  ) { }

  ngOnInit() {
    
  }


  async cargarMediciones(id:number){
    console.log("Carga de tabla con mediciones históricas");
    console.log("idDispositivo: "+id)

    this.array_mediciones = await this.medicion_service.getMedicionesEnUnDispositivo(id);
    console.log(`this.array_mediciones: ${this.array_mediciones}`);
  }

  ionViewWillEnter(){
    let idDispositivo:number= parseInt(this.router.snapshot.paramMap.get('id'));
    console.log("idDispositivo elegido: "+this.idDispositivo);
    this.cargarMediciones(idDispositivo);
  }

}
