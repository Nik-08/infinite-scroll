import { Blog } from "components";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Spinner } from "components/ui";
import { fetchPosts } from "store/action/posts";
import { selectors } from "store/selectors";

import css from "./styles.module.scss";

export const Home: React.FC = () => {
  const items = useSelector(selectors.items);
  const hasMore = useSelector(selectors.hasMore);

  const loadingItems = useSelector(selectors.loading);

  const dispatch = useDispatch();

  const load = React.useCallback(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  React.useEffect(() => {
    if (items.length === 0) load();
  }, [load, items.length]);

  return (
    <div className={css.blog__container}>
      {loadingItems ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={load}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className={css.blog__footer}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.map((obj, id) => (
            <Link to={`card/${obj.sys.id}`} key={obj.sys.id}>
              <Blog items={obj} id={id} />
            </Link>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};
