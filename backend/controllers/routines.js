import Routine from "../models/routine.js";

export const getRoutines = (req, res, next) => {
  Routine.find({ owner: req.user._id })
    .then((routines) => {
      res.send(routines);
    })
    .catch(next);
};

export const createRoutine = (req, res, next) => {
  const { nombre, objetivo, nivel, dias, equipamiento, ejercicios } = req.body;

  Routine.create({
    nombre,
    objetivo,
    nivel,
    dias,
    equipamiento,
    ejercicios,
    owner: req.user._id,
  })
    .then((routine) => {
      res.status(201).send(routine);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res.status(400).send({
          message: "Datos de rutina inválidos",
        });
      }

      return next(error);
    });
};

export const deleteRoutine = async (req, res, next) => {
  try {
    const routine = await Routine.findById(req.params.routineId).select(
      "+owner",
    );

    if (!routine) {
      return res.status(404).send({
        message: "Rutina no encontrada",
      });
    }

    if (routine.owner.toString() !== req.user._id) {
      return res.status(403).send({
        message: "No tienes permiso para eliminar esta rutina",
      });
    }

    await Routine.findByIdAndDelete(req.params.routineId);

    return res.send({
      message: "Rutina eliminada",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send({
        message: "ID de rutina inválido",
      });
    }

    return next(error);
  }
};

export const updateRoutineExercise = async (req, res, next) => {
  try {
    const { routineId, exerciseIndex } = req.params;
    const { hecho } = req.body;

    const routine = await Routine.findOne({
      _id: routineId,
      owner: req.user._id,
    }).select("+owner");

    if (!routine) {
      return res.status(404).send({
        message: "Rutina no encontrada",
      });
    }

    const index = Number(exerciseIndex);

    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= routine.ejercicios.length
    ) {
      return res.status(400).send({
        message: "Índice de ejercicio inválido",
      });
    }

    if (typeof hecho !== "boolean") {
      return res.status(400).send({
        message: "El estado del ejercicio debe ser verdadero o falso",
      });
    }

    routine.ejercicios[index].hecho = hecho;

    await routine.save();

    return res.send(routine);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send({
        message: "ID de rutina inválido",
      });
    }

    return next(error);
  }
};
