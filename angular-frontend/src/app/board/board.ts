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

export interface BoardName {
  board_id: number,
  admin: string,
  board_name: string,
};

export interface PostList {
  posts: PostInfo[],
  boardName: BoardName,
};

export interface BoardList {
  board_id: number,
  board_name: string,
  admin: number,
};

export interface Session {
  id: string,
  isValid: boolean,
  admin: boolean,
};

export interface Index {
  board: BoardList[],
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
/*
{
  "board":[
    {"board_id":1,"board_name":"공지사항"},
    {"board_id":2,"board_name":"자유게시판"},
    {"board_id":14,"board_name":"A-Board"}
  ],
  "session":{"id":"1","isValid":true,"admin":false}
}


{"board":[
  {"board_id":1,"board_name":"공지사항"},
  {"board_id":2,"board_name":"자유게시판"},
  {"board_id":14,"board_name":"A-Board"}
  ],
"posts":[
  {"post_id":1,"author":"admin","post_title":"공지","post_body":"테스트","board_id":1,"date":"2019-12-11 17:20:38","countn":17,"count":17},
  {"post_id":3,"author":"admin","post_title":"공지3","post_body":"테스트3e","board_id":1,"date":"2019-12-12 17:56:19","countn":11,"count":11},
  {"post_id":5,"author":"admin","post_title":"공지5","post_body":"a테스트5","board_id":1,"date":"2019-12-12 12:32:18","countn":1,"count":1},
  {"post_id":21,"author":"admin","post_title":"공지1234","post_body":"테스트12344","board_id":1,"date":"2019-12-11 18:01:10","countn":11,"count":11},
  {"post_id":22,"author":"admin","post_title":"공지","post_body":"테스트","board_id":1,"date":"2019-12-12 08:58:48","countn":null,"count":0},
  {"post_id":23,"author":"admin","post_title":"공지2","post_body":"테스트2","board_id":1,"date":"2019-12-12 08:58:48","countn":null,"count":0},
  {"post_id":24,"author":"admin","post_title":"공지3","post_body":"테스트3","board_id":1,"date":"2019-12-12 08:58:48","countn":null,"count":0},
  {"post_id":25,"author":"admin","post_title":"공지4","post_body":"테스트4","board_id":1,"date":"2019-12-12 08:58:48","countn":null,"count":0},
  {"post_id":26,"author":"admin","post_title":"공지5","post_body":"테스트5","board_id":1,"date":"2019-12-12 08:58:48","countn":null,"count":0},
  {"post_id":27,"author":"admin","post_title":"공지6","post_body":"테스트6","board_id":1,"date":"2019-12-12 08:58:48","countn":null,"count":0}
],
"boardName":{"board_id":1,"admin":1,"board_name":"공지사항"},
"page":{"maxPage":4,"currentPage":1,"index":0}}


*/