import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.css'],
  animations: [
    trigger('letterMove', [
      state('center', style({
        opacity: '1',
      })),
      state('gone', style({
        opacity: '0',
        animation: 'forword'
      })),
      transition('center => gone', [
        animate('1s')
      ])
    ])
  ]
})
export class MainbodyComponent implements OnInit {

  ngOnInit(): void {
    this.getLocation() 
  }
  loadFinish:boolean = false
  isLoadingFinish(){
    // this.loadFinish = true   
    let mainBodyDisplay = document.querySelector('.main-body') as HTMLElement
    mainBodyDisplay?.classList.add('disapperAnimation')
    setTimeout(() => {
      mainBodyDisplay.style.display = 'none'
      this.displayMainScreen()
    }, 2000);
  }
  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          let userLocation = {'longitude':position.coords.latitude, 'latitude':position.coords.longitude}
          localStorage.setItem('userLocation', JSON.stringify(userLocation))
        });
    } else {
      //  console.log("No support for geolocation")
    }
    navigator.permissions.query({ name: 'geolocation' })
    .then(res => {this.permissionResponse = res; this.nextComponent()})
  }
permissionResponse:any
isStart:boolean = true
  nextComponent(){
    // console.log(this.permissionResponse);
    
    if(this.permissionResponse.state == "granted"){
      // console.log("access granted")
      setTimeout(() => {
        console.log('animation Starts');
        this.isStart = !this.isStart
        this.isLoadingFinish()
      }, 3300);
    }
    else if (this.permissionResponse.state == "denied") {
      // console.log("access denied");
      
    }
    else if (this.permissionResponse.state == "prompt") {
      this.getLocation()
    } else {
      console.log("unexpected error");
      
    }
  }
  displayMainScreen(){
    this.loadFinish = true
  }
}
 