import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Theater } from './theaters/theaters.component';

@Injectable({
  providedIn: 'root'
})
export class TheatersDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  public getTheaters(): Promise<Theater[]> {
    const url: string= this.apiBaseUrl + "/theaters";
    
    return this.http.get(url).toPromise()
                .then(response => {console.log(response); response as Theater[]})
                .catch(this.handleError);
  }

  public getTheater(theaterId: string): Promise<Theater> {
    const url: string= this.apiBaseUrl + "/theaters/" + theaterId;
    
    return this.http.get(url).toPromise()
                .then(response => {console.log(response); response as Theater})
                .catch(this.handleError);
  }
  public getTheaterbyLocation(lat:number,long:number,location:number): Promise<Theater>{
    const url: string = this.apiBaseUrl + "/theaters/"
    const http = new HttpParams();
    http.append('lat',lat);
    http.append('long',long);
    http.append('location',location);
    return this.http.get(url,{params:http}).toPromise()
          .then(response => response as Theater[])
          .catch(this.handleError)
  }

  private handleError(error: any):Promise<any> {
    return Promise.reject(error.message || error);
  }
}
