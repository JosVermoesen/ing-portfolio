import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { VsoftCustomer } from '../models/vsoftCustomer';

@Injectable()
export class VsoftCustomerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVsoftCustomer(id: string) {
    return this.http.get<VsoftCustomer>(
      this.baseUrl + 'vsoftcustomers/' + id
    );
  }
}
