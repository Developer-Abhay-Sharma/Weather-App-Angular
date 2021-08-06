import { Component, OnInit } from '@angular/core';
import { WeatherapiService} from './weatherapi.service'

@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css']
})
export class MidComponent  {
  lat = 28.35;
  lng = 79.4167;
  error:any;
  cityname = 'Bareilly';
  img:any;
  des:any;
  data:any;
  data2:any;
  isShown:any
  hourly:any;
  daily:any;
  constructor(private list:WeatherapiService){
    this.list.weatherData(this.cityname).subscribe((result) =>{
      // console.log("result",result)
      this.data = result;
      this.des=this.data?.weather[0]
      this.lat = this.data?.coord.lat;
      this.lng = this.data?.coord.lon;
      // console.log(this.des)
      // console.log(this.lat, this.lng)
      this.img = "https://openweathermap.org/img/wn/" + this.des?.icon + ".png";
    })
    setTimeout(() => {
      this.list.hoursdata(this.lat, this.lng).subscribe((result2)=>{
        this.data2 = result2;
        this.hourly = this.data2.hourly
        this.daily = this.data2.daily
        // console.log(this.hourly)
        // console.log(this.daily)
        // console.log(this.data2)
      })
    }, 0);
  }
  inputcity(cityname:any):void{
    // console.log(cityname)
    this.isShown = false;
    this.list.weatherData(cityname).subscribe((result) =>{
      // console.log("result",result)
      this.data = result;
      this.lat = this.data?.coord.lat;
      this.lng = this.data?.coord.lon;
      this.des=this.data?.weather[0]
      // console.log(this.des)
      this.img = "https://openweathermap.org/img/wn/" + this.des?.icon + ".png";
    },(error)=>{
      // console.log(error)
      this.error = error
      this.isShown = !this.isShown
    })
    setTimeout(() => {
      this.list.hoursdata(this.lat, this.lng).subscribe((result2)=>{
        this.data2 = result2;
        this.hourly = this.data2.hourly
        // console.log(this.data2)
      })
    }, 500);
  }
  OnInit(){
    
  }
}
