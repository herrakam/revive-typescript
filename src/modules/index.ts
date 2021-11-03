import { combineReducers } from "redux";
import counter from "./counter";
import post from "./post";

 const rootReducer = combineReducers({
    counter, post
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer