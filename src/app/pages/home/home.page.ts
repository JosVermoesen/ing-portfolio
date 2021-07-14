import { ManualContractService } from './../../shared/services/manualcontract.service';
import { SettingsPopoverPage } from './settings-popover/settings-popover.page';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  version: string = environment.version;

  userLoading = false;
  toggleServerLive = false;
  togglemanualONLY = false;

  dateOfCopy: Date;

  constructor(
    private router: Router,
    public aService: AccountService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private ts: TranslateService,
    private mc: ManualContractService,
    private ionicStorage: Storage,
    private platform: Platform
  ) { }

  ngOnInit() {
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

  ionViewWillEnter() {
    this.mc.loadManualContracts();
    this.userLoading = false;
    if (this.aService.currentUser) {
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

  showMemberPage() {
    this.userLoading = true;
    this.router.navigateByUrl('/user');
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
