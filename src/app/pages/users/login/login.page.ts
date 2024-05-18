import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../../shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: UntypedFormGroup;
  isLoading = false;

  userMessage: string;
  passwordMessage: string;
  passwordMinMessage: string;
  passwordMaxMessage: string;
  // tslint:disable-next-line: variable-name
  validation_messages: any;

  constructor(
    private aService: AccountService,
    private router: Router,
    private ts: ToastService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.initTranslateMessages();
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(null, {
        validators: [Validators.required]
      }),
      password: new UntypedFormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(36)
        ]
      })
    });
  }

  initTranslateMessages() {
    this.translate.get('LOGIN.UsernameMessage').subscribe(value => {
      this.userMessage = value;
    });
    this.translate.get('LOGIN.PasswordMessage').subscribe(value => {
      this.passwordMessage = value;
    });
    this.translate.get('LOGIN.PasswordMinMessage').subscribe(value => {
      this.passwordMinMessage = value;
    });
    this.translate.get('LOGIN.PasswordMaxMessage').subscribe(value => {
      this.passwordMaxMessage = value;
    });

    this.validation_messages = {
      username: [{ type: 'required', message: this.userMessage }],
      password: [
        { type: 'required', message: this.passwordMessage },
        {
          type: 'minlength',
          message: this.passwordMinMessage
        },
        {
          type: 'maxlength',
          message: this.passwordMaxMessage
        }
      ]
    };
  }

  login() {
    this.isLoading = true;
    this.aService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      })
      .subscribe(
        () => {
          this.translate.get('LOGIN.LoginSuccess').subscribe((res: string) => {
            this.ts.show(res, 'short');
          });
          this.isLoading = false;
        },
        error => {
          this.translate.get('LOGIN.LoginFailed').subscribe((res: string) => {
            this.ts.show(res + ': [' + error + ']', 'long');
          });
          this.isLoading = false;
        },
        () => {
          this.router.navigateByUrl('/user');
          // console.log('whatever');
        }
      );
  }
}
