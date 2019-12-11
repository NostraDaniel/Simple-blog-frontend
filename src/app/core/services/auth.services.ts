import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSubject$ = new BehaviorSubject<string | null>(this.username);

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) { }

  public get user$() {
    return this.userSubject$.asObservable();
  }

  private get username(): string | null {
    const token = this.storage.get('token');
    const username = this.storage.get('username') || '';

    if (token) {
      return username;
    }

    return null;
  }

  public register(name: string, email: string, password: string) {
    return this.http.post('http://localhost:4202/register', {
      name,
      email,
      password
    });
  }

  public login(email: string, password: string) {
    return this.http
      .post('http://localhost:4202/login', {
        email,
        password
      })
      .pipe(
        tap((res: any) => {
          this.userSubject$.next(res.user.name);
          this.storage.set('token', res.token);
          this.storage.set('username', res.user.name);
        })
      );
  }

  public logout(): void {
    this.storage.remove('token');
    this.storage.remove('username');
    this.userSubject$.next(null);
  }
}
