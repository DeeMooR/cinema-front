import React, { useEffect, useState } from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SlideInfo from 'src/components/SlideInfo'

import './VisaPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GET_MAIN_VISA } from 'src/actions/actions'

const VisaPage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    const mainVisa = useSelector(({storePages}) => storePages.mainVisa);
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        window.scrollTo({top: 0});
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING_PAGE" });
            if (Object.keys(mainVisa).length === 0) await dispatch(GET_MAIN_VISA(setModal));
            dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();
    },[])


    return (
        <>
        {modal}
        {(isLoadingPage) ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='visaPage'>
                    <div className="visaPage__main">
                        <SlideInfo slide={mainVisa} />
                    </div>
                    <div className="visaPage__wrapper">
                        <div className="visaPage__content">
                            <p className='visaPage__text'>
                                При оплате билетов в кинопространствах mooon и Silver Screen платежными карточками Visa, как в кассах, так и на сайте доступны следующие скидки:
                            </p>
                            <p className='visaPage__text'>
                                VISA GOLD – скидка 5%<br/>
                                VISA PLATINUM - скидка 10%<br/>
                                VISA SIGNATURE - скидка 10%<br/>
                                VISA INFINITE – скидка 15%<br/>
                            </p>
                            <p className='visaPage__text'>
                                Для получения скидки при покупке билетов на сайте, нажмите на одну из скидочных кнопок, которая соответствует вашей карте.
                            </p>
                            <p className='visaPage__text'>
                                Воспользоваться предложением могут держатели всех карт Visa, эмитированных следующими банками Республики Беларусь: ЗАО «Альфа-Банк», ОАО«Белагропромбанк», ОАО «АСБ Беларусбанк», ОАО «Белгазпромбанк», ОАО «БНБ-Банк», ЗAO «БСБ Банк», ЗАО «БТА Банк», ЗАО «Банк «Решение», ЗАО «МТБанк», ОАО «Паритетбанк», ОАО «Приорбанк», ЗАО «РРБ-Банк», ОАО «СтатусБанк», ЗАО «Цептер Банк».
                            </p>
                            <br/><br/>
                            <p className='visaPage__text'>
                                Внимание!
                            </p>
                            <p className='visaPage__text'>
                                При наличии в кинопространствах других акций, скидка предоставляется только по одной акции на выбор покупателя.<br/>
                                Скидки не суммируются с иными скидками, действующими в кинопространствах mooon и Silver Screen.
                            </p>
                        </div>
                    </div>
                </div>
            </PageTemplate>
        )}
        </>
    )
}

export default VisaPage
