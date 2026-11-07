import { useEffect, useState } from "react";
import {
  getRoutines,
  deleteRoutine,
  updateRoutineExercise,
} from "../../utils/MainApi";
import "./MisRutinas.css";

function MisRutinas() {
  const [rutinas, setRutinas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [eliminando, setEliminando] = useState(null);
  const [actualizandoEjercicio, setActualizandoEjercicio] = useState(null);

  useEffect(() => {
    getRoutines()
      .then((data) => {
        setRutinas(data);
      })
      .catch((err) => {
        setError(err.message || "No se pudieron cargar tus rutinas.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  async function handleToggleExercise(routineId, exerciseIndex, hecho) {
    const clave = `${routineId}-${exerciseIndex}`;

    setActualizandoEjercicio(clave);
    setError("");

    try {
      await updateRoutineExercise(routineId, exerciseIndex, hecho);

      setRutinas((actuales) =>
        actuales.map((rutina) => {
          if (rutina._id !== routineId) {
            return rutina;
          }

          return {
            ...rutina,
            ejercicios: rutina.ejercicios.map((ejercicio, index) =>
              index === exerciseIndex ? { ...ejercicio, hecho } : ejercicio,
            ),
          };
        }),
      );
    } catch (err) {
      setError(
        err.message || "No se pudo actualizar el progreso del ejercicio.",
      );
    } finally {
      setActualizandoEjercicio(null);
    }
  }

  function handleDelete(routineId) {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar esta rutina?",
    );

    if (!confirmar) return;

    setEliminando(routineId);
    setError("");

    deleteRoutine(routineId)
      .then(() => {
        setRutinas((actuales) =>
          actuales.filter((rutina) => rutina._id !== routineId),
        );
      })
      .catch((err) => {
        setError(err.message || "No se pudo eliminar la rutina.");
      })
      .finally(() => {
        setEliminando(null);
      });
  }

  if (isLoading) {
    return (
      <section className="mis-rutinas">
        <h1 className="mis-rutinas__title">Mis rutinas</h1>
        <p>Cargando tus rutinas...</p>
      </section>
    );
  }

  return (
    <section className="mis-rutinas">
      <h1 className="mis-rutinas__title">Mis rutinas</h1>

      {error && <p className="mis-rutinas__error">{error}</p>}

      {!error && rutinas.length === 0 && (
        <p className="mis-rutinas__empty">
          Todavía no guardaste ninguna rutina.
        </p>
      )}

      <ul className="mis-rutinas__list">
        {rutinas.map((rutina) => (
          <li className="mis-rutinas__card" key={rutina._id}>
            <h2 className="mis-rutinas__name">{rutina.nombre}</h2>
            <p>
              <strong>Objetivo:</strong> {rutina.objetivo}
            </p>
            <p>
              <strong>Nivel:</strong> {rutina.nivel}
            </p>
            <p>
              <strong>Días por semana:</strong> {rutina.dias}
            </p>
            <p>
              <strong>Equipamiento:</strong>{" "}
              {rutina.equipamiento?.length
                ? rutina.equipamiento.join(", ")
                : "Sin equipo"}
            </p>
            <p>
              <strong>Progreso:</strong>{" "}
              {rutina.ejercicios?.filter((ejercicio) => ejercicio.hecho)
                .length ?? 0}
              {" / "}
              {rutina.ejercicios?.length ?? 0} ejercicios completados
            </p>{" "}
            {rutina.ejercicios?.length > 0 && (
              <ul className="mis-rutinas__exercises">
                {rutina.ejercicios.map((ejercicio, index) => {
                  const clave = `${rutina._id}-${index}`;

                  return (
                    <li key={clave}>
                      <label>
                        <input
                          type="checkbox"
                          checked={Boolean(ejercicio.hecho)}
                          disabled={actualizandoEjercicio === clave}
                          onChange={(event) =>
                            handleToggleExercise(
                              rutina._id,
                              index,
                              event.target.checked,
                            )
                          }
                        />

                        <span>
                          Día {ejercicio.dia}: {ejercicio.nombre} —{" "}
                          {ejercicio.series} series × {ejercicio.repeticiones}
                          {ejercicio.hecho ? " · Completado" : ""}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
            <button
              type="button"
              className="mis-rutinas__delete"
              disabled={eliminando === rutina._id}
              onClick={() => handleDelete(rutina._id)}
            >
              {eliminando === rutina._id ? "Eliminando..." : "Eliminar rutina"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MisRutinas;
