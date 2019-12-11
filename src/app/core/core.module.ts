import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NotificatorService } from './services/notificator.service';
import { AuthService } from './services/auth.services';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    NotificatorService,
    AuthService,
    StorageService
 ],
})
export class CoreModule { }
