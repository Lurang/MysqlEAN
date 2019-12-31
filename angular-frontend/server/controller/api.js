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

// /api/home
exports.getSession = (req, res) => {
    res.json({
        session: req.session.user,
    });
};