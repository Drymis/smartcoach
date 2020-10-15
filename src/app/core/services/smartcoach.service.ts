import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmartcoachService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getPitch() {
    return this.http.get(`${environment.serverAPI}/angular`).toPromise();
  }
}