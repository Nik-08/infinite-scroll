import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Navigate } from "react-router";

import { Blog } from "../../components";
import { Spinner } from "../../components/ui";
import { fetchPostCard } from "../../store/action/posts";
import { selectors } from "../../store/selectors";
import css from "./styles.module.scss";

export const Card: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const singlePost = useSelector(selectors.singlePost);
  const loadingItems = useSelector(selectors.loading);

  useEffect(() => {
    dispatch(fetchPostCard(id!));
  }, []);

  const isAutorised = useSelector(selectors.isAutorised);

  if (!isAutorised) return <Navigate to="/login" replace={true} />;

  return (
    <div>
      {loadingItems || !singlePost ? (
        <Spinner />
      ) : (
        <div className={css.container}>
          <Blog items={singlePost} showActions />
        </div>
      )}
    </div>
  );
};
