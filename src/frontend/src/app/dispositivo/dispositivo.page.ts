// Add information from detalleSensor.page.ts created by Brian Ducca

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';
import { DispositivoService } from '../services/dispositivo.service';
import * as moment from 'moment';


//
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
//


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})

export class DispositivoPage implements OnInit {

  public myChart;
  public dispositivo:Dispositivo;
  public medicion:Medicion;
  public idDispositivo:number;
  public idElectrovalvula:Number;
  public existenMediciones:Boolean;
  //
  private valorObtenido:number=0;
  private chartOptions;
  public boton_abrir:Boolean;
  //

  

  constructor(
    private router:ActivatedRoute, 
    private dispositivo_service:DispositivoService,
    private medicion_service:MedicionService,
    ) { 
      this.boton_abrir = true;
    }



  ngOnInit() {
    // idDispositivo is the identifier of the device that was chosen in localhost:8100
    this.idDispositivo = parseInt(this.router.snapshot.paramMap.get("id"));

    console.log("idDispositivo elegido: "+this.idDispositivo);
  }

  async cargarDispositivo(){
    console.log("CARGAR DISPOSITIVO");
    console.log("idDispositivo: "+this.idDispositivo);
    this.dispositivo = await this.dispositivo_service.getDispositivo((this.idDispositivo));
    this.medicion = await this.dispositivo_service.getUltimaMedicion(this.idDispositivo);
    
    console.log(`this.medicion.value: ${this.medicion[0].valor}`);
    this.idElectrovalvula = this.dispositivo.electrovalvulaId;
    console.log("idElectrovalvula: "+this.idElectrovalvula );
    if(this.medicion == null) {
      this.existenMediciones = false;
      console.log("No existen mediciones");
    } else {
      this.existenMediciones = true;
      
      // this.medicion[0].value is a STRING, so it has to be converted to an INTEGER (this is done using parseInt) so the chart can be updated correctly
      this.actualizarChart(parseInt(this.medicion[0].valor));
    }
  }


  // ABRIR ELECTROVALVULA: set apertura = true
  async abrirElectrovalvula(){
    console.log("dispositivo.page.ts -> abrir");
    this.dispositivo_service.cambiarEstadoElectrovalvula(true, this.dispositivo.electrovalvulaId);
    this.boton_abrir= false;
  }
  
  // CERRAR ELECTROVALVULA: set apertura = false
  async cerrarElectrovalvula(){
    console.log("dispositivo.page.ts -> cerrar");
    this.dispositivo_service.cambiarEstadoElectrovalvula(false, this.dispositivo.electrovalvulaId);
    let valor = Math.floor(Math.random()*30); // random value between 0 and 30
    console.log(`Valor random: ${valor}`)
    let fecha_actual = moment().format('YYYY-MM-DD hh:mm:ss')
    console.log(`Valor random: ${fecha_actual}`)
    //console.log(`Fecha actual: ${formatDate(fecha_actual)}`)
    //let fecha_actual = "2022-05-03 22:34:12"
    this.dispositivo_service.agregarMedicion(new Medicion(1, fecha_actual, valor.toString(), this.dispositivo.dispositivoId))
    this.boton_abrir = true;
    this.actualizarChart(valor);
    
  }

  ionViewWillEnter(){
    console.log("ION VIEW WILL ENTER")
    //
    this.generarChart();
    //
    this.cargarDispositivo();



  }

  actualizarChart(valorCentibares:number) {
    if(valorCentibares>= 30 && valorCentibares <= 100) {
      console.log("El suelo está seco. Debe regarse de inmediato");
    } else if ( valorCentibares >= 10 && valorCentibares < 30){
      console.log("El suelo está en CC");
    } else {
      console.log("El suelo está saturado");
    }

    // The following lines are moved from the constructor (in the file provided by Brian Ducca) to this place, so we can call it when it's necessary
    this.myChart.update({
      title:{text:this.dispositivo.nombre},
      series: [{
      name: 'kPA',
      data: [valorCentibares],
      tooltip: {
          valueSuffix: ' kPA'
      }
      }]});
  }

  generarChart() {
    console.log("GENERAR CHART");
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N° 1'
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}
