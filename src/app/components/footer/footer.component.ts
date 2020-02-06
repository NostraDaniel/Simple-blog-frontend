import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public emailForm: FormGroup = new FormGroup({
    'name': new FormControl('', [ Validators.required, Validators.minLength(3)]),
    'email': new FormControl('', [ Validators.required, Validators.minLength(4), Validators.email]),
    'phone': new FormControl(''),
    'message': new FormControl('', [ Validators.required, Validators.minLength(10)])
  })

  constructor() { }

  get name() { return this.emailForm.get('name'); }
  get email() { return this.emailForm.get('email'); }
  get message() { return this.emailForm.get('message'); }

  onSubmit() {
    console.log(this.emailForm.value);
  }
}
