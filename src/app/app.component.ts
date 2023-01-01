import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Capacitor, Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from './shared/services/language.service';
import { User } from './shared/models/user';
import { AccountService } from './shared/services/account.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  expire: number;
  aUser: User = null;

  user: User;
  memberLoading = false;
  androidAppInstalled = false;

  constructor(
    private platform: Platform,
    private ionicStorage: Storage,
    public aService: AccountService,
    private router: Router,
    private ls: LanguageService,
    private alertCtrl: AlertController,
    private ts: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
      this.ls.setInitialAppLanguage();
    });
  }

  ngOnInit() {
    this.capacitorCheck();
    this.memberLoading = true;
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.aUser = JSON.parse(localStorage.getItem('vUser'));

    if (this.aUser) {
      const jwtToken = JSON.parse(atob(this.aUser.token.split('.')[1]));
      this.expire = jwtToken.exp * 1000;
      if (this.expire < Number(Date.now())) {
        localStorage.removeItem('vUser');
        this.aUser = null;
        this.onLogout();
      } else {
        this.aService.setCurrentUser(this.aUser);
        // this.presence.createHubConnection(user);
      }
    }

    /* const user: User = JSON.parse(localStorage.getItem('vUser'));
    if (user) {
      this.aService.setCurrentUser(user);
      // this.presence.createHubConnection(user);
    } */
  }

  capacitorCheck() {
    if (this.platform.is('capacitor')) {
      console.log('An Android version is available in Play Store!');
      this.androidAppInstalled = true;
    }
  }

  async openGooglePlayPage() {
    await Browser.open({ url: 'https://play.google.com/store/apps/details?id=be.vsoft.portfolio' });
  }

  androidInstall() {
    this.openGooglePlayPage();
  }

  onLogout() {
    this.aService.logout();
    this.router.navigate(['/home']);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter event fired works');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave event fired');
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.ts.instant('ALERT.titleLogout'),
      message:
        this.ts.instant('ALERT.msgLogout') +
        ' <strong>' +
        this.ts.instant('ALERT.msgAreYouSure') +
        '</strong>',
      buttons: [
        {
          text: this.ts.instant('ALERT.btnCancelText'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: doNothing => { }
        },
        {
          text: this.ts.instant('ALERT.btnOkText'),
          handler: () => {
            this.onLogout();
          }
        }
      ]
    });
    await alert.present();
  }
}
