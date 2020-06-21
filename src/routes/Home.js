import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../component/Movie';
import './Home.css';

class Home extends Component {
  
  state = {
    isLoading : true,
    moves : [],
  };

  getMovies = async() => {

    const {
      data : {
        data : {movies},
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading:false}); // 앞에 movies는 state고, 뒤에 movies는 구조분해할당으로 얻은 영화 데이터
  }

  componentDidMount(){
    this.getMovies();
  }

  render(){
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
      {isLoading ? ( 
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ):(
       <div className="movies">
        {movies.map((movie)=> (
          <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}
            />
        ))}
      </div>
       )}
      </section>
      );
  }
}

export default Home;
