import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'

const CommentInput = () => {
  let [commentText, setCommentText] = useState('');
  let [nickname, setNickname] = useState('');
  let [password, setPassword] = useState('');
  const handleCommentText = (e) => { setCommentText(e.target.value) }
  const handleNickname = (e) => { setNickname(e.target.value) }
  const handlePassword = (e) => { setPassword(e.target.value) }

  let reviewId = useParams().reviewId;

  const handleClickCommentInput = () => {
    console.log("click")
    let obj = {
      comment_text: commentText,
      nickname: nickname,
      password: password
    };
    axios.post('http://localhost:3030/comments/'+reviewId, obj)
    .then(res => {
        alert("성공!");
        window.location.href="/reviews/"+reviewId;
    })
    .catch(err => {
        alert("실패!");
    })
  }

  return (
    <div class="row my-1">
      <div class="col-3">
        <input
          class="form-control"
          id="comment_text"
          value = {nickname}
          onChange = {handleNickname}
          placeholder = "닉네임"
        />
        <input
          class="form-control"
          id="comment_text"
          value = {password}
          onChange = {handlePassword}
          type = "password"
          placeholder = "비밀번호"
        />
      </div>
      <div class="row col">
        <input
            class="form-control"
            id="comment_text"
            value = {commentText}
            onChange = {handleCommentText}
            placeholder = "댓글 내용"
        />
      </div>
      <button class="btn btn-outline-primary col-2 mx-3" onClick={handleClickCommentInput}>등록</button>
    </div>
  )
}

const Comment = (prop) => {
  console.log(prop.data);

  let reviewId = useParams().reviewId;

  const handleClickUpdate = (e) => {
    let commentText = prompt('수정할 내용을 입력하세요');
    let password = prompt('비밀번호를 입력하세요');
    let config = {
      headers: { Authorization: password }
    };
    let obj = {
      comment_text: commentText
    };
    axios.put('http://localhost:3030/comments/'+e.target.name, obj, config)
    .then(res => {
        console.log(res);
        alert("성공!");
        window.location.href="/reviews/"+reviewId;
    })
    .catch(err => {
        alert("실패!");
        console.log(err);
    })
  }

  const handleClickDelete = (e) => {
    let password = prompt('비밀번호를 입력하세요');
    let config = {
      headers: { Authorization: password }
    };
    axios.delete('http://localhost:3030/comments/'+e.target.name, config)
    .then(res => {
        console.log(res);
        alert("성공!");
        window.location.href="/reviews/"+reviewId;
    })
    .catch(err => {
        alert("실패!");
        console.log(err);
    })
  }

  return (
   <tr>
      <td width="20%">{prop.data.nickname}</td>
      <td>{prop.data.comment_text}</td>
      <td width="30%">
        <button class="btn btn-outline-primary" name={prop.data.id} onClick={handleClickUpdate}>수정</button>
        <button class="btn btn-outline-primary" name={prop.data.id} onClick={handleClickDelete}>삭제</button>
      </td>
    </tr>
  )
}

const Comments = () => {
  let [comments, setComments] = useState([])
  useEffect(() => {
      getComments()
  }, {})

  let reviewId = useParams().reviewId;

  const getComments = async() => {
      try {
        const res = await axios.get('http://localhost:3030/comments/'+reviewId);
        setComments(res.data);
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <>
      <tr>
        <th>작성자</th>
        <th>내용</th>
        <th>수정/삭제</th>
      </tr>
      {comments.map( (r, i) => <Comment key={i} data={r} index={i}/>)}
      <tr>
        <td colSpan='3'><CommentInput /></td>
      </tr>
    </>
  )
}

function ReviewView() {
  let [review, setReview] = useState({})
  useEffect(() => {
      getReview()
  }, {})

  let reviewId = useParams().reviewId;

  const getReview = async() => {
      try {
        const res = await axios.get('http://localhost:3030/reviews/'+reviewId);
        setReview(res.data[0]);
      } catch (e) {
        console.log(e);
      }
  };

  const handleClickUpdate = (e) => {
    window.location.href="/reviews/update/"+e.target.name;
  }

  const handleClickDelete = (e) => {
    let password = prompt('비밀번호를 입력하세요');
    let config = {
      headers: { Authorization: password }
    };
    axios.delete('http://localhost:3030/reviews/'+e.target.name, config)
    .then(res => {
        console.log(res);
        alert("성공!");
        window.location.href="/reviews";
    })
    .catch(err => {
        alert("실패!");
        console.log(err);
    })
  }

  return (
    <div class="container my-5">
      <div class="row">
        <div class="col h4">
          리뷰 보기
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>제목(개봉년도)</th>
                <th>감독</th>
                <th>포스터</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{review.title}({review.open_year})</td>
                <td>{review.director}</td>
                <td><img src={review.poster} style={{ height: '200px'}}></img></td>
              </tr>
              <tr>
                <th>한줄평</th>
                <td colSpan='2'>{review.review_text}</td>
              </tr>
              <tr>
                <th>평점</th>
                <td colSpan='2'>{review.grade}</td>
              </tr>
              <tr>
                <th>명장면</th>
                <td colSpan='2'>
                  <img src={review.scene} style={{ width: '80%'}}></img>
                </td>
              </tr>
              <tr>
                <td colSpan='3' class="text-end">
                  <button class="btn btn-outline-primary" name={review.id} onClick={handleClickUpdate}>수정</button>
                  <button class="btn btn-outline-primary" name={review.id} onClick={handleClickDelete}>삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="py-2" colSpan='3'>댓글 목록</th>
              </tr>
            </thead>
            <tbody>
              <Comments />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
  
export default ReviewView;