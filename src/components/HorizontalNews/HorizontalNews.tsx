import React, { FC } from 'react'
import './HorizontalNews.css'
import { BackgroundImage } from './styled'
import Button from '../Button'
import { IMovie, INews } from 'src/interfaces'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface IHorizontalNews {
    obj: INews,
    page: 'main' | 'other'
    reverse?: boolean,
}

const HorizontalNews:FC<IHorizontalNews> = ({obj, page, reverse}) => {
    const navigate = useNavigate();
    
    const clickButton = () => {
        if (obj.link) navigate(`${obj.link}`);
        else navigate('/page404');
    }

    console.log(obj)

    return (
        <>
        {obj &&
            <div className={`horizontalNews ${reverse ? 'reverse' : ''} horizontalNews-${page}`}>
                <BackgroundImage image={obj.background_image ? obj.background_image : obj.image} page={page} />
                <div className="horizontalNews__wrapper">
                    <div className="horizontalNews__flex">
                        <div className="horizontalNews__info">
                            {obj.date && <div className="horizontalNews__date">{obj.date}</div>}
                            <div className="horizontalNews__title">{obj.title}</div>
                            <div className="horizontalNews__description">{obj.description}</div>
                            <Button color='red' handleClick={clickButton}>Подробнее</Button>
                        </div>
                        <div className="horizontalNews__image">
                            <img src={obj.image} alt="image" />
                        </div>
                    </div>
                </div>
            </div>
        }
        </> 
    )
}

export default HorizontalNews
