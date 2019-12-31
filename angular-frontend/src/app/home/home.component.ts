import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Chat } from '../user/user';

interface LastChat {
  chatId: string,
  author: string,
  body: string,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lastChat: LastChat;
  beforeChat: Chat;
  
  constructor(
    public loginService: LoginService,
  ) { };

  ngOnInit() {
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
    this.connect();
  };

  connect() {
    const ws = new WebSocket('ws://localhost:3000');
    
    const sendMessage = () => {
      let msgForm =  (<HTMLInputElement>document.getElementById('msgForm'));
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
        ws.send(JSON.stringify(sendData));
        msgForm.value = '';
      };
    };

    ws.onopen = () => {
      ws.send(JSON.stringify({
        event: 'login',
        data: this.lastChat,
      }));
    };
    
    ws.onclose = () => {
      this.ngOnInit();
    };
    
    ws.onmessage = (message) => {
      let data = JSON.parse(message.data);
      let chatLogs = document.getElementById('chatLogs');
      switch (data.event) {
        case 'login':
          this.lastChat.author = this.loginService.chat[this.loginService.chat.length -1].author;
          this.lastChat.body = this.loginService.chat[this.loginService.chat.length -1].body;
          if (this.loginService.session && this.loginService.session.isValid) {
            chatLogs.innerHTML += `<li style='text-align: center; margin-top: 2px; margin-bottom: 2px;
              list-style:none; color: blue;'>${data.id}님이 입장하셨습니다.</li>`;
            const button = document.getElementById('messageButton');
            button.addEventListener('click', sendMessage);
          };
          chatLogs.scrollTop = chatLogs.scrollHeight;
          this.lastChat.chatId = data.lastId;
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
  };
};