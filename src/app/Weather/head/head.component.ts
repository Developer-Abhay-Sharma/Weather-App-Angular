import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { WeatherapiService } from 'src/app/_services/weatherapi.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent implements OnInit {
  constructor(private notification: NotificationService) {}

  ngOnInit(): void {
    // this.notificationService.sendTest().subscribe(res => console.log(res))
    // this.swPush.messages.subscribe((message) => console.log(message));
  }

  set() {
    // alert('pressed');
    // let hrs = document.getElementById('hrs') as HTMLInputElement;
    // let min = document.getElementById('min') as HTMLInputElement;
    // console.log(hrs.value);
    // console.log(typeof min.value);
    let date = new Date();
    let now_utc = date.toUTCString();
    let raw_time = now_utc.slice(17, 22);
    let new_hrs = raw_time.slice(0, 2);
    let new_min = raw_time.slice(3, 5);
    console.log(raw_time);
    console.log(new_hrs);
    console.log(typeof new_min);
    this.notification.getIp().subscribe((ip) => {
      this.notification
        .sendTest(JSON.parse(new_hrs), JSON.parse(new_min), ip.ip)
        .subscribe((res) => {
          console.log(res);
        });
    });
  }
}
