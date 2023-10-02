import React, { useState, useEffect } from 'react';
import axios from 'axios';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

import {BrowserRouter as Router} from "react-router-dom"
import {Route} from "react-router-dom"
import FilmCard from './Filmler/FilmCard';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function App () {
    const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
    const [movieList, setMovieList] = useState([]);

    function hSave(id) {

        if(!saved.find((movie) => (String(movie.id) === String(id))))
        {
            console.log("hSave", movieList.find((movie) => (String(movie.id) === String(id))));
            setSaved([...saved, movieList.find((movie) => (String(movie.id) === String(id)))]);
        }
    }

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
                <KaydedilenlerListesi list={saved} />
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
                    </div>
                </Route>
                <Route exact path="/filmler/:id">
                    <FilmCard props={{flag:"detail", hSave:hSave}}/>
                </Route>
            </Router>
        </div>
    );
}
