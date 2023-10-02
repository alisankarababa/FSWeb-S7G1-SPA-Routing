import React , {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function FilmCard (props) {
    
    const {flag} = props.props;
    const history = useHistory();
    const [movie, setMovie] = useState(null);
    
    function hClick(id)
    {
        history.push(`/filmler/${id}`);
    }
    
    const {id} = useParams();
    useEffect(() => {
            axios
            .get(`http://localhost:5001/api/filmler/${id}`) // Bu uç noktayı Postman'le çalışın
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);
    
    if(flag === "list-item")
    {
        const { title, director, metascore} = props.props.movie;
        return (
            <div className="movie-card" onClick={() => hClick(props.props.movie.id)}>
                <h2>{title}</h2>
                <div className="movie-director">
                    Director: <em>{director}</em>
                </div>
                <div className="movie-metascore">
                    Metascore: <strong>{metascore}</strong>
                </div>
            </div>
        )
    }
    else if( flag === "detail" && movie)
    {
        return (
        <div className="save-wrapper">
            <div className="movie-card">
                <h2>{movie.title}</h2>
                <div className="movie-director">
                    Director: <em>{movie.director}</em>
                </div>
                <div className="movie-metascore">
                    Metascore: <strong>{movie.metascore}</strong>
                </div>
                <h3>Actors</h3>
                {movie.stars.map(star => (
                    <div key={star} className="movie-star">
                        {star}
                    </div>
                ))}
            </div>
            <div className="save-button">Kaydet</div>
        </div>


        );
    }
}

      

