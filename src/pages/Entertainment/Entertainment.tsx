import React, { useEffect, useState } from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SlideInfo from 'src/components/SlideInfo'

import { INews } from 'src/interfaces'
import HorizontalNews from 'src/components/HorizontalNews'
import './Entertainment.css'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GET_ENTERTAINMENT_NEWS } from 'src/actions/actions'

const Entertainment = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrEntertainmentNews: INews[] = useSelector(({storePages}) => storePages.entertainmentNews);
    const mainEntertainment = useSelector(({storePages}) => storePages.mainEntertainment);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        window.scrollTo({top: 0});
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrEntertainmentNews.length) await dispatch(GET_ENTERTAINMENT_NEWS(setModal));
            dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();
    },[])

    return (
        <>
        {modal}
        {isLoadingPage ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='entertainment'>
                    <div className="entertainment__main">
                        <SlideInfo slide={mainEntertainment} reverse />
                    </div>
                    <div className="entertainment__content">
                        {arrEntertainmentNews.map((item: INews, index: number) => (
                            <div className="news__item" key={index}>
                                {index % 2 === 0
                                ? <HorizontalNews obj={item} page='other' />
                                : <HorizontalNews obj={item} page='other' reverse />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </PageTemplate>
        )}
        </>
    )
}

export default Entertainment
