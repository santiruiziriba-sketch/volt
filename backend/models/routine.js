import mongoose from 'mongoose';
import validator from 'validator';

const exerciseSchema = new mongoose.Schema(
  {
    dia: {
      type: Number,
      required: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    series: {
      type: Number,
      required: true,
    },

    repeticiones: {
      type: String,
      required: true,
      trim: true,
    },

    imagen: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: 'La imagen debe ser una URL válida',
      },
    },

    hecho: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const routineSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },

  objetivo: {
    type: String,
    required: true,
    trim: true,
  },

  nivel: {
    type: String,
    required: true,
    trim: true,
  },

  dias: {
    type: Number,
    required: true,
    min: 1,
    max: 7,
  },

  equipamiento: {
    type: [String],
    default: [],
  },

  ejercicios: {
    type: [exerciseSchema],
    default: [],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

export default mongoose.model('routine', routineSchema);
