import { Component, OnInit } from '@angular/core';
import data from '../../assets/files/agencias.json';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetDataService } from '../pattern/get-data.service';

@Component({
  selector: 'app-display3',
  templateUrl: './display3.component.html',
  styleUrls: ['./display3.component.css']
})
export class Display3Component implements OnInit {
  submitted: boolean = false;
  updateAgenyFormGroup: FormGroup;
  nameAgencyFromControl: FormControl;
  directionAgencyFormControl: FormControl;
  districtAgencyFormControl: FormControl;
  latAgencyFormControl: FormControl;
  lonAgencyFormControl: FormControl;
  arrayLocation = [];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _getDataService: GetDataService,
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.updateFormControl();
    this.agencyDetail();
  }

  agencyDetail() {
    let idAgency = parseInt(localStorage.getItem('id'));
    let updatedAgency = JSON.parse(localStorage.getItem("agencia" + idAgency));
    if (updatedAgency != null) {
      this.updateAgenyFormGroup = this._fb.group({
        nameAgencyFromControl: [updatedAgency.nameAgencyFromControl],
        directionAgencyFormControl: [updatedAgency.directionAgencyFormControl],
        districtAgencyFormControl: [updatedAgency.districtAgencyFormControl],
        latAgencyFormControl: [updatedAgency.latAgencyFormControl],
        lonAgencyFormControl: [updatedAgency.lonAgencyFormControl],
      });
      this.arrayLocation.push({ lat: parseFloat(updatedAgency.lonAgencyFormControl), lng: parseFloat(updatedAgency.latAgencyFormControl) });
    } else {
      let memoryAgencies = JSON.parse(localStorage.getItem('agencies'));
      for (var i = 0; i < memoryAgencies.length; i++) {
        if (i == idAgency) {
          this.updateAgenyFormGroup = this._fb.group({
            nameAgencyFromControl: [memoryAgencies[i].agencia],
            directionAgencyFormControl: [memoryAgencies[i].direccion],
            districtAgencyFormControl: [memoryAgencies[i].distrito],
            latAgencyFormControl: [memoryAgencies[i].lat],
            lonAgencyFormControl: [memoryAgencies[i].lon],
          });
          this.arrayLocation.push({lat: memoryAgencies[i].lon, lng: memoryAgencies[i].lat});
        }
      }
    }
  }

  createFormControls() {
    this.nameAgencyFromControl = new FormControl();
    this.directionAgencyFormControl = new FormControl();
    this.districtAgencyFormControl = new FormControl();
    this.latAgencyFormControl = new FormControl();
    this.lonAgencyFormControl = new FormControl();
  }

  updateFormControl() {
    this.updateAgenyFormGroup = this._fb.group({
      nameAgencyFromControl: [''],
      directionAgencyFormControl: [''],
      districtAgencyFormControl: [''],
      latAgencyFormControl: [''],
      lonAgencyFormControl: [''],
    });
  }

  get f() {
    return this.updateAgenyFormGroup.controls;
  }

  submitUpdate() {
    this.submitted = true;
    if (this.updateAgenyFormGroup.valid) {
      var id = localStorage.getItem('id');
      var idAgency = "agencia" + id;
      localStorage.setItem(idAgency, JSON.stringify(this.updateAgenyFormGroup.value));
      var memoryAgencies = JSON.parse(localStorage.getItem('agencies'));
      for (var i = 0; i < memoryAgencies.length; i++) {
        if (i == parseInt(id)) {
          memoryAgencies[i].agencia = this.updateAgenyFormGroup.value.nameAgencyFromControl;
          memoryAgencies[i].direccion = this.updateAgenyFormGroup.value.directionAgencyFormControl;
          memoryAgencies[i].distrito = this.updateAgenyFormGroup.value.districtAgencyFormControl;
          memoryAgencies[i].lat = parseFloat(this.updateAgenyFormGroup.value.latAgencyFormControl);
          memoryAgencies[i].lon = parseFloat(this.updateAgenyFormGroup.value.lonAgencyFormControl);
        }
      }
      localStorage.setItem('agencies', JSON.stringify(memoryAgencies));
      this._router.navigateByUrl('/listaAgencias');
    }
  }

  //MAPS
  center: google.maps.LatLngLiteral = { lat: -12.067233, lng: -76.957802 };
  zoom = 5;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = this.arrayLocation;
}
