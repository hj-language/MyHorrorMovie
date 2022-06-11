const { useState, useEffect } = require('react');
const axios = require('axios');

function InputMovie() {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [poster, setPoster] = useState('');
 
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleYear = (e) => {
        setYear(e.target.value)
    }
    const handleDirector = (e) => {
        setDirector(e.target.value)
    }
    const handlePoster = (e) => {
        setPoster(e.target.value)
    }

    const handleClickInput = () => {
        let password = prompt('비밀번호를 입력하세요');
        let obj = {
            director: director,
            title: title,
            year: year,
            poster: poster
        };
        let config = {
            headers: { Authorization: password }
        };
        axios.post('http://localhost:3030/movies', obj, config)
        .then(res => {
            alert("성공!");
            window.location.href="/movies";
        })
        .catch(err => {
            alert("실패!");
        })
    }

    return (
        <div class="container my-5">
            <div class="row">
                <div class="col h4">
                    영화 등록
                </div>
            </div>
            <div class="row">
                <label for="movie_title" class="form-label col-3">영화 제목</label>
                <input
                    class="form-control col"
                    id="movie_title"
                    value = {title}
                    onChange = {handleTitle}
                />
            </div>
            <div class="row">
                <label for="movie_openYear" class="form-label col-3">개봉년도</label>
                <input
                    class="form-control col"
                    id="movie_openYear"
                    value = {year}
                    onChange = {handleYear}
                />
            </div>
            <div class="row">
                <label for="movie_director" class="form-label col-3">감독</label>
                <input
                    class="form-control col"
                    id="movie_director"
                    value = {director}
                    onChange = {handleDirector}
                />
            </div>
            <div class="row">
                <label for="movie_poster" class="form-label col-3">포스터</label>
                <input
                    class="form-control col"
                    id="movie_poster"
                    value = {poster}
                    onChange = {handlePoster}
                />
            </div>
            
            <div class="row">
                <div class="col text-end">
                    <button class="btn btn-outline-primary">목록</button>
                    <button class="btn btn-outline-primary" onClick={handleClickInput}>등록</button>
                </div> 
            </div>
        </div>
    );
}
        
export default InputMovie;