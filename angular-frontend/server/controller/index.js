const board = require('../model/board');
const chat = require('../model/chat');

exports.getIndex = async (req, res) => {
    if (!req.session.user) {
        req.session.user = {
            id: '0',
            isValid: false,
            admin: false,
        };
    }
    const [rows] = await board.boardList();
    const [crows] = await chat.chatList();
    /*
    res.render('index', {
        session: req.session.user,
        board: rows,
        chats: crows,
    });
    */
   res.json({
       board: rows,
       session: req.session.user,
       //chats: crows,
   })
}