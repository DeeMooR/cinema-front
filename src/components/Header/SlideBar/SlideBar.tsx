import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { StyledLogoBig, BackgroundSlideBar } from './../styled'
import "./SlideBar.css"

import logoBig from "src/icons/logo_big.png"
import logoBig_pink from "src/icons/logo_big_pink.png"

import background from "src/icons/slide_bar.svg"
import cross from "src/icons/cross.svg"
import account from "src/icons/account.png"

interface ISlideBar {
    clickMenu: boolean,
    setClickMenu: (value: boolean) => void,
}

const SlideBar:FC<ISlideBar> = ({ clickMenu, setClickMenu }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access');
    
    const handleClick = () => {
        setClickMenu(false);
    }
    const logoClick = () => {
        navigate('/');
        handleClick();
    }
    const accountClick = () => {
        if (token) navigate('/account');
        else navigate('/sign-in');
        handleClick();
    }

    return (
        <BackgroundSlideBar image={background} className={`slideBar ${clickMenu && 'show'}`} >
            <div className="slideBar__logo" onClick={logoClick}>
                <StyledLogoBig logo={logoBig} logo_pink={logoBig_pink} />
            </div>
            <Link to='/' className="slideBar__item" onClick={handleClick}>Главная</Link>
            <Link to='/afisha' className="slideBar__item" onClick={handleClick}>Афиша</Link>
            <Link to='/entertainment' className="slideBar__item" onClick={handleClick}>Услуги</Link>
            <Link to='/news' className="slideBar__item" onClick={handleClick}>Новости</Link>
            <div className="slideBar__icons">
                <img src={account} alt="account" className='slideBar__account' onClick={accountClick} />
            </div>
            <img src={cross} className='slideBar__cross' onClick={() => setClickMenu(false)} alt="cross"  />
        </BackgroundSlideBar>
    )
}

export default SlideBar
