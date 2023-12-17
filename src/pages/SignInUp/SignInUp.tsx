import React, { FC, useEffect, useState } from 'react'
import './SignInUp.css'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { CREATE_USER, SIGN_IN } from 'src/actions/actions'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'
import ModalSuccess from 'src/components/ModalSuccess'
import { IMovie } from 'src/interfaces'

interface ISignInUp {
    page: 'Sign In' | 'Sign Up'
}

const SignInUp:FC<ISignInUp> = ({page}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const arrMovieIsFilled = (arrMovies.length) ? true : false;
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [isEmptyName, setIsEmptyName] = useState(false);
    const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    const [isMismatch, setIsMismatch] = useState(false);

    const [modal, setModal] = useState(<div/>);
    const isLoading = useSelector(({store}) => store.isLoading);

    const location = useLocation();
    const fromPage = (location.state && location.state.fromPage) ? location.state.fromPage : '';

    const clickButton = () => {
        if (page === 'Sign Up' && name === '') setIsEmptyName(true);
        if (page === 'Sign Up' && (password !== confirmPassword || password === '' || confirmPassword === '')) setIsMismatch(true);
        if (page === 'Sign In' && password === '') setIsMismatch(true);
        if (page === 'Sign In' && password !== '') setIsMismatch(false);    // если после красного password в Sign Up перейти в Sign In и нажать на button
        if (email === '') setIsEmptyEmail(true);
        
        if (page === 'Sign In' && email !== '' && password !== '') dispatch(SIGN_IN(navigate, email, password, fromPage, arrMovieIsFilled, setModal));
        if (page === 'Sign Up' && name !== '' && email !== '' && password !== '' && password === confirmPassword) {
            dispatch(CREATE_USER(navigate, {username: name, email, password}, setModal));
        }
    }

    useEffect(() => {
        setIsMismatch(false);
    },[password, confirmPassword])
    useEffect(() => {
        setIsEmptyName(false);
    },[name])
    useEffect(() => {
        setIsEmptyEmail(false);
    },[email])

    return (
        <PageFormTemplate page={page}>
            {modal}
            {isLoading ? (
                <div className="loader">
                    <div className="loader__element"></div>
                </div>
            ) : (
                <div className={`sign ${page === 'Sign In' ? 'signIn' : 'signUp' }`}>
                    <div className="sign__inputs">
                        {page === 'Sign Up' &&
                            <Input title='Name' type='text' placeholder='Your name' value={name} handleChange={setName} defect={isEmptyName} />
                        }
                        <Input title='Email' type='email' placeholder='Your email' value={email} handleChange={setEmail} defect={isEmptyEmail} />
                        <Input title='Password' type='password' placeholder='Your password' value={password} handleChange={setPassword} forgot={page === 'Sign In' ? true : false} defect={isMismatch} />
                        {page === 'Sign Up' &&
                            <Input title='Confirm password' type='password' placeholder='Confirm password' value={confirmPassword} handleChange={setConfirmPassword} defect={isMismatch} />
                        }
                    </div>
                    <ButtonForm handleClick={clickButton}>{page}</ButtonForm>
                    {page === 'Sign In'
                    ? <p className='sign__have-account'>Don’t have an account? <Link to='/sign-up'>Sign Up</Link></p>
                    : <p className='sign__have-account'>Already have an account? <Link to='/sign-in'>Sign In</Link></p>
                    }
                </div>
            )}
        </PageFormTemplate>
    )
}

export default SignInUp
