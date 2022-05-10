import { combineReducers } from "redux";

import loginReducer from "./login";
import blogs from "./posts";

export const rootReducer = combineReducers<AppState>({
  posts: blogs,
  login: loginReducer,
});
