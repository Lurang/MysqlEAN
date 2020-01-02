import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Session, SessionInfo, Info, Chat } from './user/user';
import { SocketService } from './socket.service';

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
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  session: Session;
  chat: Chat[];

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
  ) { };

  async reqSessionInfo() {
    await this.http.get<Info>(`${this.apiBaseUrl}`, header)
      .subscribe((data) => {
        this.session = data.session;
        this.chat = data.chats;
      });
  };
  reqLogout() {
    return this.http.get<Message>(`${this.apiBaseUrl}/user/logout`);
  };
  login(user) {
    return this.http.post<SessionInfo>(`${this.apiBaseUrl}/user/login`, user, header);
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
