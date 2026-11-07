import { useState } from "react";
import "./RutinaForm.css";
import { OBJETIVOS } from "../../utils/trainingConfig";

const NIVELES = [
  { id: "principiante", nombre: "Principiante" },
  { id: "intermedio", nombre: "Intermedio" },
  { id: "avanzado", nombre: "Avanzado" },
];

const EQUIPAMIENTO = [
  { id: "none", nombre: "Sin equipo" },
  { id: "dumbbell", nombre: "Mancuernas" },
  { id: "barbell", nombre: "Barra" },
  { id: "bench", nombre: "Banco" },
  { id: "kettlebell", nombre: "Kettlebell" },
  { id: "medicine_ball", nombre: "Pelota medicinal" },
  { id: "box", nombre: "Cajón" },
];

function RutinaForm({ onSubmit }) {
  const [objetivo, setObjetivo] = useState("");
  const [nivel, setNivel] = useState("");
  const [dias, setDias] = useState(3);
  const [equipamiento, setEquipamiento] = useState([]);

  function toggleEquipamiento(id) {
    setEquipamiento((actual) =>
      actual.includes(id)
        ? actual.filter((item) => item !== id)
        : [...actual, id],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!objetivo || !nivel) return;
    onSubmit({ objetivo, nivel, dias, equipamiento });
  }

  const esValido = objetivo !== "" && nivel !== "";

  return (
    <form className="rutina-form" onSubmit={handleSubmit}>
      <div className="rutina-form__group">
        <label className="rutina-form__label" htmlFor="objetivo">
          Objetivo
        </label>
        <select
          id="objetivo"
          className="rutina-form__select"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
        >
          <option value="">Elegí un objetivo</option>
          {Object.entries(OBJETIVOS).map(([id, config]) => (
            <option key={id} value={id}>
              {config.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="rutina-form__group">
        <span className="rutina-form__label">Nivel</span>
        <div className="rutina-form__chips">
          {NIVELES.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`chip ${nivel === n.id ? "chip--active" : ""}`}
              aria-pressed={nivel === n.id}
              onClick={() => setNivel(n.id)}
            >
              {n.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="rutina-form__group">
        <label className="rutina-form__label" htmlFor="dias">
          Días por semana: {dias}
        </label>
        <input
          id="dias"
          type="range"
          min="1"
          max="6"
          value={dias}
          onChange={(e) => setDias(Number(e.target.value))}
        />
      </div>

      <div className="rutina-form__group">
        <span className="rutina-form__label">Equipamiento</span>
        <div className="rutina-form__chips">
          {EQUIPAMIENTO.map((eq) => (
            <button
              key={eq.id}
              type="button"
              className={`chip ${
                equipamiento.includes(eq.id) ? "chip--active" : ""
              }`}
              aria-pressed={equipamiento.includes(eq.id)}
              onClick={() => toggleEquipamiento(eq.id)}
            >
              {eq.nombre}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="rutina-form__submit"
        disabled={!esValido}
      >
        Generar rutina
      </button>
    </form>
  );
}

export default RutinaForm;
