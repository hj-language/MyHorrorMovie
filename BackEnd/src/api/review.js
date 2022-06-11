const express = require('express');
const router = express.Router();
const adminPW = require('../secret.js').admin.password;
const SendQuery = require('../db_connect.js').SendQuery;

// LIST: /reviews/
router.get('/', async (req, res) => {
    // DB에서 리뷰 목록 가져 오기
    reviews = await SendQuery("SELECT * from movie, review where movie.id = review.movie_id order by review.grade desc;", null);
    
    if (reviews != null) {
        res.status(200).send(reviews);
    } else {
        res.status(400).end();
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let review = await (SendQuery("SELECT * from movie,review where movie.id = review.movie_id and review.id = ?;", id));

    if (review != null) {
        res.status(200).send(review);
    } else {
        res.status(400).end();
    }
})

// INPUT: /reviews/
router.post('/', async (req, res) => {
    if (adminPW !== req.headers.authorization) {
        res.status(400).send();
        return;
    }
    
    let reviewObj = {
        movie_id: req.body.movie_id,
        review_text: req.body.review_text,
        grade: req.body.grade,
        scene: req.body.scene,
        input_date: new Date()
    };

    if (await SendQuery("INSERT INTO review SET ?;", reviewObj))
        res.status(200).send();
    else
        res.status(400).send();
})

// DELETE: /reviews/:id
router.delete('/:id', async (req, res) => {
    if (adminPW !== req.headers.authorization) {
        res.status(400).send();
        return;
    }
    
    let result = await SendQuery("DELETE FROM review where id=?", req.params.id);
    if (result != null) {
        console.log(result);
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
})

// UPDATE: /reviews/:id
router.put('/:id', async (req, res) => {
    if (adminPW !== req.headers.authorization) {
        res.status(400).send();
        return;
    }

    let obj = [
        req.body.review_text,
        req.body.grade,
        req.body.scene,
        req.params.id
    ];
    
    let result = await SendQuery("UPDATE review SET review_text=?, grade=?, scene=? where id = ?", obj);
    if (result != null) {
        console.log(result);
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
})

module.exports = router;