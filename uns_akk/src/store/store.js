import { createStore, combineReducers } from "redux";
import { ListReducers, TokenReducers } from "./ListReducers";

const rootReducer = combineReducers({
  reducersList: ListReducers,
  tokenList: TokenReducers,
});

const store = createStore(rootReducer);

export default store;
