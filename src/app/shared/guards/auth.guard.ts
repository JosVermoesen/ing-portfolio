import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private aService: AccountService,
    private ts: TranslateService,
    private toast: ToastService
  ) { }

  canActivate(): Observable<boolean> {
    return this.aService.currentUser$.pipe(
      map(user => {
        // tslint:disable-next-line: curly
        if (user) return true;
        this.toast.show('You have no authority!', 'long');
      })
    );
  }
}
