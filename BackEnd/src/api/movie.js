const express = require('express');
const router = express.Router();
const adminPW = require('../secret.js').admin.password;
const SendQuery = require('../db_connect.js').SendQuery;

// LIST: /movies?isNotReviewed=true or false
// SEARCH: /movies?title=a
router.get('/', async (req, res) => {
    // DB에서 영화 목록 가져 오기
    let searchTitle = req.query.title;
    let movies;
    if (searchTitle) {
        movies = await SendQuery("SELECT * from movie where title = ?", searchTitle);
    } else if (req.query.isNotReviewed == 'true') {
        movies = await SendQuery("SELECT * from movie where id not in (select movie_id from review) order by input_date desc;", null);
    } else {
        movies = await SendQuery("SELECT * from movie order by input_date;", null);
    }
    
    if (movies != null) {
        res.status(200).send(movies);
    } else {
        res.status(400).end();
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let movie = await (SendQuery("SELECT * from movie where id=?", id));

    if (movie != null) {
        res.status(200).send(movie);
    } else {
        res.status(400).end();
    }
})

// INPUT: /movies/
router.post('/', async (req, res) => {
    if (adminPW !== req.headers.authorization) {
        res.status(400).send();
        return;
    }
    
    let movieObj = {
        title: req.body.title,
        open_year: req.body.year,
        director: req.body.director,
        poster: req.body.poster,
        input_date: new Date()
    };

    if (await SendQuery("INSERT INTO movie SET ?;", movieObj))
        res.status(200).send();
    else
        res.status(400).send();
})

// DELETE: /movies/:id
router.delete('/:id', async (req, res) => {
    if (adminPW !== req.headers.authorization) {
        res.status(400).send();
        return;
    }
    
    let result = await SendQuery("DELETE FROM movie where id=?", req.params.id);
    if (result != null) {
        console.log(result);
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
})

module.exports = router;