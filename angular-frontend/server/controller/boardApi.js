const board = require('../model/board');

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