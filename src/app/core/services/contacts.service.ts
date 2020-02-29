import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public sendFeedback(formData) {
    console.log('ot service-a',formData);
    return this.http.post('http://localhost:4202/feedback', formData);
  }
}
