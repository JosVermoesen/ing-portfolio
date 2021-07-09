import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../_services/toast.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private aService: AccountService,
    private router: Router,
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
  /* canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data.roles as Array<string>;
    if (roles) {
      const match = this.aService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/home']);
        this.ts.get('ALERT.authMessage').subscribe(value => {
          this.toast.show(value, 'long');
        });
      }
    }

    if (this.aService.loggedIn()) {
      return true;
    }

    this.ts.get('ALERT.authMessage').subscribe(value => {
      this.toast.show(value, 'long');
    });

    this.aService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    return false;
  } */
}
