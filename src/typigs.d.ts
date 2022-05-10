declare module "*.scss";

type Nullable<T> = T | null;

interface AppState {
  posts: PostState;
  login: LoginState;
}

interface Post {
  fields: {
    id: number;
    text: string;
    autor: string;
    date: string;
  };
  sys: {
    id: string;
    createdAt: string;
  };
}

interface CreatePost {
  autor: string;
  text: string;
}

interface PostState {
  items: Post[];
  loading: boolean;
  total: Nullable<number>;
  error: Nullable<string>;
  singlePost: Nullable<Post>;
}

interface APIResponse {
  items: Post[];
  total: number;
  skip: number;
  limit: number;
}

interface LoginState {
  isAutorised: boolean;
  error: Nullable<string>;
}

interface LoginPayload {
  login: string;
  password: string;
}
