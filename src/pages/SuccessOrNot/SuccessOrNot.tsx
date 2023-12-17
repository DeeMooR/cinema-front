import React, { FC, useState } from 'react'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'
import { useNavigate } from 'react-router-dom'
import './SuccessOrNot.css'

interface ISuccessOrNot {
    success: boolean,
}

const SuccessOrNot:FC<ISuccessOrNot> = ({success}) => {
    const navigate = useNavigate();
    return (
        <PageFormTemplate page={`${success ? 'Success' : 'Error'}`}>
            <div className='successOrNot'>
                {success ? (
                    <>
                    <p className='successOrNot__text'>Email confirmed.<br/>Your registration is now completed</p>
                    <ButtonForm handleClick={() => navigate('/sign-in')}>Go to Sign In</ButtonForm>
                    </>
                ) : (
                    <>
                    <p className='successOrNot__text'>Email not verified.<br/>Your registration is not complete</p>
                    <ButtonForm handleClick={() => navigate('/sign-up')}>Go to Sign Up</ButtonForm>
                    </>
                )}
            </div>
        </PageFormTemplate>
    )
}

export default SuccessOrNot
