const argon2 = require('argon2');

const user = require('../model/user');
const board = require('../model/board');
const chat = require('../model/chat');

//  /api
exports.getIndex = async (req, res) => {
    if (!req.session.user) {
        req.session.user = {
            id: '0',
            isValid: false,
            admin: false,
        };
    };
    const [rows] = await board.boardList();
    const [crows] = await chat.chatList();

   res.json({
       board: rows,
       session: req.session.user,
       //chats: crows,
   });
};
//  /api/board/:id
exports.postsList = async (req, res) => {
    const {boardId} = req.params;
    const [[posts], [boardInfo]] = await Promise.all([
        board.postList(boardId),
        board.searchBoard(boardId),
    ]);
    if (boardInfo[0] == null) {
        return res.redirect('/');
    };
    res.json({
        posts: posts,
        boardName: boardInfo[0],
    });
};

exports.postLogin = async (req, res) => {
    const {id, password} = req.body;
    const [rows] = await user.login(id);
    //idCheck
    if (!rows[0]) {
        res.json({
            message: 0,
        })
        return;
    };
    const result = await argon2.verify(rows[0].password, password);
    if (result === false) {
        res.json({
            message: 1,
        })
        return;
    };
    //adminCheck
    let isAdmin = false;
    if (id === 'admin') {
        isAdmin = true;
    } else if (id === 'ADMIN') {
        res.send('error');
        return;
    };
    //set session
    req.session.user = {
        id: id,
        isValid: true,
        admin: isAdmin,
    };
    //res.redirect('/')
    res.json({
        session: req.session.user,
    });
};
// /api/home
exports.getSession = (req, res) => {
    res.json({
        session: req.session.user,
    });
};
// /api/logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({
            message: 1,
        })
    });
};
exports.getPost = async (req, res) => {
    const {boardId, postId} = req.params;
    const [[boardInfo], [postInfo], [comment]] = await Promise.all([
        board.searchBoard(boardId),
        board.searchPost(postId),
        board.getComment(postId),
    ]);
    if (boardInfo[0] == null) {
        return res.redirect('/');
    };
    res.json({
        boardInfo: boardInfo[0],
        postInfo: postInfo[0],   
        comment: comment,
    });
}