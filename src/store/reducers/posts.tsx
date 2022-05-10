import { Reducer } from "redux";

const initialState: PostState = {
  items: [],
  loading: false,
  total: null,
  error: null,
  singlePost: null,
};

const blogs: Reducer<PostState> = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_DONE":
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
        total: action.payload.total,
        loading: false,
      };

    case "FETCH_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "FETCH_CARD_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_CARD_DONE":
      return {
        ...state,
        singlePost: action.payload,
        loading: false,
      };

    case "FETCH_CARD_FAILED":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CREATE_INIT":
      return {
        ...state,
        error: null,
      };

    case "CREATE_DONE":
      const data = action.payload;

      const newData = {
        ...data,
        fields: {
          autor: data.fields.autor["en-US"],
          text: data.fields.text["en-US"],
        },
      };
      return {
        ...state,
        items: [newData, ...state.items],
      };

    case "CREATE_FAILED":
      return {
        ...state,
        error: action.payload,
      };

    case "REMOVE_INIT":
      return {
        ...state,
        error: null,
      };

    case "REMOVE_DONE":
      return {
        ...state,
        items: state.items.filter((item) => item.sys.id !== action.payload),
        error: null,
      };

    case "REMOVE_FAILED":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default blogs;
