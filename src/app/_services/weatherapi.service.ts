import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {throwError} from 'rxjs'
import {catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  constructor(private http: HttpClient) { }

  weatherData(cityname:any){
    let apikey = "f218098b6f1613e228eecfaac361074d"
    let url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&units=metric&appid='+apikey;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }
  

  hoursdata(lat:number, lng:number){
    let apikey2 = "5e7edc3878415b44233e6a471f76e73c"
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lng+'&exclude=minutely,current,alerts&units=metric&appid='+apikey2
    return this.http.get(url)
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(
        'Check Your Internet Connection And Try Again');
    } else {
        return throwError(
          'City Not Found');
    }
  }
  getCityNameFromLatAndLng(lat:number, lng:number){
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    return this.http.get<any>(url)
  }
}
