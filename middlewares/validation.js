import { celebrate, Joi } from "celebrate";

export const validateSignup = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

export const validateSignin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateRoutine = celebrate({
  body: Joi.object({
    nombre: Joi.string().trim().required(),
    objetivo: Joi.string().trim().required(),
    nivel: Joi.string().trim().required(),
    dias: Joi.number().integer().min(1).max(7).required(),
    equipamiento: Joi.array().items(Joi.string()).default([]),
    ejercicios: Joi.array()
      .items(
        Joi.object({
          dia: Joi.number().integer().required(),
          nombre: Joi.string().trim().required(),
          series: Joi.number().integer().required(),
          repeticiones: Joi.string().trim().required(),
          imagen: Joi.string().uri().required(),
          hecho: Joi.boolean().default(false),
        }),
      )
      .default([]),
  }),
});

export const validateRoutineId = celebrate({
  params: Joi.object({
    routineId: Joi.string().hex().length(24).required(),
  }),
});

export const validateRoutineExercise = celebrate({
  params: Joi.object({
    routineId: Joi.string().hex().length(24).required(),
    exerciseIndex: Joi.number().integer().min(0).required(),
  }),

  body: Joi.object({
    hecho: Joi.boolean().required(),
  }),
});
