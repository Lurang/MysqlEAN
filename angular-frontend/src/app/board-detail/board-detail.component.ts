import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTableDataSource, MatPaginator, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';

import { LoginService } from '../login.service';
import { BoardService } from '../board/board.service';
import { PostDetail, Comment } from '../board/board';

interface Co {
  data: Comment,
  children?: Co[];
}
interface FlatNode {
  expandable: boolean;
  data: Comment;
  level: number;
}

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  boardId: string;
  postId: string;
  postDetail: PostDetail;
  co: Co[] = [];
  dataSource;
  pageSizeOptions;
  displayedColumns: string[] = ['body', 'author', 'date'];

  private _transformer = (node: Co, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      data: node.data,
      level: level
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
  treeFlateener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlateener);
  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private loginService: LoginService,
  ) { };
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.boardId = params.get('boardId');
      this.postId = params.get('postId');
      this.boardService.reqPostDetail(this.boardId, this.postId)
        .subscribe((data) => {
          this.postDetail = data;
          this.dataSource = new MatTableDataSource<Comment>(this.postDetail.comment);
          this.dataSource.paginator = this.paginator;

          data.comment.forEach((element) => {
            if (element.pid === 0) {
              this.co.push({
                data: element,
                children: [],
              });
            };
          });

          data.comment.forEach((element) => {
            if (element.pid === 0) {
              return;
            } else {
              this.co.find((item, i) => {
                if (item.data.comment_id === element.group_id) {
                  this.co[i].children.push({
                    data: element,
                    children: [],
                  });
                  return;
                };
              });
            };
          });
          this.treeDataSource.data = this.co;
        });
    });
    this.loginService.reqSessionInfo();
  };

  modifyPost() {
    this.router.navigate([`/board/${this.boardId}/${this.postId}/modify`]);
  };
  deletePost() {
    this.boardService.deletePost(this.postId)
      .subscribe(() => {
        this.router.navigate([`/board/${this.boardId}`]);
      });
  };
  backToList() {
    this.router.navigate([`/board/${this.boardId}`]);
  };

};