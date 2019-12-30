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
            message: "success",
            code: 1,
        });
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
};

exports.deletePost = async (req, res) => {
    const {postId} = req.query;
    await board.deletePost(postId);
    res.json({
        message: "success",
        code: 1,
    });
};

exports.addPost = async (req, res) => {
    const {boardId, title, body, author} = req.body;
    await board.addPost(author, title, body, boardId);
    res.json({
        message: "success",
        code: 1,
    });    
};

exports.updatePost = async (req, res) => {
    const {postId, title, body} = req.body;
    await board.updatePost(title, body, postId);
    res.json({
        message: "success",
        code: 1,
    });
};
exports.signUp = async (req, res) => {
    const {id, name, password} = req.body;
    const [row] = await user.checkId(id);
    if (row[0].count === 0) {
        const newUser = new user(id, name, password);
        await newUser.save();
        res.json({
            message: "success",
            code: 1,
        });
    } else {
        res.json({
            message: "fail",
            code: 0, //id already exist
        });
    };
};
exports.sighUpCheck = async (req, res) => {
    const {id} = req.body;
    const [row] = await user.checkId(id);
    if (row[0].count === 0) {
        res.json({
            id: 1, //can use id
        });
    } else {
        res.json({
            id: 0, //id already exist
        });
    };
};
exports.updateBoard = async (req, res) => {
    const {boardId, boardName, admin} = req.body;
    await board.updateBoard(boardId, boardName, admin);
    res.json({
        message: "success",
        code: 1,
    });
};
exports.newBoard = async (req, res) => {
    const {boardName, admin} = req.body;
    await board.addBoard(boardName, admin);
    res.json({
        message: "success",
        code: 1,
    });
};
exports.deleteBoard = async (req, res) => {
    const {boardId} = req.body;
    await board.deleteBoard(boardId);
    res.json({
        message: "success",
        code: 1,
    });
};