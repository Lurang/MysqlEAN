import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { User, Login, Session, SessionInfo } from './user/user';

const header = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache': 'no-cache'
  },
  credentials: 'include',  
};

interface Message {
    message: string,
    code: number,
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  session: Session;

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
  ) { };

  reqSessionInfo() {
    this.http.get<SessionInfo>(`${this.apiBaseUrl}/home`, header)
      .subscribe((data) => {
        this.session = data.session;
      });
  };
  reqLogout() {
    return this.http.get<Message>(`${this.apiBaseUrl}/logout`);
  };
  login(user: User) {
    return this.http.post<Login>(`${this.apiBaseUrl}/user/login`, user, header);
  };
  signup(id, name, password) {
    let body = {
      id: id,
      name: name,
      password: password,
    };
    return this.http.post<Message>(`${this.apiBaseUrl}/user/signUp`, body);
  };
};
