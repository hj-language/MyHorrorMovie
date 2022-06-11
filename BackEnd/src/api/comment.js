const express = require('express');
const router = express.Router();
const adminPW = require('../secret.js').admin.password;
const SendQuery = require('../db_connect.js').SendQuery;

// LIST: /comments/:reviewId
router.get('/:id', async (req, res) => {
    // DB에서 댓글 목록 가져 오기
    reviews = await SendQuery("SELECT * from comment where review_id = ? order by input_date;", req.params.id);
    
    if (reviews != null) {
        res.status(200).send(reviews);
    } else {
        res.status(400).end();
    }
})

// INPUT: /comments/
router.post('/:id', async (req, res) => {    
    let commentObj = {
        review_id: req.params.id,
        comment_text: req.body.comment_text,
        nickname: req.body.nickname,
        password: req.body.password,
        input_date: new Date()
    };

    if (await SendQuery("INSERT INTO comment SET ?;", commentObj))
        res.status(200).send();
    else
        res.status(400).send();
})

// DELETE: /comments/:id
router.delete('/:id', async (req, res) => {
    let password = await SendQuery("SELECT password FROM comment where id=?", req.params.id)
    if (password[0].password !== req.headers.authorization && req.headers.authorization !== adminPW) {
        res.status(400).send();
        return;
    }
    
    let result = await SendQuery("DELETE FROM comment where id=?", req.params.id);
    if (result != null) {
        console.log(result);
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
})

// UPDATE: /comment/:id
router.put('/:id', async (req, res) => {
    let password = await SendQuery("SELECT password FROM comment where id=?", req.params.id)
    if (password[0].password !== req.headers.authorization) {
        res.status(400).send();
        return;
    }
    let result = await SendQuery("UPDATE comment SET comment_text=? where id=?", [req.body.comment_text, req.params.id]);
    if (result != null) {
        console.log(result);
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
})

module.exports = router;