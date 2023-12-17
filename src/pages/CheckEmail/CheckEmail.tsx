import React, { FC, useState } from 'react'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'
import { useNavigate } from 'react-router-dom'
import './CheckEmail.css'

interface ICheckEmail {
    messege: 'register' | 'reset password'
}

const CheckEmail:FC<ICheckEmail> = ({messege}) => {
    const navigate = useNavigate();
    return (
        <PageFormTemplate page='Check email'>
            <div className='checkEmail'>
                <p className='checkEmail__text'>A confirmation letter was sent to email.<br/>Follow the link in the email to {messege}</p>
                <ButtonForm handleClick={() => navigate('/sign-in')}>Go to Sign In</ButtonForm>
            </div>
        </PageFormTemplate>
    )
}

export default CheckEmail
