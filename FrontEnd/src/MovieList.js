import { useState, useEffect } from 'react'
import axios from 'axios'

const Movie = (prop) => {

  const handleClickDelete = (e) => {
    let password = prompt('비밀번호를 입력하세요');
    let config = {
      headers: { Authorization: password }
    };
    axios.delete('http://localhost:3030/movies/'+e.target.name, config)
    .then(res => {
        console.log(res);
        alert("성공!");
        window.location.href="/movies";
    })
    .catch(err => {
        alert("실패!");
        console.log(err);
    })
  }
  
  const handleClickInput = (e) => {
    window.location.href="/reviews/input/"+e.target.name;
  }

  return (
    <>
      <tr>
        <td>{prop.index+1}</td>
        <td>{prop.data.title}({prop.data.open_year})</td>
        <td>{prop.data.director}</td>
        <td><img src={prop.data.poster} style={{ height: '150px'}}></img></td>
        <td>
          <button class="btn btn-outline-primary" name={prop.data.id} onClick={handleClickInput}>등록</button>
          <button class="btn btn-outline-primary" name={prop.data.id} onClick={handleClickDelete}>삭제</button>
        </td>
      </tr>
    </>
  );
}
  
function MovieList() {
  let [movies, setMovies] = useState([])
  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async() => {
    try {
      let res = await axios.get('http://localhost:3030/movies?isNotReviewed=true')
      setMovies(res.data);
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div class="container my-5">
      <div class="row">
        <div class="col h4">
          리뷰 안 된 영화 목록
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>순번</th>
                <th>제목(개봉년도)</th>
                <th>감독</th>
                <th>포스터</th>
                <th>등록/삭제</th>
              </tr>
          </thead>
          <tbody>
            {movies.map( (r, i) => <Movie key={i} data={r} index={i}/>)}
          </tbody>
        </table>
      </div> 
    </div>
  </div>
  );
}
    
export default MovieList;