import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Modal from "../Modal/Modal";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="header">
      <p className="header__logo">
        <svg
          className="header__logo-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z" />
        </svg>
        Volt
      </p>
      <div className="header__actions">
        <Navigation />
        <button
          type="button"
          className="header__login"
          onClick={() => setIsLoginOpen(true)}
        >
          Iniciar sesión
        </button>
      </div>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Iniciar sesión"
      >
        <p>Próximamente: acá vas a poder entrar con tu cuenta.</p>
      </Modal>
    </header>
  );
}

export default Header;
