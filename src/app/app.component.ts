import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Capacitor, Plugins } from '@capacitor/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import { LanguageService } from './_services/language.service';
import { TranslateService } from '@ngx-translate/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  user: User;
  memberLoading = false;
  androidAppInstalled = false;

  constructor(
    private platform: Platform,
    private ionicStorage: Storage,
    private authService: AuthService,
    private jwtHelperService: JwtHelperService,
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
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }

    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.authService.currentUser = this.user;
    }
    this.memberLoading = false;

    /* this.ionicStorage.get('MANUALONLY').then(val => {
      if (val === 'TRUE') {
        this.router.navigate(['/customerslocalcopy']);
      }
    }); */

    /* this.ionicStorage.get('LAST_CONTRACT').then((val) => {
      if (val) {
        // console.log(val);
        // need to redirect after exit external link
        this.router.navigate(['/customerslocalcopy']);
        // or later on (now only with saved local copy!)
        // this.router.navigateByUrl('/member');
        this.ionicStorage.remove('LAST_CONTRACT');
      }
    }); */
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
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired')
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired')
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter event fired works')
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave event fired')
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
