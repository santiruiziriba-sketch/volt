export const OBJETIVOS = {
  musculacion: {
    nombre: "Musculación",
    bloques: [
      {
        tipoEjercicio: "strength",
        series: 4,
        repeticiones: "8-12 reps",
        descansoSegundos: 60,
        ejerciciosPorDia: 4,
      },
    ],
  },
  fuerza: {
    nombre: "Fuerza",
    bloques: [
      {
        tipoEjercicio: "powerlifting",
        series: 5,
        repeticiones: "3-6 reps",
        descansoSegundos: 120,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "strength",
        series: 3,
        repeticiones: "5-8 reps",
        descansoSegundos: 90,
        ejerciciosPorDia: 2,
      },
    ],
  },
  resistencia: {
    nombre: "Resistencia",
    bloques: [
      {
        tipoEjercicio: "cardio",
        series: 3,
        repeticiones: "45 seg",
        descansoSegundos: 30,
        ejerciciosPorDia: 3,
      },
      {
        tipoEjercicio: "strength",
        series: 3,
        repeticiones: "15-20 reps",
        descansoSegundos: 30,
        ejerciciosPorDia: 2,
      },
    ],
  },
  potencia: {
    nombre: "Potencia",
    bloques: [
      {
        tipoEjercicio: "olympic_weightlifting",
        series: 5,
        repeticiones: "3-5 reps",
        descansoSegundos: 90,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "plyometrics",
        series: 3,
        repeticiones: "5-6 reps",
        descansoSegundos: 90,
        ejerciciosPorDia: 2,
      },
    ],
  },
  velocidad: {
    nombre: "Velocidad",
    bloques: [
      {
        tipoEjercicio: "plyometrics",
        series: 4,
        repeticiones: "5-8 reps",
        descansoSegundos: 90,
        ejerciciosPorDia: 3,
      },
      {
        tipoEjercicio: "strength",
        series: 3,
        repeticiones: "6-8 reps",
        descansoSegundos: 90,
        ejerciciosPorDia: 2,
      },
    ],
  },
  explosividad: {
    nombre: "Explosividad",
    bloques: [
      {
        tipoEjercicio: "plyometrics",
        series: 4,
        repeticiones: "6-10 reps",
        descansoSegundos: 75,
        ejerciciosPorDia: 3,
      },
      {
        tipoEjercicio: "olympic_weightlifting",
        series: 4,
        repeticiones: "3-5 reps",
        descansoSegundos: 90,
        ejerciciosPorDia: 2,
      },
    ],
  },
  futbol: {
    nombre: "Fútbol / Futsal",
    bloques: [
      {
        tipoEjercicio: "plyometrics",
        series: 4,
        repeticiones: "8-10 reps",
        descansoSegundos: 60,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "strength",
        series: 3,
        repeticiones: "10-12 reps",
        descansoSegundos: 60,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "cardio",
        series: 2,
        repeticiones: "30 seg",
        descansoSegundos: 45,
        ejerciciosPorDia: 1,
      },
    ],
  },
  handball: {
    nombre: "Handball",
    bloques: [
      {
        tipoEjercicio: "plyometrics",
        series: 4,
        repeticiones: "8-10 reps",
        descansoSegundos: 60,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "strength",
        series: 3,
        repeticiones: "10-12 reps",
        descansoSegundos: 60,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "cardio",
        series: 2,
        repeticiones: "30 seg",
        descansoSegundos: 45,
        ejerciciosPorDia: 1,
      },
    ],
  },
  basquet: {
    nombre: "Básquet",
    bloques: [
      {
        tipoEjercicio: "plyometrics",
        series: 4,
        repeticiones: "8-10 reps",
        descansoSegundos: 60,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "strength",
        series: 3,
        repeticiones: "10-12 reps",
        descansoSegundos: 60,
        ejerciciosPorDia: 2,
      },
      {
        tipoEjercicio: "cardio",
        series: 2,
        repeticiones: "30 seg",
        descansoSegundos: 45,
        ejerciciosPorDia: 1,
      },
    ],
  },
};

export const NIVELES = {
  principiante: { volumenMultiplicador: 0.7 },
  intermedio: { volumenMultiplicador: 1 },
  avanzado: { volumenMultiplicador: 1.3 },
};

export const DIFICULTAD_POR_NIVEL = {
  principiante: "beginner",
  intermedio: "intermediate",
  avanzado: "expert",
};

export function obtenerConfiguracionObjetivo(idObjetivo) {
  return OBJETIVOS[idObjetivo] ?? null;
}
