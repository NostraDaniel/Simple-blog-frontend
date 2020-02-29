import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public submitted: boolean = false;
  public emailForm: FormGroup = new FormGroup({
    'name': new FormControl('', [ Validators.required, Validators.minLength(3)]),
    'email': new FormControl('', [ Validators.required, Validators.minLength(8), Validators.email]),
    'topic': new FormControl('', [ Validators.required]),
    'message': new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(2000)])
  })

  constructor(
    private readonly contactsService: ContactsService,
    private readonly notificatorService: NotificatorService
  ) { }

  public get name() { return this.emailForm.get('name'); }
  public get email() { return this.emailForm.get('email'); }
  public get topic() { return this.emailForm.get('topic'); }
  public get message() { return this.emailForm.get('message'); }

  onSubmit():void {
    this.submitted = true;

    if(this.emailForm.valid) {
      
      this.contactsService.sendFeedback(this.emailForm.value).subscribe(() => {
        this.notificatorService.success('Feedback sent successful!')
      },
      (err) => {
        err.error.message.forEach(errMessage => {
          const {constraints} = errMessage;

          for (const key in constraints) {
            this.notificatorService.error(constraints[key]);
          }
        });
      });
    }
  }
}
