import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PostList, Index, PostDetail, postCount, Board } from './board';
import { LoginService } from '../login.service';

const header = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache': 'no-cache'
  },
  credentials: 'include',  
};

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiBaseUrl = environment.apiBaseUrl;
  boardList: Board[];

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) { }

  reqBoardList() {
    this.http.get<Index>(`${this.apiBaseUrl}`, header)
      .subscribe((board) => {
        this.boardList = board.board;
      });
  };
  reqPostList(id) {
    return this.http.get<PostList>(`${this.apiBaseUrl}/board/${id}`, header);
  };
  reqPostDetail(boardId, postId) {
    return this.http.get<PostDetail>(`${this.apiBaseUrl}/board/${boardId}/${postId}`, header);
  };
  deletePost(postId) {
    return this.http.post<JSON>(`${this.apiBaseUrl}/board/deletePost?postId=${postId}`, header);
  };
  addPost(boardId, title, body) {
    let data = {
      boardId: boardId,
      title: title,
      body: body,
      author: this.loginService.session.id,
    };
    return this.http.post<JSON>(`${this.apiBaseUrl}/board/addPost`, data);
  };
  updatePost(postId, title, body) {
    let data = {
      postId: postId,
      title: title,
      body: body,
    };
    return this.http.post<JSON>(`${this.apiBaseUrl}/board/update`, data);
  };
  addComment(author, postId, comment, group_id, pid) {
    let data = {
      author: author,
      postId: postId,
      comment: comment,
      group_id: group_id,
      pid: pid,
    };
    return this.http.post(`${this.apiBaseUrl}/board/addComment`,data);
  };
  deleteComment(commentId) {
    return this.http.post(`${this.apiBaseUrl}/board/deleteComment`,{commentId: commentId});
  };

  // admin  
  updateBoard(boardId, boardName, admin) {
    if (admin === true) {
      admin = 1;
    } else if (admin === false) {
      admin = 0;
    };
    let body = {
      boardId: boardId,
      boardName: boardName,
      admin: admin,
    };
    return this.http.post(`${this.apiBaseUrl}/admin/updateBoard`, body);
  };
  newBoard(boardName, admin) {
    if (admin === true) {
      admin = 1;
    } else if (admin === false) {
      admin = 0;
    };
    let body = {
      boardName: boardName,
      admin: admin,
    };
    return this.http.post(`${this.apiBaseUrl}/admin/newBoard`, body);
  };
  deleteBoard(boardId) {
    return this.http.post(`${this.apiBaseUrl}/admin/deleteBoard`, {boardId: boardId});
  };
  reqBoardCount(boardId) {
    return this.http.get<postCount>(`${this.apiBaseUrl}/admin/${boardId}`, header);
  };
};
