import React from 'react';
import { useHistory, Link} from 'react-router-dom';


export default function KaydedilenlerListesi(props) {
  
    const history = useHistory();
  
    return (
        <div className="saved-list">
            <h3>Kaydedilen Filmler:</h3>
            {props.list.map(movie => (
                <>
                    <Link to={`/filmler/${movie.id}`}>
                        <span key={movie.id} className="saved-movie">{movie.title}</span>
                    </Link>
                </>
            ))}
            <div className="home-button" onClick={() => history.push("/")}>Anasayfa</div>
        </div>
    );
}
