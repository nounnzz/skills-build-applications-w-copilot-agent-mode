import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(connectionString);
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  return mongoose.connection;
}

export default connectToDatabase;
