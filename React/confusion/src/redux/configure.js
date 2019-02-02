import {combineReducers, createStore} from "redux";
import {Dishes} from "./dishes";
import {Comments} from "./comments";
import {Leaders} from "./leaders";
import {Promotions} from "./promotions";
import {applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {createForms} from 'react-redux-form'
import {InitialFeedback} from "./forms";


/**
 * createStore takes two arguments
 * reducers and applyMiddleWare
 * @returns {Store<S>}
 */
export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store
};