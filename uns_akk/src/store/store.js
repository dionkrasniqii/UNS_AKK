import { createStore, combineReducers } from "redux";
import { ListReducers } from "./ListReducers";

const rootReducer = combineReducers({
  reducersList: ListReducers,
});

const store = createStore(rootReducer);

export default store;
