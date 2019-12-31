
const argon2 = require('argon2');

const user = require('../model/user');

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

// /api/logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({
            message: "success",
            code: 1,
        });
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

/*
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
*/