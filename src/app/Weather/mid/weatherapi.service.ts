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
    let city = 'Bareilly'
    city = cityname
    let apikey = ""
    let url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+apikey;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }
  

  hoursdata(lat:any, lng:any){
    let apikey2 = ""
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lng+'&exclude=minutely,current,alerts&units=metric&appid='+apikey2
    return this.http.get(url)
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error);
      return throwError(
        'Check Your Internet Connection And Try Again');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, body was: `, error.error);
        return throwError(
          'City Not Found');
    }
  }
}
