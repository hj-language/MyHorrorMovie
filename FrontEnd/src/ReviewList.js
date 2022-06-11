import { useState, useEffect } from 'react'
import './style.css';
import axios from 'axios'

const Review = (prop) => {
  
  const handleClickView = (e) => {
    window.location.href="/reviews/"+e.target.getAttribute('name');
  }
  const handleMouseOver = (e) => {
    e.target.style.background = '#eeeeee';
  }
  const handleMouseOut = (e) => {
    e.target.style.background = 'none';
  }

  return (
    <>
      <tr>
        <td rowSpan='2'>{prop.index+1}</td>
        <td><img src={prop.data.poster} style={{height: '150px'}}></img></td>
        <td>{prop.data.title}({prop.data.open_year})</td>
        <td>{prop.data.director}</td>
        <td><img src={prop.data.scene} style={{ width: '80%'}}></img></td>
      </tr>
      <tr>
        <td colSpan='4' name={prop.data.id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClickView}>
          한줄평: {prop.data.review_text} ({prop.data.grade})
        </td>
      </tr>
    </>
  );
}

function ReviewList() {
  let [reviews, setReviews] = useState([])
  useEffect(() => {
    getReviews()
  }, [])

  const getReviews = async () => {
    try {
      const res = await axios.get('http://localhost:3030/reviews/')
      setReviews(res.data);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div class="container my-5">
      <div class="row">
        <div class="col h4">
          리뷰 목록
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>순번</th>
                <th>포스터</th>
                <th>제목(개봉년도)</th>
                <th>감독</th>
                <th>명장면</th>
              </tr>
          </thead>
          <tbody>
            {reviews.map( (r, i) => <Review key={i} data={r} index={i}/>)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}
  
export default ReviewList