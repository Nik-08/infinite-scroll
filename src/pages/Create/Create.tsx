import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

import { fetchCreateCard } from "store/action/posts";
import { selectors } from "store/selectors";

import css from "./styles.module.scss";

export const Create: React.FC = () => {
  const [autor, setAutor] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const isAutorised = useSelector(selectors.isAutorised);
  const navigate = useNavigate();

  if (!isAutorised) return <Navigate to="/login" replace={true} />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(fetchCreateCard({ autor, text }, () => navigate("/")));
  };

  return (
    <div className={css.container}>
      <h1 className={css.create__title}>Create Post</h1>
      <form
        action=""
        className={css.create__form}
        method="POST"
        onSubmit={onSubmit}
      >
        <div className={css.create__body}>
          <textarea
            className={css.create__input}
            required
            placeholder="Text"
            name="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
          ></textarea>
        </div>
        <div className={css.create__footer}>
          <input
            className={css.create__input}
            placeholder="Autor"
            type="text"
            required
            value={autor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAutor(e.target.value)
            }
          ></input>
        </div>
        <button type="submit" className={css.create__btn}>
          Create
        </button>
      </form>
    </div>
  );
};
