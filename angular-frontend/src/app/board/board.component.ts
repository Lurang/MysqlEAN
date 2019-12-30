import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BoardService } from './board.service';
import { LoginService } from '../login.service';
import { PostList, PostInfo } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  boardId: string;
  pageSizeOptions;
  postList: PostList;
  displayedColumns: string[] = ['index', 'title', 'date', 'author', 'count'];
  dataSource;
  
  constructor(
      private route: ActivatedRoute,
      private boardService: BoardService,
      public loginService: LoginService,
      private router: Router,
    ) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.boardId = params.get('boardId');
      this.getPostList();
    });
  };
  
  getPostList(): void {
    this.boardService.reqPostList(this.boardId)
      .subscribe(data => {
        this.postList = data;
        this.dataSource = new MatTableDataSource<PostInfo>(this.postList.posts);
        this.dataSource.paginator = this.paginator;
      });
  };
  moveToForm() {
    this.router.navigate([`/board/${this.boardId}/newPost`]);
  };
};
