import "./Main.css";
import { useHistory } from "react-router-dom";
import RutinaForm from "../RutinaForm/RutinaForm";

function Main() {
  const history = useHistory();

  function handleGenerarRutina(datos) {
    history.push("/rutina", datos);
  }

  return (
    <main className="main">
      <h1 className="main__title">Armá tu rutina</h1>
      <RutinaForm onSubmit={handleGenerarRutina} />
    </main>
  );
}

export default Main;
