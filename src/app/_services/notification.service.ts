import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  notification = environment.url + '/notification';
  weather = this.notification + '/weather'
  notificationStatus = this.notification + '/notificationStatus';
  location = this.notification + '/location';
  // test = environment.url + '/test';
  test = environment.url + '/notification/test'
  constructor(private http:HttpClient) { }

  getNotification(data:any){
    console.log(data);
    return this.http.post(this.notification, data)
  }

  sendNotificationStatus(data:any){
    return this.http.post<any>(this.notificationStatus, {notificationStatus:data})
  }
  sendCityLatLngAndNotificationStatus(city:string, lat:number, lng:number, ip:any, notificationStatus:any, endPoint:any){
    return this.http.post<any>(this.location, {city:city, lat:lat, lng:lng, ip:ip, notificationStatus:notificationStatus, endPoint:endPoint})
  }
  getIp(){
    return this.http.get<any>('https://api.ipify.org/?format=json')
  }
  // sendTest(){
  //   return this.http.get(this.test)
  // }

  sendTest(hrs:any, min:any){
    return this.http.post<any>(this.test, {hrs:hrs, min:min})
  }
}
