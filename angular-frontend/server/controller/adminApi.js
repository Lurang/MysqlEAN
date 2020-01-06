const board = require('../model/board');

exports.updateBoard = async (req, res) => {
    const {boardId, boardName, admin} = req.body;
    if (boardName === '' || boardName == null) {
        return res.redirect('/');
    };
    await board.updateBoard(boardId, boardName, admin);
    res.json({
        message: "success",
        code: 1,
    });
};
exports.newBoard = async (req, res) => {
    const {boardName, admin} = req.body;
    if (boardName === '' || boardName == null) {
        return res.redirect('/');
    };
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