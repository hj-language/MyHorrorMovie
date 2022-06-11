import { useState, useEffect } from 'react'
import axios from 'axios'

const Movie = (prop) => {
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
        </td>
      </tr>
    </>
  );
}
  
function AllMovieList() {
  let [movies, setMovies] = useState([])
  let [title, setTitle] = useState('');
  const handleTitle = (e) => { setTitle(e.target.value) }

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    try {
      let res = await axios.get('http://localhost:3030/movies?isNotReviewed=false')
      setMovies(res.data);
    } catch (e) {
      console.log(e)
    }
  };

  const handleClickSearch = async () => {
    try {
      let res = await axios.get('http://localhost:3030/movies?title='+title)
      setMovies(res.data);
    } catch (e) {
      console.log(e)
    }
}

  return (
    <div class="container my-5">
      <div class="row">
        <div class="col h4">
          전체 영화 목록
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
                <th>등록</th>
              </tr>
            </thead>
            <tbody>
              {movies.map( (r, i) => <Movie key={i} data={r} index={i}/>)}
            </tbody>
          </table>
        </div>
        <div class="row">
          <label for="movie_title" class="form-label col-3">제목 검색</label>
          <input
              class="form-control col"
              id="movie_title"
              value = {title}
              onChange = {handleTitle}
          />
          <button class="btn btn-outline-primary col-2" onClick={handleClickSearch}>검색</button>
        </div>
      </div>
    </div>
  );
}
    
export default AllMovieList;