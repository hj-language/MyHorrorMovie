import { useParams } from 'react-router-dom';
const { useState, useEffect } = require('react');
const axios = require('axios');

function UpdateReview() {
    const [reviewText, setReviewText] = useState('');
    const [grade, setGrade] = useState('');
    const [scene, setScene] = useState('');
 
    const handleReviewText = (e) => { setReviewText(e.target.value) }
    const handleGrade = (e) => { setGrade(e.target.value) }
    const handleScene = (e) => { setScene(e.target.value) }

    //let [review, setReview] = useState({})
    useEffect(() => {
        getReview()
    }, {})

    let reviewId = useParams().reviewId;

    const getReview = async() => {
        try {
          const res = await axios.get('http://localhost:3030/reviews/'+reviewId);
          setReviewText(res.data[0].review_text);
          setGrade(res.data[0].grade);
          setScene(res.data[0].scene);
        } catch (e) {
          console.log(e);
        }
    };

    const handleClickUpdate = () => {
        let password = prompt('비밀번호를 입력하세요');
        let obj = {
            review_text: reviewText,
            grade: grade,
            scene: scene
        };
        let config = {
            headers: { Authorization: password }
        };
        axios.put('http://localhost:3030/reviews/'+reviewId, obj, config)
        .then(res => {
            alert("성공!");
            window.location.href="/reviews/"+reviewId;
        })
        .catch(err => {
            alert("실패!");
        })
    }

    return (
        <div class="container my-5">
            <div class="row">
                <div class="col h4">
                    리뷰 수정
                </div>
            </div>
            <div class="row">
                <label for="reviewText" class="form-label col-3">한줄 평</label>
                <input
                    class="form-control col"
                    id="reviewText"
                    value = {reviewText}
                    onChange = {handleReviewText}
                />
            </div>
            <div class="row">
                <label for="movie_openYear" class="form-label col-3">평점</label>
                <input
                    class="form-control col"
                    id="grade"
                    value = {grade}
                    onChange = {handleGrade}
                />
            </div>
            <div class="row">
                <label for="scene" class="form-label col-3">명장면</label>
                <input
                    class="form-control col"
                    id="scene"
                    value = {scene}
                    onChange = {handleScene}
                />
            </div>
            
            <div class="row">
                <div class="col text-end">
                    <button class="btn btn-outline-primary" >목록</button>
                    <button class="btn btn-outline-primary" onClick={handleClickUpdate}>수정</button>
                </div> 
            </div>
        </div>
    );
}
        
export default UpdateReview;