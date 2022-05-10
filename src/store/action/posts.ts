import axios from "axios";
import { Dispatch } from "redux";

const fetchInit = () => ({
  type: "FETCH_INIT",
});

const fetchDone = (payload: APIResponse) => ({
  type: "FETCH_DONE",
  payload,
});

const fetchFailed = (error: string) => ({
  type: "FETCH_FAILED",
  payload: error,
});

export const fetchPosts =
  () => async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(fetchInit());
    try {
      const currentSkip = getState();
      const skip = currentSkip.posts.items.length;
      const response = await axios.get<APIResponse>(
        `https://cdn.contentful.com/spaces/${process.env.REACT_APP_API_SPACE_KEY}/environments/master/entries?access_token=${process.env.REACT_APP_API_TOKEN}&limit=7&skip=${skip}`
      );
      dispatch(fetchDone(response.data));
    } catch (e) {
      dispatch(fetchFailed(String(e)));
    }
  };

// GET ONE CARD
const fetchCardInit = () => ({
  type: "FETCH_CARD_INIT",
});

const fetchCardDone = (payload: APIResponse) => ({
  type: "FETCH_CARD_DONE",
  payload,
});

const fetchCardFailed = (error: string) => ({
  type: "FETCH_CARD_FAILED",
  payload: error,
});
export const fetchPostCard =
  (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(fetchCardInit());
    try {
      const response = await axios.get<APIResponse>(
        `https://cdn.contentful.com/spaces/${process.env.REACT_APP_API_SPACE_KEY}/environments/master/entries/${id}?access_token=${process.env.REACT_APP_API_TOKEN}`
      );
      dispatch(fetchCardDone(response.data));
    } catch (e) {
      dispatch(fetchCardFailed(String(e)));
    }
  };

// CREATE
const createPostInit = () => ({
  type: "CREATE_INIT",
});

const createPostDone = (payload: APIResponse) => ({
  type: "CREATE_DONE",
  payload,
});

const createPostFailed = (error: string) => ({
  type: "CREATE_FAILED",
  payload: error,
});

export const fetchCreateCard =
  ({ autor, text }: CreatePost, callBack: () => void) =>
  async (dispatch: Dispatch) => {
    const data = {
      fields: {
        autor: {
          "en-US": autor,
        },
        text: {
          "en-US": text,
        },
      },
    };
    dispatch(createPostInit());
    try {
      const response = await axios.post(
        `https://api.contentful.com/spaces/${process.env.REACT_APP_API_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries`,
        data,
        {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
            "content-type": "application/vnd.contentful.management.v1+json",
            "X-Contentful-Content-Type": "blog",
          },
        }
      );
      const publish = await axios.request({
        url: `https://api.contentful.com/spaces/${process.env.REACT_APP_API_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries/${response.data.sys.id}/published`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
          "X-Contentful-Version": response.data.sys.version,
        },
      });
      dispatch(createPostDone(response.data));
      callBack();
    } catch (e) {
      dispatch(createPostFailed(String(e)));
    }
  };

// REMOVE

const removePostInit = () => ({
  type: "REMOVE_INIT",
});

const removePostDone = (payload: string) => ({
  type: "REMOVE_DONE",
  payload,
});

const removePostFailed = (error: string) => ({
  type: "REMOVE_FAILED",
  payload: error,
});

export const fetchRemoveCard =
  (id: string, callBack: () => void) => async (dispatch: Dispatch) => {
    dispatch(removePostInit());
    try {
      const publish = await axios.request({
        url: `https://api.contentful.com/spaces/${process.env.REACT_APP_API_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries/${id}/published`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
        },
      });
      dispatch(removePostDone(id));
      callBack();
    } catch (e) {
      dispatch(removePostFailed(String(e)));
    }
  };
