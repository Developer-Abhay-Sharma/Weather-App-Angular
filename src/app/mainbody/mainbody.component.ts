import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.css']
})
export class MainbodyComponent implements OnInit {

  ngOnInit(): void {
    this.getLocation() 
  }
  isLoadingFinish(){
    return false
  }
  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          let userLocation = {'longitude':position.coords.latitude, 'latitude':position.coords.longitude}
          localStorage.setItem('userLocation', JSON.stringify(userLocation))
        });
    } else {
       console.log("No support for geolocation")
    }
    navigator.permissions.query({ name: 'geolocation' })
    .then(res => {this.permissionResponse = res; this.nextComponent()})
  }
permissionResponse:any
  nextComponent(){
    console.log(this.permissionResponse);
    
    if(this.permissionResponse.state == "granted"){
      console.log("access granted")
      setTimeout(() => {
        this.applicationAnimationStart()
      }, 3300);
    }
    else if (this.permissionResponse.state == "denied") {
      console.log("access denied");
      
    }
    else if (this.permissionResponse.state == "prompt") {
      this.getLocation()
    } else {
      console.log("unexpected error");
      
    }
  }
  applicationAnimationStart(){
    console.log("Animation Starts");
  }
}
 