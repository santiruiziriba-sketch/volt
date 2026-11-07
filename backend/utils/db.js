import mongoose from 'mongoose';

const connectDatabase = () => {
  const mongoUri = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : 'mongodb://127.0.0.1:27017/volt';

  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('Conectado a MongoDB');
    })
    .catch((error) => {
      console.error('Error al conectar a MongoDB:', error.message);
    });
};

export default connectDatabase;
