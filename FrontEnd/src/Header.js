function Header() {
    return (
      <div class="container">
        <div class="row">
          <a class="col h1 py-3 mt-5" href='/' style={{ textDecoration: 'none'}}>
            HORROR MOVIE REVIEW BLOG
          </a>    
        </div>
        <hr/>
        <div class="row">
          <div class="col">
            <a class="col btn btn-outline-info" href='/reviews' role="button">
              리뷰 목록 보기
            </a>  
          </div>   
          <div class="col">
            <a class="col btn btn-outline-info" href='/movies' role="button">
              리뷰 안 된 영화 목록 보기
            </a>  
          </div>
          <div class="col">
            <a class="col btn btn-outline-info" href='/allMovies' role="button">
              전체 영화 목록 보기
            </a>  
          </div>
          <div class="col">
            <a class="col btn btn-outline-info" href='/movies/input' role="button">
              영화 등록하기
            </a>  
          </div>    
        </div>
        <hr class="mb-5"/>
      </div>
    );
  }
  
  export default Header;
  