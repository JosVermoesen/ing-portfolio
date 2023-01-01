import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../../shared/services/toast.service';
import { LanguageService } from '../../../shared/services/language.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.page.html',
  styleUrls: ['./settings-popover.page.scss']
})
export class SettingsPopoverPage implements OnInit {
  languages = [];
  selected = '';

  togglemanualONLY: boolean;
  toggleShowCanceled: boolean;
  toggleServerLive: boolean;

  constructor(
    private popoverCtrl: PopoverController,
    private ls: LanguageService,
    private toastService: ToastService,
    private ts: TranslateService,
    private ionicStorage: Storage
  ) { }

  ngOnInit() {
    this.languages = this.ls.getLanguages();
    this.selected = this.ls.selected;

    this.ionicStorage.get('MANUALONLY').then(val => {
      if (val === 'TRUE') {
        this.togglemanualONLY = true;
      } else {
        this.togglemanualONLY = false;
      }
    });

    this.ionicStorage.get('SHOWCANCELED').then(val => {
      if (val === 'TRUE') {
        this.toggleShowCanceled = true;
      } else {
        this.toggleShowCanceled = false;
      }
    });

    this.ionicStorage.get('SERVERLIVE').then(val => {
      if (val === 'TRUE') {
        this.toggleServerLive = true;
      } else {
        this.toggleServerLive = false;
      }
    });

    this.ts.get('SETTINGS.MessageAlert').subscribe(value => {
      this.toastService.show(value, 'short');
    });
  }

  select(lng) {
    this.ls.setLanguage(lng);
    this.saveSettings();
    this.popoverCtrl.dismiss();
    this.selected = this.ls.selected;
    console.log(this.ls.selected);
  }

  saveSettings() {
    if (this.togglemanualONLY) {
      this.ionicStorage.set('MANUALONLY', 'TRUE');      
      this.toggleServerLive = false;
    } else {
      this.ionicStorage.set('MANUALONLY', 'FALSE');
    }

    if (this.toggleShowCanceled) {
      this.ionicStorage.set('SHOWCANCELED', 'TRUE');
    } else {
      this.ionicStorage.set('SHOWCANCELED', 'FALSE');
    }

    if (this.toggleServerLive) {
      this.ionicStorage.set('SERVERLIVE', 'TRUE');
    } else {
      this.ionicStorage.set('SERVERLIVE', 'FALSE');
    }
  }
}
