import { useContext, useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Modal from "../Modal/Modal";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { Link, useHistory, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();
  const location = useLocation();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const shouldOpenLogin = location.state?.openLogin === true;
  const isLoginModalOpen = isLoginOpen || shouldOpenLogin;

  function handleCloseLogin() {
    setIsLoginOpen(false);

    if (shouldOpenLogin) {
      const nextState = { ...location.state };
      delete nextState.openLogin;

      history.replace({
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        state: nextState,
      });
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    history.push("/");
  }

  return (
    <header className="header">
      {" "}
      <p className="header__logo">
        {" "}
        <svg
          className="header__logo-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          {" "}
          <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z" />{" "}
        </svg>
        Volt{" "}
      </p>
      <div className="header__actions">
        <Navigation />

        {currentUser ? (
          <>
            <Link to="/mis-rutinas" className="header__login">
              Rutinas guardadas
            </Link>
            <button
              type="button"
              className="header__login"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            type="button"
            className="header__login"
            onClick={() => setIsLoginOpen(true)}
          >
            Iniciar sesión
          </button>
        )}
      </div>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLogin}
        title="Iniciar sesión"
      >
        <Login
          onClose={handleCloseLogin}
          onRegister={() => {
            handleCloseLogin();
            setIsRegisterOpen(true);
          }}
        />
      </Modal>
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Crear cuenta"
      >
        <Register
          onLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Modal>
    </header>
  );
}

export default Header;
