const BASE_URL = "https://api.api-ninjas.com/v1/exercises";
const API_KEY = import.meta.env.VITE_EXERCISE_API_KEY;

function fetchOne({ type, muscle, difficulty, equipment }) {
  const params = new URLSearchParams();
  if (type) params.append("type", type);
  if (muscle) params.append("muscle", muscle);
  if (difficulty) params.append("difficulty", difficulty);
  if (equipment) params.append("equipments", equipment);

  return fetch(`${BASE_URL}?${params.toString()}`, {
    headers: { "X-Api-Key": API_KEY },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(new Error(`Error ${res.status}`));
    }
    return res.json();
  });
}

export function fetchExercises({ type, muscle, difficulty, equipments }) {
  const listaEquipos = equipments?.length ? equipments : [null];

  return Promise.all(
    listaEquipos.map((equipment) => {
      if (equipment === "none") {
        return fetchOne({ type, muscle, difficulty, equipment: null }).then(
          (resultado) => resultado.filter((ej) => !ej.equipments?.length),
        );
      }
      return fetchOne({ type, muscle, difficulty, equipment });
    }),
  )
    .then((resultados) => {
      const combinados = resultados.flat();
      const sinDuplicados = combinados.filter(
        (ej, index, arr) => arr.findIndex((e) => e.name === ej.name) === index,
      );
      return sinDuplicados;
    })
    .catch((err) => {
      console.error("Error al pedir ejercicios:", err);
      throw err;
    });
}
