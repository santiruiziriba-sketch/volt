import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link className="navigation__link" to="/">
            Inicio
          </Link>
        </li>
        <li className="navigation__item">
          <Link className="navigation__link" to="/rutina">
            Mi rutina
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
