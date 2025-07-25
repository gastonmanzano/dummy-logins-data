import * as dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import * as path from 'path';

dotenv.config();
mongoose.set('strictQuery', true);

const { DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_NAME } = process.env;

const url = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_NAME}.a1jzuce.mongodb.net/?retryWrites=true&w=majority&appName=Skere`;
const connectDB = async (): Promise<void> => {
  await mongoose
    .connect(url)
    .then(() => console.log('database connected'))
    .catch((err) => console.log(err));
};

export default connectDB;
