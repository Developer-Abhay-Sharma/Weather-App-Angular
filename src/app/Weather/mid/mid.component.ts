import { Component, OnInit } from '@angular/core';
import { WeatherapiService} from './weatherapi.service'

@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css']
})
export class MidComponent  {
  error:any;
  cityname = 'Bareilly';
  img:any;
  des:any;
  data:any;
  isShown:any
  constructor(private list:WeatherapiService){
    this.list.weatherData(this.cityname).subscribe((result) =>{
      // console.log("result",result)
      this.data = result;
      this.des=this.data?.weather[0]
      // console.log(this.des)
      this.img = "https://openweathermap.org/img/wn/" + this.des?.icon + ".png";
    })
  }
  inputcity(cityname:any):void{
    // console.log(cityname)
    this.isShown = false;
    this.list.weatherData(cityname).subscribe((result) =>{
      // console.log("result",result)
      this.data = result;
      this.des=this.data?.weather[0]
      // console.log(this.des)
      this.img = "https://openweathermap.org/img/wn/" + this.des?.icon + ".png";
    },(error)=>{
      // console.log(error)
      this.error = error
      this.isShown = !this.isShown
    })
  }
}
