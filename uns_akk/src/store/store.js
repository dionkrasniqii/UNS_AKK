import { createStore, combineReducers } from "redux";
import {  MobileReducers, TokenReducers } from "./ListReducers";

const rootReducer = combineReducers({
  tokenList: TokenReducers,
  mobileList: MobileReducers,
});

const store = createStore(rootReducer);

export default store;
