import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getData(lon:number, lat:number) {
    return this.http.get(`${environment.BASE_URL}lat=${lat}&lon=${lon}&units=metric`).toPromise();
  }
}
