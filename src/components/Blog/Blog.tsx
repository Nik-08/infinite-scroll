import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { fetchRemoveCard } from "../../store/action/posts";
import css from "./styles.module.scss";

interface Props {
  id?: number | string;
  items: {
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
  };

  showActions?: boolean;
}

export const Blog: React.FC<Props> = ({ items, id, showActions = false }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const deletePost = (id: string) => {
    let asset = window.confirm("Вы точно хотите удалить?");

    if (asset) dispatch(fetchRemoveCard(id, () => navigate("/")));
  };

  return (
    <div className={css.blog__cloud}>
      {typeof id !== "undefined" && (
        <div className={css.blog__header}>
          <span className={css.blog__text}>
            {typeof id === "number" && id + 1}
          </span>
        </div>
      )}
      {showActions && (
        <div className={css.blog__cross}>
          <span onClick={() => deletePost(items.sys.id)} title="Удалить">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
            </svg>
          </span>
        </div>
      )}

      <div className={css.blog__body}>
        <p className={css.blog__text}>{items.fields.text}</p>
      </div>
      <div className={css.blog__footer}>
        <time className={css.blog__text}>
          {format(new Date(items.sys.createdAt), "DD.MM.YYYY, HH:mm")}
        </time>
        <span className={css.blog__text}>{items.fields.autor}</span>
      </div>
    </div>
  );
};
