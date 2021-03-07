import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  baseURL:string = "../../assets/files/agencias.json";

  constructor(
    private _http: HttpClient
  ) { }

  public getJSON(): Observable<any> {
    return this._http.get(this.baseURL);
  }
}
