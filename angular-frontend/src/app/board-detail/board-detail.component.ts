import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatPaginator, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';

import { LoginService } from '../login.service';
import { BoardService } from '../board/board.service';
import { PostDetail, Comment } from '../board/board';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Co {
  data: Comment,
  children?: Co[];
}
interface FlatNode {
  expandable: boolean;
  data: Comment;
  level: number;
}
interface CommentParent{
  author: string, 
  pid: number, 
  group_id: number,
}

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit, OnDestroy {
  boardId: string;
  postId: string;
  postDetail: PostDetail;
  co: Co[] = [];
  commentParent: CommentParent;
  commentForm: FormGroup;
  displayedColumns: string[] = ['body', 'author', 'date'];
  commentTo: string = '';
  mySubscription: any;
  
  private _transformer = (node: Co, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      data: node.data,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
  treeFlateener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlateener);
  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private loginService: LoginService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      };
    });
  };
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.commentParent = {
      author: '', 
      pid: 0, 
      group_id: 0,
    };

    this.commentForm = this._formBuilder.group({
      comment: ['', Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      this.boardId = params.get('boardId');
      this.postId = params.get('postId');
      this.boardService.reqPostDetail(this.boardId, this.postId)
        .subscribe((data) => {
          this.postDetail = data;
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

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    };
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
  onCommentSubmit() {
    this.boardService.addComment(this.loginService.session.id, this.postId,
      this.commentForm.value.comment, this.commentParent.group_id, this.commentParent.pid)
      .subscribe(() => {
        this.router.navigate([`/board/${this.boardId}/${this.postId}`]);
      });
  };
  deleteComment(id){
    this.boardService.deleteComment(id)
      .subscribe(() => {
        this.router.navigate([`/board/${this.boardId}/${this.postId}`]);
      });
  };
  setTo(node){
    this.commentParent.pid = node.comment_id;
    this.commentParent.author = node.comment_author;
    this.commentParent.group_id = node.group_id;
    this.commentTo = `@${node.comment_author}에게 `;
  };
  removeSet(){
    this.commentTo='';
    this.commentParent.pid = 0;
    this.commentParent.author = '';
    this.commentParent.group_id = 0;
  };
};