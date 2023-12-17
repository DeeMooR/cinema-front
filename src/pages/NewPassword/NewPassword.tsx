import React, { FC, useEffect, useState } from 'react'
import './NewPassword.css'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RESET_PASSWORD, RESET_PASSWORD_CONFIRM } from 'src/actions/actions'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'

const NewPassword = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isMismatch, setIsMismatch] = useState(false);
    const [modal, setModal] = useState(<div/>);
    const isLoading = useSelector(({store}) => store.isLoading);
    const { uid, token } = useParams();

    const clickButton = () => {
        if (password !== confirmPassword) {
            setIsMismatch(true);
            return;
        }
        if (uid && token) dispatch(RESET_PASSWORD_CONFIRM(navigate, uid, token, password, setModal));
    }
    useEffect(() => {
        setIsMismatch(false);
    },[password, confirmPassword])

    return (
        <PageFormTemplate page='New password'>
            {modal}
            {isLoading ? (
                <div className="loader">
                    <div className="loader__element"></div>
                </div>
            ) : (
                <div className='newPassword'>
                    <div className="newPassword__inputs">
                        <Input title='Password' type='password' placeholder='Your password' value={password} handleChange={setPassword} defect={isMismatch} />
                        <Input title='Confirm password' type='password' placeholder='Confirm password' value={confirmPassword} handleChange={setConfirmPassword} defect={isMismatch} />
                    </div>
                    <ButtonForm handleClick={clickButton}>Set password</ButtonForm>
                </div>
            )}
        </PageFormTemplate>
    )
}

export default NewPassword
