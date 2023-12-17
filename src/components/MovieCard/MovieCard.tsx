import React, { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IMovie } from '../../interfaces'
import { StyledImage } from './styled'
import './MovieCard.css'
import Button from '../Button'
import { useDispatch } from 'react-redux'

interface IMovieCard {
    obj: IMovie,
    page: 'afisha' | 'main'
}

const MovieCard:FC<IMovieCard> = ({obj, page}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState(`${window.innerWidth < 900 ? 'Купить' : 'Купить билет'}`);

    const moveNewPage = () => {
        navigate(`/afisha/${obj.id}`, {state: {fromPage: `/${page}`}});
    }
  
    useEffect(() => {
        const updateButtonText = () => {
            if (window.innerWidth < 900) setButtonText('Купить');
            else setButtonText('Купить билет');
        };

        window.addEventListener('resize', updateButtonText);
        return () => window.removeEventListener('resize', updateButtonText);
    }, []);

    return (
        <div className={`movieCard movieCard-${page}`}>
            <StyledImage image={obj.image} className='movieCard__image' onClick={moveNewPage}></StyledImage>
            <article className='movieCard__info'>
                <p className='movieCard__age-lang'>{obj.age}+ / {obj.language}</p>
                <h2 className='movieCard__title' onClick={moveNewPage}>{obj.title}</h2>
                <p className='movieCard__genres'>{obj.genres.join(', ')}</p>
                {page === 'afisha' 
                ? <Button color='red' handleClick={moveNewPage}>Купить билет</Button>
                : <Button color='red' handleClick={moveNewPage}>{buttonText}</Button>
                }
            </article> 
        </div>
    )
}

export default MovieCard
