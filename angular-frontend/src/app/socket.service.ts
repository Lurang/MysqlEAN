import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Chat } from './user/user';
import { Router } from '@angular/router';

interface LastChat {
  chatId: string,
  author: string,
  body: string,
};

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  ws: WebSocket;  
  lastChat: LastChat;
  beforeChat: Chat;
  
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginService.reqSessionInfo();
    this.lastChat = {
      chatId: '',
      author: '',
      body: '',
    };
    this.beforeChat = {
      author: '',
      body: '',
      date: new Date(),
    }; 
  };

  connect() {
    /*
      if (!(this.loginService.session && (this.loginService.session.id === '0'))) {
        return;
      };
    */
    this.ws = new WebSocket('ws://localhost:3000');

    const sendMessage = () => {
      if (this.loginService.session) {
        if (this.loginService.session.id === '0') {
          return;
        };
      };
      let msgForm = (<HTMLInputElement>document.getElementById('msgForm'));
      if (msgForm.value === '') {
        return;
      } else {
        this.lastChat.author = this.loginService.session.id;
        this.lastChat.body = msgForm.value;
        this.lastChat.chatId += 1;
        let sendData = {
          event: 'chat',
          msg: msgForm.value,
        };
        this.ws.send(JSON.stringify(sendData));
        msgForm.value = '';
      };
    };

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({
        event: 'login',
        data: this.lastChat,
      }));
    };
        
    this.ws.onmessage = (message) => {
      let data = JSON.parse(message.data);
      let chatLogs = document.getElementById('chatLogs');
      switch (data.event) {
        case 'login':
          if (this.loginService.session && this.loginService.session.isValid) {
            chatLogs.innerHTML += `<li style='text-align: center; margin-top: 2px; margin-bottom: 2px;
              list-style:none; color: blue;'>${data.id}님이 입장하셨습니다.</li>`;
            const button = document.getElementById('messageButton');
            button.addEventListener('click', sendMessage);
          };
          chatLogs.scrollTop = chatLogs.scrollHeight;
          this.lastChat.chatId = data.lastId;
          if (this.loginService.chat) {
            this.lastChat.author = this.loginService.chat[this.loginService.chat.length -1].author;
            this.lastChat.body = this.loginService.chat[this.loginService.chat.length -1].body;
          };
          break;
        case 'chat':
          if (this.loginService.session && (data.id === this.loginService.session.id)) {
            chatLogs.innerHTML += `
            <ul style="padding: 0; margin: 0;">
              <div>
                <li style="list-style:none; text-align: right; color: red;">
                  ${data.id}
                </li>
                <mat-card class="mat-card" style="float: right; text-align: left; width: calc(100% - 150px); height: calc(100% - 70px); word-break: break-all; overflow: auto;">
                  ${data.msg}
                </mat-card>
              </div>
            </ul>`
            chatLogs.scrollTop = chatLogs.scrollHeight;
          } else {
            chatLogs.innerHTML += `
            <ul style="padding: 0; margin: 0;">
              <div>
                <li style="list-style:none; text-align: left; padding:0; margin:0;">
                  ${data.id}
                </li>
                <mat-card class="mat-card" style="width: calc(100% - 150px); height: calc(100% - 70px); word-break: break-all; overflow: auto;">
                  ${data.msg}
                </mat-card>
              </div>
            </ul>`;
            this.lastChat.chatId += 1;
            chatLogs.scrollTop = chatLogs.scrollHeight;
          };
          this.lastChat.author = data.id;
          this.lastChat.body = data.msg;
          break;
      };
    };

    this.ws.onclose = () => {
      if (this.router.url === '/home') {
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      };
    };
  };

};
