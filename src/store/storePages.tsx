import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
    entertainmentNews: [],
    newsPageNews: [],
    sliderSwiper: [],
    seatTypes: [],
    mainNews: [],
    afishaNews: [],
    mainVisa: {},
    mainEntertainment: {},
    mainPresentCard: {},
    arrRooms: [],
    arrMovies: [],
    arrSeances: []
};

const rootReducerPages = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_ENTERTAINMENT_NEWS': {
            return {
                ...state,
                entertainmentNews: action.payload,
            };
        }
        case 'SET_NEWSPAGE_NEWS': {
            return {
                ...state,
                newsPageNews: action.payload,
            };
        }
        case 'SET_SLIDER_SWIPER': {
            return {
                ...state,
                sliderSwiper: action.payload,
            };
        }
        case 'SET_SEAT_TYPES': {
            return {
                ...state,
                seatTypes: action.payload,
            };
        }
        case 'SET_MAIN_NEWS': {
            return {
                ...state,
                mainNews: action.payload,
            };
        }
        case 'SET_AFISHA_NEWS': {
            return {
                ...state,
                afishaNews: action.payload,
            };
        }
        case 'SET_MAIN_VISA': {
            return {
                ...state,
                mainVisa: action.payload,
            };
        }
        case 'SET_MAIN_ENTERTAINMENT': {
            return {
                ...state,
                mainEntertainment: action.payload,
            };
        }
        case 'SET_MAIN_PRESENT_CARD': {
            return {
                ...state,
                mainPresentCard: action.payload,
            };
        }
        case 'SET_ROOMS': {
            return {
                ...state,
                arrRooms: action.payload,
            };
        }
        case 'SET_MOVIES': {
            return {
                ...state,
                arrMovies: action.payload,
            };
        }
        case 'SET_SEANCES': {
            return {
                ...state,
                arrSeances: action.payload,
            };
        }
        default: return state;
    }
};

// const storePage = createStore(
//     rootReducerPages, 
//     composeWithDevTools(applyMiddleware(thunk))
// );

export default rootReducerPages;