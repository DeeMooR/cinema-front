import React, { FC, useEffect, useState } from 'react';
import { IMovie } from 'src/interfaces';
import Button from '../Button';
import './ModalTextButton.css'

import cross from "src/icons/cross.svg"
import { Link } from 'react-router-dom';

interface IModalTextButton {
    isOpen: boolean,
    setIsOpen: (v: boolean) => void,
    setIsOpenOther?: (v: boolean) => void,
    type: 'age18' | 'goSignIn'
}

const ModalTextButton:FC<IModalTextButton> = ({isOpen, setIsOpen, setIsOpenOther, type}) => {
    if (isOpen) {
        document.body.style.overflowY = 'hidden';
        document.body.style.padding = '0 7px 0 0';
    }
    const clickClose = () => {
        setIsOpen(false);
        if (setIsOpenOther) setIsOpenOther(false);
        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            document.body.style.padding = '0';
        },400);
    }
    const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) clickClose();
    };

    useEffect(() => {
        setIsOpen(true);
    }, [])

    return (
        <div className={`modalTextButton__background ${isOpen? 'open' : ''}`} onClick={(e) => clickBackground(e)}>
            <div className={`modalTextButton ${isOpen ? 'open' : ''}`}>
                <div className="modalTextButton__content">
                    <img src={cross} className='modalTextButton__cross' onClick={clickClose} alt="cross" />
                    {type === 'age18' ? (
                        <>
                        <p className='modalTextButton__title'>Обращаем внимание!</p>
                        <p className='modalTextButton__text'>Показ фильма разрешен зрителям старше 18 лет</p>
                        </>
                    ) : (
                        <>
                        <p className='modalTextButton__title'>Требуется авторизация!</p>
                        <p className='modalTextButton__text'>Для покупки билета в кино необходимо <Link to='/sign-in'>войти в аккаунт</Link></p>
                        </>
                    )}
                    <Button color='red' fill handleClick={clickClose}>Понятно</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalTextButton;
