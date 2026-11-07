import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RutinaPage.css";
import Preloader from "../Preloader/Preloader";
import { fetchExercises } from "../../utils/ExerciseApi";
import { armarRutina } from "../../utils/routineBuilder";
import {
  obtenerConfiguracionObjetivo,
  DIFICULTAD_POR_NIVEL,
} from "../../utils/trainingConfig";

const ITEMS_POR_PAGINA = 3;
const CLAVE_STORAGE = "volt-rutina";

function leerGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "null");
  } catch {
    return null;
  }
}

function RutinaPage() {
  const location = useLocation();
  const [guardado, setGuardado] = useState(leerGuardado);
  const [errorClave, setErrorClave] = useState(null);
  const [cantidadVisible, setCantidadVisible] = useState(ITEMS_POR_PAGINA);

  const datosActuales = location.state ?? guardado?.datos ?? null;
  const clave = datosActuales ? JSON.stringify(datosActuales) : null;
  const config = datosActuales
    ? obtenerConfiguracionObjetivo(datosActuales.objetivo)
    : null;
  const rutina =
    guardado && JSON.stringify(guardado.datos) === clave
      ? guardado.rutina
      : null;

  const error = clave !== null && rutina === null && errorClave === clave;
  const cargando = Boolean(config) && rutina === null && !error;
  const ejercicios = rutina ?? [];

  useEffect(() => {
    if (!config || rutina !== null) return undefined;

    let cancelado = false;

    Promise.all(
      config.bloques.map((bloque) =>
        fetchExercises({
          type: bloque.tipoEjercicio,
          difficulty: DIFICULTAD_POR_NIVEL[datosActuales.nivel],
          equipments: datosActuales.equipamiento,
        }),
      ),
    )
      .then((pools) => {
        if (cancelado) return;
        const nuevaRutina = armarRutina({
          config,
          pools,
          dias: datosActuales.dias,
          nivel: datosActuales.nivel,
        });
        const nuevoGuardado = { datos: datosActuales, rutina: nuevaRutina };
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevoGuardado));
        setGuardado(nuevoGuardado);
        setCantidadVisible(ITEMS_POR_PAGINA);
      })
      .catch(() => {
        if (!cancelado) setErrorClave(clave);
      });

    return () => {
      cancelado = true;
    };
  }, [clave, config, rutina, datosActuales]);

  function mostrarMas() {
    setCantidadVisible((actual) => actual + ITEMS_POR_PAGINA);
  }

  const ejerciciosVisibles = ejercicios.slice(0, cantidadVisible);
  const hayMasParaMostrar = cantidadVisible < ejercicios.length;

  return (
    <section className="rutina-page">
      <h1 className="rutina-page__title">Tu rutina</h1>

      {cargando && <Preloader />}

      {!cargando && error && (
        <p className="rutina-page__empty">
          Lo sentimos, algo ha salido mal durante la solicitud. Es posible que
          haya un problema de conexión o que el servidor no funcione. Por favor,
          inténtalo más tarde.
        </p>
      )}

      {!cargando && !error && ejercicios.length === 0 && (
        <p className="rutina-page__empty">No se ha encontrado nada.</p>
      )}

      {!cargando && !error && ejercicios.length > 0 && (
        <>
          <ul className="rutina-page__list">
            {ejerciciosVisibles.map((ej, index) => (
              <li
                key={`${ej.dia}-${ej.name}-${index}`}
                className="exercise-card"
              >
                <p className="exercise-card__day">Día {ej.dia}</p>
                <h2 className="exercise-card__name">{ej.name}</h2>
                <p className="exercise-card__muscle">{ej.muscle}</p>
                <p className="exercise-card__prescription">
                  {ej.series} series x {ej.repeticiones} · descanso{" "}
                  {ej.descansoSegundos} seg
                </p>
                <p className="exercise-card__text">
                  {ej.instructions || ej.safety_info}
                </p>
                <p className="exercise-card__equipment">
                  Equipo:{" "}
                  {ej.equipments?.length > 0
                    ? ej.equipments.join(", ")
                    : "Sin equipo"}
                </p>
              </li>
            ))}
          </ul>

          {hayMasParaMostrar && (
            <button
              type="button"
              className="rutina-page__more"
              onClick={mostrarMas}
            >
              Mostrar más
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default RutinaPage;
