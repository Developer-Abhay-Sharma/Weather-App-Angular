import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent implements OnInit {
  private readonly publicKey =
    'BMKvL-2jcLkYmxjQ5kbbcUWOUtCjdsTrJDOkPrPGm6RPAilhhT_RaYJpM4cSZ3zRU0BaY72d2aVOhnTr9FYdEso';
  constructor(
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private notificationService: NotificationService,
    private appRef: ApplicationRef
  ) {
    this.checkUpdate();
  }

  ngOnInit(): void {
    this.swPush.messages.subscribe((message) => console.log(message));
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });
    this.updateClient();
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled or blocked??');
      return;
    }
    // console.log(this.publickey);
    this.swPush.unsubscribe().then((data) => {
      console.log(data);
      console.log('unsubscribe');
      this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        this.notificationService
          .getNotification(sub)
          .subscribe((data) => console.log(data));
      })
      .catch((err) => console.log(err));
    }).catch(err => console.log(err)
    )
    this.swPush
    .requestSubscription({
      serverPublicKey: this.publicKey,
    })
    .then((sub) => {
      this.notificationService
        .getNotification(sub)
        .subscribe((data) => console.log(data));
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
