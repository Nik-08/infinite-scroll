import { Reducer } from "redux";

const initialState: LoginState = {
  isAutorised: false,
  error: null,
};

const login: string = process.env.REACT_APP_AUTH_LOGIN!;
const password: string = process.env.REACT_APP_AUTH_PASSWORD!;

if (!login || !password) {
  throw new Error("No login or password");
}

const loginReducer: Reducer<LoginState> = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      const payload = action.payload as LoginPayload;
      if (payload.login === login && payload.password === password) {
        return {
          ...state,
          isAutorised: true,
          error: null,
        };
      }
      return {
        ...state,
        isAutorised: false,
        error: "Wrong login or password!",
      };
    }
    case "LOGOUT":
      return {
        ...state,
        isAutorised: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
