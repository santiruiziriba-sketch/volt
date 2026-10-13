import { Router } from "express";

import {
  getRoutines,
  createRoutine,
  deleteRoutine,
  updateRoutineExercise,
} from "../controllers/routines.js";

import auth from "../middlewares/auth.js";

import {
  validateRoutine,
  validateRoutineId,
  validateRoutineExercise,
} from "../middlewares/validation.js";

const router = Router();

router.get("/", auth, getRoutines);

router.post("/", auth, validateRoutine, createRoutine);

router.delete("/:routineId", auth, validateRoutineId, deleteRoutine);

router.patch(
  "/:routineId/exercises/:exerciseIndex",
  auth,
  validateRoutineExercise,
  updateRoutineExercise,
);

export default router;
