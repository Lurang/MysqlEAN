import { Component, OnInit } from '@angular/core';

import { Session, BoardList } from '../board/board';

import { BoardService} from '../board/board.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  boardList: BoardList[];

  constructor(
    private boardService: BoardService,
    public loginService: LoginService,
  ) { };

  ngOnInit() {
    this.getBoardList();
  };

  getBoardList(): void {
    this.boardService.reqBoardList()
      .subscribe((board) => {
        this.boardList = board.board;
        this.loginService.session = board.session;
      });
  };

  logout(): void {
    this.loginService.reqLogout()
    .subscribe((data) => {
      if (data.message === 1) {
        window.location.reload();
      };
    });
  };
  
};

