import React, { FC, useState } from 'react'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'
import { useNavigate } from 'react-router-dom'
import './NewPasswordSuccess.css'

const NewPasswordSuccess = () => {
    const navigate = useNavigate();
    return (
        <PageFormTemplate page='Success'>
            <div className='newPasswordSuccess'>
                <p className='newPasswordSuccess__text'>The password was successfully changed</p>
                <ButtonForm handleClick={() => navigate('/sign-in')}>Go to Sign In</ButtonForm>
            </div>
        </PageFormTemplate>
    )
}

export default NewPasswordSuccess
