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
  constructor(
    private notification:NotificationService
  ) {}

  ngOnInit(): void {
    // this.notificationService.sendTest().subscribe(res => console.log(res))
    // this.swPush.messages.subscribe((message) => console.log(message));
  }

  set() {
    alert('pressed');
    let hrs = document.getElementById('hrs') as HTMLInputElement;
    let min = document.getElementById('min')as HTMLInputElement;
    this.notification.getIp().subscribe(ip => {
      this.notification.sendTest(hrs.value, min.value, ip.ip).subscribe(res => {console.log(res);
      })
    })
  }
}
