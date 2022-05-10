export const items = (state: AppState) => state.posts.items;
export const loading = (state: AppState) => state.posts.loading;
export const total = (state: AppState) => state.posts.total;
export const singlePost = (state: AppState) => state.posts.singlePost;

export const hasMore = (state: AppState) => {
  const _items = items(state);
  const _loading = loading(state);
  const _total = total(state);
  return !_loading && typeof _total === "number" && _items.length < _total;
};

export const isAutorised = (state: AppState) => state.login.isAutorised;
export const errorMessage = (state: AppState) => state.login.error;

export const selectors = {
  items,
  loading,
  total,
  hasMore,
  isAutorised,
  singlePost,
  errorMessage,
};
