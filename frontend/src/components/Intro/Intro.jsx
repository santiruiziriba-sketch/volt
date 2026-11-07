import { useHistory } from "react-router-dom";
import "./Intro.css";

function Intro() {
  const history = useHistory();

  function handleCrearRutina() {
    history.push("/crear-rutina");
  }

  return (
    <main className="intro">
      <section className="intro__content">
        <p className="intro__eyebrow">VOLT</p>

        <h1 className="intro__title">Entrená con una rutina hecha para vos.</h1>

        <p className="intro__description">
          Definí tu objetivo, nivel, días disponibles y equipamiento. Volt se
          encarga de crear una rutina adaptada a vos.
        </p>

        <button
          className="intro__button"
          type="button"
          onClick={handleCrearRutina}
        >
          Crear mi rutina
        </button>
      </section>
    </main>
  );
}

export default Intro;
