import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from 'src/app/_services/notification.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent implements OnInit {
  private readonly publickey =
    'BD6BwoDPGRKyVhUiFw8IKvLyViWA-frxae8rdnW62_SPCSmTa-lmQLNUAXjLkTrgd82niCil63ag-JN0e8X3zrM';
  constructor(
    private swPush: SwPush,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.pushSubscription();
    this.swPush.messages.subscribe(message => console.log(message));
    this.swPush.notificationClicks.subscribe(
      ({action, notification}) =>{
        window.open(notification.data.url)
      })
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled or blocked??');
      return;
    }
    this.swPush
    .requestSubscription({
      serverPublicKey: this.publickey,
    })
    .then((sub) => {
      this.notificationService.getNotification(sub).subscribe(data => console.log(data)
      )
    })
    .catch((err) => console.log(err));
  }
}
