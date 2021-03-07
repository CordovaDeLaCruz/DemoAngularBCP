import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import data from '../../assets/files/agencias.json';
import { GetDataService } from '../pattern/get-data.service';

@Component({
  selector: 'app-display2',
  templateUrl: './display2.component.html',
  styleUrls: ['./display2.component.css']
})
export class Display2Component implements OnInit {
  public agencies: any;
  public patternAgencies: any;
  private arrayLocations = [];
  private images = [
    '../../assets/img/i_agencia1.jpg',
    '../../assets/img/i_agencia2.jpg',
    '../../assets/img/i_agencia3.jpg',
    '../../assets/img/i_agencia4.jpg',
  ];

  constructor(
    private _router: Router,
    private _getDataService: GetDataService,
  ) { }

  ngOnInit(): void {
    this.getAgencies();
  }

  getAgencies(){
    let memoryAgencies = JSON.parse(localStorage.getItem('agencies'));
    if(memoryAgencies != null){
      this.patternAgencies = memoryAgencies;
        for (let i = 0; i < this.patternAgencies.length; i++) {
          this.arrayLocations.push({ lat: this.patternAgencies[i].lon, lng: this.patternAgencies[i].lat });
          let random = Math.floor(Math.random() * this.images.length);
          let img = this.images[random];
          this.patternAgencies[i]["src"] = img;
        }
        console.log(typeof(this.arrayLocations[0].lat));
    }else{
      this.getAgenciesJSON();
    }
  }

  getAgenciesJSON() {
    /*for(var i = 0; i < data.length; i++){
      this.arrayLocations.push({lat: data[i].lon, lng: data[i].lat});
      let random = Math.floor(Math.random() * this.images.length);
      let img = this.images[random];
      data[i]["src"] = img;
    }
    this.agencies = data;*/
    this._getDataService.getJSON().subscribe(
      res => {
        this.patternAgencies = res;
        for (let i = 0; i < this.patternAgencies.length; i++) {
          this.arrayLocations.push({ lat: this.patternAgencies[i].lon, lng: this.patternAgencies[i].lat });
          let random = Math.floor(Math.random() * this.images.length);
          let img = this.images[random];
          this.patternAgencies[i]["src"] = img;
        }
        localStorage.setItem('agencies', JSON.stringify(this.patternAgencies));
      }
    )
  }

  saveIdAgency(i: string) {
    localStorage.setItem('id', i);
    this._router.navigateByUrl('/detalleAgencia');
  }

  //MAPS
  center: google.maps.LatLngLiteral = { lat: -12.067233, lng: -76.957802 };
  zoom = 5;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = this.arrayLocations;

}
