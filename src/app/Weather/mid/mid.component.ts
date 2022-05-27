import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { WeatherapiService } from '../../_services/weatherapi.service';

@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css'],
})
export class MidComponent {
  lat: number = 0;
  lng: number = 0;
  error: any;
  cityname:string = '';
  img: any;
  des: any;
  data: any;
  data2: any;
  isShown: any;
  hourly: any;
  daily: any;
  day: any;
  ip:any;
  endPoint:any
  private readonly publicKey =
  'BMKvL-2jcLkYmxjQ5kbbcUWOUtCjdsTrJDOkPrPGm6RPAilhhT_RaYJpM4cSZ3zRU0BaY72d2aVOhnTr9FYdEso';
  constructor(
    private list: WeatherapiService,
    private notificationService:NotificationService,
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private swPush: SwPush,
    ) {
      this.checkUpdate();
    }

  ngOnInit() {
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });
   this.firstNotification()
    this.updateClient();
  }

  inputcity(cityname: any): void {
    console.log(cityname)
    this.isShown = false;
    this.list.weatherData(cityname).subscribe(
      (result) => {
        console.log("result",result)
        this.data = result;
        this.img =
          'https://openweathermap.org/img/wn/' + this.data?.weather[0].icon + '.png';
      },
      (error) => {
        // console.log(error)
        this.error = error;
        this.isShown = !this.isShown;
      }
    );
    setTimeout(() => {
      this.list.hoursdata(this.lat, this.lng).subscribe((result2) => {
        this.data2 = result2;
        this.hourly = this.data2.hourly;
        this.daily = this.data2.daily;
        this.daily.splice(0, 1);
        for (let i = 0; i < this.daily.length; i++) {
          let max = parseInt(this.daily[i].temp.max);
          let min = parseInt(this.daily[i].temp.min);
          this.daily[i].temp.max = max;
          this.daily[i].temp.min = min;
        }
        for (let i = 0; i < this.hourly.length; i++) {
          let temp = parseInt(this.hourly[i].temp);
          this.hourly[i].temp = temp;
        }
        console.log(this.data2)
      });
    }, 500);
  }
  getTime(i: number) {
    let sendNextHRSValue = new Date().getHours() + i + 1;
    this.getday(sendNextHRSValue);
    if (sendNextHRSValue > 23) {
      let next24_1 = sendNextHRSValue - 24;
      if (next24_1 > 23) {
        let next24_2 = sendNextHRSValue - 48;
        return next24_2;
      }
      return next24_1;
    } else {
      return sendNextHRSValue;
    }
  }
  getday(check: any) {
    let daynumber = new Date().getDay();
    if (check > 23) {
      daynumber += 1;
    }
    if (check > 46) {
      daynumber += 1;
    }
    // console.log(daynumber);

    if (daynumber == 0 || daynumber == 7) {
      return (this.day = 'Sunday');
    } else if (daynumber == 1 || daynumber == 8) {
      return (this.day = 'Monday');
    } else if (daynumber == 2 || daynumber == 9) {
      return (this.day = 'Tuesday');
    } else if (daynumber == 3 || daynumber == 10) {
      return (this.day = 'Wednesday');
    } else if (daynumber == 4) {
      return (this.day = 'Thrusday');
    } else if (daynumber == 5) {
      return (this.day = 'Friday');
    } else if (daynumber == 6) {
      return (this.day = 'Saturday');
    } else {
      return (this.day = 'Error');
    }
  }
  nextDays(i: number) {
    let daynumber = new Date().getDay() + i;
    if (daynumber > 6) {
      daynumber = daynumber - 7;
    }
    if (daynumber == 0) {
      return (this.day = 'Sunday');
    } else if (daynumber == 1) {
      return (this.day = 'Monday');
    } else if (daynumber == 2) {
      return (this.day = 'Tuesday');
    } else if (daynumber == 3) {
      return (this.day = 'Wednesday');
    } else if (daynumber == 4) {
      return (this.day = 'Thrusday');
    } else if (daynumber == 5) {
      return (this.day = 'Friday');
    } else if (daynumber == 6) {
      return (this.day = 'Saturday');
    } else {
      return (this.day = 'Error');
    }
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position,) => {
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.callApiForCityName(this.lng, this.lat);
        console.log(this.lng);
        console.log(this.lat);
      });
    } else {
      console.log('No support for geolocation');
    }
  }
  callApiForCityName(Longitude: number, Latitude: number) {
    this.list
      .getCityNameFromLatAndLng(Latitude, Longitude)
      .subscribe((city) => {
        this.cityname = city.localityInfo.administrative[3].name;
        this.notificationService.getIp().subscribe(ip => {
          // console.log(ip.ip);
          console.log("NOOO");
          this.notificationService.sendCityLatLngAndNotificationStatus(this.cityname, this.lat, this.lng, ip.ip, Notification.permission, this.endPoint).subscribe(res => console.log(res))
        })
        this.inputcity(this.cityname);
      });
  }

  
  // pushSubscription() {
  //   if (!this.swPush.isEnabled) {
  //     console.log('Notification is not enabled or blocked??');
  //     return;
  //   }
  //   this.swPush.unsubscribe().then((data) => {
  //     console.log('unsubscribe');
  //   }
  //   )
  //   this.swPush
  //   .requestSubscription({
  //     serverPublicKey: this.publicKey,
  //   })
  //   .then((sub) => {
  //     this.notificationService
  //       .getNotification(sub)
  //       .subscribe((data) => console.log(data));
  //   })
  //   .catch((err) => console.log(err));
  // }

  firstNotification() {
    if (!this.swPush.isEnabled ) {
      console.log("Notification Not enabled");
      return;
    }
    // this.swPush.unsubscribe().then((data) => {
    //   console.log(data);
    //   console.log('unsubscribe');
      
    // }
    // )
    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
       this.endPoint = sub;
       console.log(this.endPoint);
       this.getLocation();
      })
      .catch((err) => console.log(err));
   
  }

  updateClient() {
    if (!this.swUpdate.isEnabled) {
      console.log('not enabled');
      return;
    }
    this.swUpdate.available.subscribe((event) => {
      console.log(`current`, event.current, `available `, event.available);
      if (confirm('update available for the app please conform')) {
        this.swUpdate.activateUpdate().then(() => location.reload());
      }
    });
    this.swUpdate.activated.subscribe((event) => {
      console.log(`current`, event.previous, `available `, event.current);
    });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);
        timeInterval.subscribe(() => {
          this.swUpdate.checkForUpdate().then(() => console.log('checked'));
          console.log('update checked');
        });
      }
    });
  }
}
