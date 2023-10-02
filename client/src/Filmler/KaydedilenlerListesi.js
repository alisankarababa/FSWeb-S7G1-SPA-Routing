import React from 'react';
import { useHistory, Link, NavLink} from 'react-router-dom';

import "./KaydedilenlerListesi.css"

export default function KaydedilenlerListesi(props) {
  
    const history = useHistory();
  
    return (
        <div className="saved-list">
            <h3>Kaydedilen Filmler:</h3>
            {props.list.map(movie => (
                <>
                    <NavLink to={`/filmler/${movie.id}`}>
                        <span key={movie.id} className="saved-movie">{movie.title}</span>
                    </NavLink>
                </>
            ))}
            <div className="home-button" onClick={() => history.push("/")}>Anasayfa</div>
        </div>
    );
}
