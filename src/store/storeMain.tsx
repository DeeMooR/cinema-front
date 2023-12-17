import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import { IDataGiftCard, IDataGiftSelect, IDataSeatSelect } from 'src/interfaces';

const initialState = {
    navActive: '',
    idActiveMoviePage: '',
    search: {
        date: '',
        video: [],
        audio: [],
        language: [],
    },
    user: {
        username: '',
        email: '',
        id: null,
    },
    movieTypeSelect: 'already', 
    giftCards: [],
    giftSelect: [],
    seatSelect: [],
    myCards: [],
    myMovies: [],
    isLoading: false,
    isLoadingPage: false,
};

const rootReducerMain = (state = initialState, action: any) => {
    switch (action.type) {
        case 'TOGGLE_NAV_ACTIVE': {
            return {
                ...state,
                navActive: action.payload
            };
        }
        case 'SET_ID_ACTIVE_MOVIE_PAGE': {
            return {
                ...state,
                idActiveMoviePage: action.payload
            };
        }
        case 'SET_SEARCH': {
            const {type, data} = action.payload;
            return {
                ...state,
                search: {
                    ...state.search,
                    [type]: data
                }
            };
        }
        case 'CLEAR_SEARCH': {
            return {
                ...state,
                search: {
                    date: action.payload,
                    video: [],
                    audio: [],
                    language: [],
                }
            };
        }
        case 'SET_USER':  {
            return {
                ...state,
                user: action.payload
            };
        }
        case 'SET_MOVIE_TYPE_SELECT':  {
            return {
                ...state,
                movieTypeSelect: action.payload
            };
        }
        case 'SET_GIFT_CARDS':  {
            return {
                ...state,
                giftCards: action.payload
            };
        }
        case 'CHANGE_AMOUNT_GIFT_CARDS': {
            const id = action.payload;
            const i = state.giftCards.findIndex((card: IDataGiftCard) => card.id === id);   // индекс в массиве giftCards
            if (i !== -1) {
                const newGiftCards: IDataGiftCard[] = [...state.giftCards];
                newGiftCards[i] = {
                  ...newGiftCards[i],
                  amount: newGiftCards[i].amount + 1,
                };
            
                return {
                    ...state,
                    giftCards: newGiftCards,
                };
            }
            return state;
        }
        case 'ADD_GIFT_SELECT': {
            return {
                ...state,
                giftSelect: [
                    ...state.giftSelect, 
                    action.payload
                ],
            };
        }
        case 'REMOVE_GIFT_SELECT': {
            const idCardRemove = action.payload;
            const i = state.giftSelect.findIndex((item: IDataGiftSelect) => item.idCard === idCardRemove);
            if (i !== -1) {
                const newGiftSelect = [...state.giftSelect];
                newGiftSelect.splice(i, 1);

                return {
                    ...state,
                    giftSelect: newGiftSelect,
                };
            }
            return state;
        }
        case 'CLEAR_GIFT_SELECT': {
            return {
                ...state,
                giftSelect: [],
            };
        }
        case 'SET_MY_CARDS':  {
            return {
                ...state,
                myCards: action.payload
            };
        }
        case 'CLEAR_MY_CARDS':  {
            return {
                ...state,
                myCards: []
            };
        }
        case 'SET_MY_MOVIES':  {
            return {
                ...state,
                myMovies: action.payload
            };
        }
        case 'CLEAR_MY_MOVIES':  {
            return {
                ...state,
                myMovies: []
            };
        }
        case 'SET_SEAT_SELECT':  {
            return {
                ...state,
                seatSelect: action.payload
            };
        }
        case 'ADD_SEAT_SELECT': {
            return {
                ...state,
                seatSelect: [
                    ...state.seatSelect, 
                    action.payload
                ],
            };
        }
        case 'CLEAR_SEAT_SELECT': {
            return {
                ...state,
                seatSelect: [],
            };
        }
        case 'SET_LOADING': {
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        }
        case 'SET_LOADING_PAGE': {
            return {
                ...state,
                isLoadingPage: !state.isLoadingPage,
            };
        }
        default: return state;
    }
};

// const storeMain = createStore(
//     //@ts-expect-error
//     rootReducerMain,
//     composeWithDevTools(applyMiddleware(thunk))
// );

export default rootReducerMain;