import { Component, OnInit } from '@angular/core';

import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  checkState = false;
  count:number;
  
  constructor(
    private boardService: BoardService,
  ) { };

  ngOnInit() {
    this.boardService.reqBoardList();
  };

  updateBoard(data, index) {
    this.boardService.updateBoard(this.boardService.boardList[index].board_id, data, this.boardService.boardList[index].admin)
      .subscribe(() => {
        window.location.reload();
      });
  };
  newBoard(data) {
    if (!data) {
      return;
    } else {
      this.boardService.newBoard(data, this.checkState)
        .subscribe(() => {
          window.location.reload();
        });
    };
  };
  deleteBoard(index) {
    this.boardService.deleteBoard(this.boardService.boardList[index].board_id)
      .subscribe(() => {
        window.location.reload();
      });
  };
  getCount(index) {
    this.boardService.reqBoardCount(this.boardService.boardList[index].board_id)
      .subscribe((data) => {
        this.count = data.count;
      });
  };
};