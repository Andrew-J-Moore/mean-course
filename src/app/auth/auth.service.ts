import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(result => {
      console.log(result);
    });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post('http://localhost:3000/api/user/login', authData).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}