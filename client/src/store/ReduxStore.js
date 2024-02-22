import {legacy_createStore as createStore, applyMiddleware ,compose} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

// Middleware to save state to localStorage
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem('state', serializedState);
    } catch(e) {
        console.log(e);
    }
}

// Middleware to load state from localStorage
function loadFromLocalStorage() {
    try {
        const serializedState = window.localStorage.getItem('state');
        if(serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

// Load state from localStorage
const persistedState = loadFromLocalStorage();

// Apply Redux DevTools extension only in development mode
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

// Create Redux store
const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

// Save state to localStorage on every store change
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
