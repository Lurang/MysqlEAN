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
    message: number,
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  session: Session;
  isLoggedIn = false;

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
  isLogin() {
    return this.isLoggedIn;
  };
};
