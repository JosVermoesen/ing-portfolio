import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

import { Router } from '@angular/router';

import { ToastService } from './../../../shared/services/toast.service';
import { User } from '../../../shared/models/user';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  user: User;
  maxDate: Date;
  maxAge: string;

  isLoading = false;

  userMessage: string;
  knownAsMessage: string;
  emailMessage: string;
  emailPattern: string;
  dateOfBirthMessage: string;
  berNumberMessage: string;
  berNumberMinMaxMessage: string;
  passwordMessage: string;
  passwordMinMessage: string;
  passwordMaxMessage: string;
  // tslint:disable-next-line: variable-name
  validation_messages: any;

  constructor(
    private aService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private ts: ToastService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.initTranslateMessages();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
    this.maxAge = this.maxDate.toISOString();
    this.maxAge = this.maxAge.slice(0, 10);
    this.createRegisterForm();
  }

  initTranslateMessages() {
    /* this.translate.get('REGISTER.UsernameMessage').subscribe(value => {
      this.userMessage = value;
    }); */
    this.translate.get('REGISTER.KnownAsMessage').subscribe(value => {
      this.knownAsMessage = value;
    });
    this.translate.get('REGISTER.EmailMessage').subscribe(value => {
      this.emailMessage = value;
    });
    this.translate.get('REGISTER.EmailPattern').subscribe(value => {
      this.emailPattern = value;
    });
    /* this.translate.get('REGISTER.DateOfBirthMessage').subscribe(value => {
      this.dateOfBirthMessage = value;
    }); */
    this.translate.get('REGISTER.BerNumberMessage').subscribe(value => {
      this.berNumberMessage = value;
    });
    this.translate.get('REGISTER.BerNumberMinMaxMessage').subscribe(value => {
      this.berNumberMinMaxMessage = value;
    });
    this.translate.get('REGISTER.PasswordMessage').subscribe(value => {
      this.passwordMessage = value;
    });
    this.translate.get('REGISTER.PasswordMinMessage').subscribe(value => {
      this.passwordMinMessage = value;
    });
    this.translate.get('REGISTER.PasswordMaxMessage').subscribe(value => {
      this.passwordMaxMessage = value;
    });

    this.validation_messages = {
      knownAs: [{ type: 'required', message: this.knownAsMessage }],
      email: [
        { type: 'required', message: this.emailMessage },
        { type: 'pattern', message: this.emailPattern }
      ],
      // dateOfBirth: [{ type: 'required', message: this.dateOfBirthMessage }],
      berNumber: [
        { type: 'required', message: this.berNumberMessage },
        {
          type: 'minlength',
          message: this.berNumberMinMaxMessage
        },
        {
          type: 'maxlength',
          message: this.berNumberMinMaxMessage
        }
      ],
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

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['user220750', Validators.required],
        dateOfBirth: ['1984-05-16', Validators.required],
        berNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11)
          ]
        ],
        gender: ['male'],
        knownAs: ['', Validators.required],
        clientNumber: ['220750'],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ],
        city: ['Herdersem', Validators.required],
        country: ['Belgium', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(36)
          ]
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            this.matchValues('password')
          ]
        ]
      });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true };
    };
  }

  register() {
    if (this.registerForm.valid) {
      const userEmail = this.registerForm.value.email;
      this.registerForm.value.username = userEmail;
      this.user = Object.assign({}, this.registerForm.value);
      this.isLoading = true;
      this.aService.register(this.user).subscribe(
        () => {
          this.isLoading = false;
          this.translate.get('REGISTER.RegisterSuccess').subscribe(value => {
            this.ts.show(value, 'long');
          });
        },
        error => {
          this.isLoading = false;
          this.translate.get('REGISTER.RegisterFailed').subscribe((res: string) => {
            this.ts.show(res + ': [' + error + ']', 'short');
          });
        },
        () => {
          this.aService.login(this.user).subscribe(() => {
            this.router.navigate(['/user']);
          });
        }
      );
    }
  }
}
