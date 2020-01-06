import { Session } from '../user/user';

export interface Board {
  board_id: number,
  admin: number,
  board_name: string,
};

export interface PostInfo {
  post_id: number,
  author: string,
  post_title: string,
  post_body: string,
  board_id: number,
  date: Date,
  countn: number,
  count: number,
};

export interface PostList {
  posts: PostInfo[],
  boardName: Board,
};

export interface Index {
  board: Board[],
  session: Session,
};

export interface PostDetail {
  boardInfo: Board,
  postInfo: PostInfo,
  comment: Comment[],
};

export interface Comment {
  comment_id: number,
  post_id: number,
  comment_author: string,
  comment_body: string,
  date: Date,
  group_id: number,
  pid: number,
  author: string,
};

export interface postCount {
  count: number,
};