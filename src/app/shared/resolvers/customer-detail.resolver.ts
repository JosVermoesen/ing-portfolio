/* import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastService } from '../../shared/services/toast.service';
import { VsoftCustomer } from '../../shared/models/vsoftCustomer';
import { VsoftCustomerService } from '../../shared/services/vsoftcustomer.service';

@Injectable()
export class CustomerDetailResolver implements Resolve<VsoftCustomer> {
  constructor(
    private vCs: VsoftCustomerService,
    private router: Router,
    private toast: ToastService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VsoftCustomer> {
    return this.vCs.getVsoftCustomer(route.params.id).pipe(
      catchError(error => {
        this.toast.show('Problem retrieving data', 'short');
        this.router.navigate(['/user']);
        return of(null);
      })
    );
  }
}
 */
