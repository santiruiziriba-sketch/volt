import { NIVELES } from "./trainingConfig";

export function armarRutina({ config, pools, dias, nivel }) {
  const multiplicador = NIVELES[nivel]?.volumenMultiplicador ?? 1;
  const rutina = [];

  for (let dia = 1; dia <= dias; dia += 1) {
    const nombresUsados = new Set();

    config.bloques.forEach((bloque, indiceBloque) => {
      const pool = pools[indiceBloque] ?? [];
      if (pool.length === 0) return;

      const series = Math.max(1, Math.round(bloque.series * multiplicador));
      let posicion = (dia - 1) * bloque.ejerciciosPorDia;
      let agregados = 0;
      let intentos = 0;

      while (agregados < bloque.ejerciciosPorDia && intentos < pool.length) {
        const ejercicio = pool[posicion % pool.length];
        posicion += 1;
        intentos += 1;

        if (!nombresUsados.has(ejercicio.name)) {
          nombresUsados.add(ejercicio.name);
          rutina.push({
            ...ejercicio,
            dia,
            series,
            repeticiones: bloque.repeticiones,
            descansoSegundos: bloque.descansoSegundos,
          });
          agregados += 1;
        }
      }
    });
  }

  return rutina;
}
