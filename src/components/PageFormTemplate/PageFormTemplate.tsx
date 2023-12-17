import React, { FC, ReactNode } from 'react'
import './PageFormTemplate.css'
import { BackgroundImage } from './styled'
import { useLocation, useNavigate } from 'react-router-dom'

import left from "src/icons/left.svg"

interface IPageFormTemplate {
    children: ReactNode,
    page: string,
}

const PageFormTemplate:FC<IPageFormTemplate> = ({children, page}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const bg_image = "https://i.ibb.co/TLxy6cz/sign-background.png";

    const clickLeft = () => {
        if (location.state && location.state.fromPage !== '/presentcard' && location.state.fromPage.slice(0, 11) !== '/buy-ticket') navigate('/');
        else navigate(-1);
    }
    return (
        <div className='pageFormTemplate'>
            <div className="pageFormTemplate__left" onClick={clickLeft}>
                <img src={left} alt="left" />
            </div>
            <BackgroundImage image={bg_image} />
            <div className="pageFormTemplate__form">
                <p className={`pageFormTemplate__title ${page === 'Sign Up' ? 'title-small' : ''}`}>{page}</p>
                {children}
            </div>
            <p className='pageFormTemplate__license'>© All Rights Reserved</p>
        </div>
    )
}

export default PageFormTemplate
