import React, { useState, useEffect } from 'react';
import axios from 'axios';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

import {BrowserRouter as Router} from "react-router-dom"
import {Route} from "react-router-dom"
import FilmCard from './Filmler/FilmCard';

export default function App () {
    const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
    const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

    return (
        <div>
            <Router>
                <Route exact path="/">
                    <div className="movie-list">
                        {
                            movieList.map((movie) =>
                            {
                                const props = {
                                    movie: movie,
                                    flag: "list-item"
                                };
                                return <FilmCard key={movie.id} props={props}/>
                            })
                        }
                        {/* <FilmListesi movies={movieList}/> */}
                    </div>
                </Route>
                <Route exact path="/filmler/:id">
                    <FilmCard props={{flag:"detail"}}/>
                </Route>
                    <KaydedilenlerListesi list={[ /* Burası esnek */]} />
                {/* <div>Bu Div'i kendi Routelarınızla değiştirin</div> */}
            </Router>
        </div>
    );
}
