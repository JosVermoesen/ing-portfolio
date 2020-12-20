import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IContactmail } from '../_models/contactmail';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient) {}

  contactmail(contactMail: IContactmail) {
    return this.http.post(this.baseUrl + 'contactmail', contactMail);
  }
}
