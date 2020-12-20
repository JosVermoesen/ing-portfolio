import { ManualContractService } from './../../_services/manualcontract.service';
import { SettingsPopoverPage } from './settings-popover/settings-popover.page';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  version: string = version;

  memberLoading = false;
  toggleServerLive = false;
  togglemanualONLY = false;

  dateOfCopy: Date;

  constructor(
    private router: Router,
    private authService: AuthService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private ts: TranslateService,
    private mc: ManualContractService,
    private ionicStorage: Storage
  ) { }

  ngOnInit() {
    this.reloadCache();
    this.ionicStorage.get('MANUALONLY').then(val => {
      if (val === 'TRUE') {
        this.togglemanualONLY = true;
        this.toggleServerLive = false;
      } else {
        this.togglemanualONLY = false;
        this.checkForLive();
      }
    });    
  }

  reloadCache() {
    /* if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available would you like to update?')) {
          window.location.reload();
        }
      })
    } */
  }

  ionViewWillEnter() {
    this.mc.loadManualContracts();
    this.memberLoading = false;
    if (this.authService.currentUser) {
    }
  }

  checkForLive() {
    this.ionicStorage.get('SERVERLIVE').then(vals => {
      if (vals === 'TRUE') {
        this.toggleServerLive = true;
      } else {
        this.ionicStorage.get('DATEOFCOPY').then(val => {
          if (!val) {
            this.ionicStorage.set('SERVERLIVE', 'TRUE');
            this.toggleServerLive = true;
          } else {
            this.dateOfCopy = new Date(val);
            this.toggleServerLive = false;
          }
        });
      }
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  showMemberPage() {
    this.memberLoading = true;
    this.router.navigateByUrl('/member');
  }

  loadLocalData() {
    this.router.navigate(['/customerslocalcopy']);
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.ts.instant('ALERT.header'),
      message: this.ts.instant('ALERT.msg'),
      buttons: ['OK']
    });
    alert.present();
  }

  async openSettingsPopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: SettingsPopoverPage,
      event: ev
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    this.ionicStorage.get('MANUALONLY').then(val => {
      if (val === 'TRUE') {
        this.togglemanualONLY = true;
        this.toggleServerLive = false;
      } else {
        this.togglemanualONLY = false;
        this.checkForLive();
      }
    });
  }
}
