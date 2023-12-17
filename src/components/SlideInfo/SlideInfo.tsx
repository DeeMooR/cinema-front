import React, { FC } from 'react'
import Button from 'src/components/Button'
import { IMovie, ISlide } from 'src/interfaces'
import './SlideInfo.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface ISlideInfo {
    slide: ISlide,
    reverse?: boolean
}

const SlideInfo:FC<ISlideInfo> = ({slide, reverse}) => {
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const navigate = useNavigate();
    let filmTitle, filmGenres;
    const isMain = typeof slide.idFilm === 'number' || slide.textButton;

    if (arrMovies.length && typeof slide.idFilm === 'number') {
        filmTitle = arrMovies[slide.idFilm].title;
        filmGenres = arrMovies[slide.idFilm].genres.join(', ') + ', ' + arrMovies[slide.idFilm].age + '+';
    }

    const clickButton = () => {
        if (typeof slide.idFilm === 'number') {
            navigate(`/afisha/${slide.idFilm}`, {state: {fromPage: '/main'}});
        } else if (slide.link) {
            navigate(slide.link);
        } else navigate('/page404');
    }

    return (
        <div className={`slideInfo slideInfo-${isMain ? 'main' : 'otherPage'}`}>
            <img src={slide.image} className='slideInfo__image' />
            <div className='slideInfo__wrapper'>
                <div className={`slideInfo__description ${reverse ? 'description-reverse' : ''}`}>
                    <p className="slideInfo__genres">
                        {filmGenres ? filmGenres : slide.text}
                    </p>
                    <h2 className="slideInfo__title">
                        {filmTitle ? filmTitle : slide.title}
                    </h2>
                    {isMain &&
                        <div className="slideInfo__button">
                            <Button color='red' handleClick={clickButton}>
                                {slide.textButton ? slide.textButton : 'Купить билет'}
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SlideInfo
