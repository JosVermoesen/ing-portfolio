import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Contactmail } from '../models/contactmail';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  baseUrl = environment.apiUrl + 'account/';

  constructor(private http: HttpClient) {}

  contactmail(contactMail: Contactmail) {
    return this.http.post(this.baseUrl + 'contactmail', contactMail);
  }
}
