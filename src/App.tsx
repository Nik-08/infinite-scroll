import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { Home, Login, Create, Card } from "./pages";
import { logout } from "./store/action/login";
import { selectors } from "./store/selectors";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAutorised = useSelector(selectors.isAutorised);
  let navigate = useNavigate();

  const onLogOut = () => {
    dispatch(logout());
    navigate(`../login`, { replace: true });
  };

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <Link to="/">
            <div className="header__logo">LOGO</div>
          </Link>
          {isAutorised ? (
            <div className="header__btns">
              <Link to="create">
                <div className="header__btn">Create Post</div>
              </Link>

              <div className="header__btn" onClick={onLogOut}>
                Log Out
              </div>
            </div>
          ) : (
            <Link to="login">
              <div className="header__btn">Log In</div>
            </Link>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="create" element={<Create />} />
        <Route path="card/:id" element={<Card />} />
      </Routes>
    </>
  );
};
export default App;
