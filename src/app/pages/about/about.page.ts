import { Component, OnInit } from '@angular/core';
import { version } from '../../../../package.json';

import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';

const { Browser } = Plugins;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  version = environment.version;

  qrElementType = 'url';
  // qrValue = 'https://github.com/JosVermoesen/ing-portfolio';

  qrResult: any;
  qrValue: any;

  constructor() { }

  ngOnInit() {
    const lf = '\n';
    this.qrResult = 'BCD 001 1 SCT BBRUBEBB BV Centrum voor Medische Analyse BE38363177290172 EUR125.94 120/0349/46169';
    const serviceTagValue = 'BCD';
    const versionValue = '001';
    const charactersetValue = '1';
    const identificationValue = 'SCT';
    const bicValue = 'BHBLDEHHXXX';
    const nameValue = 'Franz Mustermänn';
    const ibanValue = 'DE71110220330123456789';
    const amountValue = 'EUR12.3';
    const purposeValue = 'GDDS';
    const referenceValue = 'RF18539007547034';
    const remittanceValue = '';
    const informationValue = '';

    const qrTMP = 'BCD 001 1 SCT BHBLDEHHXXX Franz Mustermänn DE71110220330123456789 EUR12.3 GDDS RF18539007547034';

    this.qrValue =
      serviceTagValue + lf +
      versionValue + lf +
      charactersetValue + lf +
      identificationValue + lf +
      bicValue + lf +
      nameValue + lf +
      ibanValue + lf +
      amountValue + lf +
      purposeValue + lf +
      referenceValue + lf +
      remittanceValue + lf +
      informationValue;
  }

  async openGithubPage() {
    await Browser.open({ url: 'https://github.com/JosVermoesen/ing-portfolio' });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired works');
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
}



