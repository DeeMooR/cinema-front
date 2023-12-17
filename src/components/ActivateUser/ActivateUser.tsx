import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ACTIVATE_USER } from "src/actions/actions";
import PageFormTemplate from "../PageFormTemplate";

const ActivateUser = () => {
    const { uid, token } = useParams();
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();

    useEffect(() => {
        if (uid && token) dispatch(ACTIVATE_USER(navigate, uid, token));
    }, [uid, token]);

    return (
        <PageFormTemplate page='Activating'>
            <div className="loader">
                <div className="loader__element"></div>
            </div>
        </PageFormTemplate>
    )
};

export default ActivateUser;
