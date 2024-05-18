import { ToastService } from './../../shared/services/toast.service';
import { environment } from '../../../environments/environment';
import { MailService } from './../../shared/services/mail.service';
import { Contactmail } from '../../shared/models/contactmail';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  readyToSend = false;
  waitMilliseconds = 2000;
  busy = false;
  alerts: any[] = [{}];

  user: User;

  contactMail: Contactmail;
  templateName = 'contact.html';
  mailSubject: string;
  templateBody: string = null;

  form: UntypedFormGroup;
  urlEmail: string = null;
  urlName: string = null;
  urlPhone: string = null;
  urlRr: string = null;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private http: HttpClient,
    private fb: UntypedFormBuilder,
    private ms: MailService,
    private ts: TranslateService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('vUser'));
    this.urlEmail = this.user.email;
    this.urlName = this.user.knownAs;
    this.urlPhone = this.user.phoneNumber;
    this.urlRr = this.user.berNumber;
    this.initTemplate();
    this.ts.get('CONTACT.MessageAlert').subscribe(value => {
      this.toastService.show(value, 'short');
    });
  }

  initTemplate() {
    this.http
      .get('assets/templates/mail/' + this.templateName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        // console.log(data);
        this.templateBody = data;
        this.createContactForm();
      });
  }

  createContactForm() {
    this.ts.get('CONTACT.MessageSubject').subscribe(value => {
      this.mailSubject = value;
    });


    this.form = this.fb.group({
      subject: [this.mailSubject, Validators.required],
      name: [this.urlName, Validators.required],
      rR: [
        this.urlRr,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      email: [
        this.urlEmail,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      phone: [this.urlPhone],
      copySender: [false],
      message: ['', Validators.required],
      template: [this.templateBody],
      data: [null],
      apiGuid: [environment.apiVsoftMailGuid, Validators.required],
      apiMailKey: [environment.apiVsoftSendFromAddress, Validators.required],
      apiNameKey: [environment.apiVsoftSendFromName, Validators.required],
    });
    console.log(this.form.value);
  }

  refreshTemplateBody() {
    const stringNameToReplace = '.{name}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringNameToReplace,
      this.form.value.name
    );

    const stringInBlockToReplace = '.{message}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringInBlockToReplace,
      this.form.value.message
    );

    this.form.value.template = this.templateBody;
    // console.log(this.form.value);
  }

  checkBeforeSending() {
    this.readyToSend = true;
  }

  backToEditing() {
    this.readyToSend = false;
  }

  submitContactMail() {
    // console.log(this.form.value);
    this.refreshTemplateBody();
    // console.log(this.form.value);

    this.contactMail = Object.assign({}, this.form.value);
    console.log(this.contactMail);
    this.busy = true;
    this.ms.contactmail(this.contactMail).subscribe(
      () => {
        this.ts.get('CONTACT.SendSuccessMessage').subscribe((res: string) => {
          this.toastService.show(res, 'long');
          this.busy = false;
        });
      },
      (error) => {
        this.ts.get('CONTACT.SendFailedMessage').subscribe((res: string) => {
          this.toastService.show(res + ' ' + error, 'long');
          this.busy = false;
        });
      },
      () => {
        this.router.navigate(['/home']);
        /* setTimeout(() => {
          this.router.navigate(['/home']);
        }, this.waitMilliseconds); */
      }
    );
  }
}
