import mongoose, { Document, Schema } from 'mongoose';

interface ILogInTime {
  timeZone: string;
  currentTime: string;
}

interface IAddress {
  street: string;
  zipCode: number;
  country: string;
}

export interface IUser extends Document {
  email: string;
  logDate: string;
  logInTime: ILogInTime;
  httpAction: string;
  userRole: string;
  ipAddress: string;
  browser: string;
  address: IAddress;
}

const LogInTimeSchema: Schema = new Schema(
  {
    timeZone: { type: String, required: true },
    currentTime: { type: String, required: true },
  },
  { _id: false }
);

const AddressSchema: Schema = new Schema(
  {
    street: { type: String, required: true },
    zipCode: { type: Number, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

/**
 * User Schema
 */
const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: [true, 'Error falta el campo email'], unique: true },
    logDate: { type: String, required: [true, 'Error falta el campo logDate'] },
    logInTime: { type: LogInTimeSchema, required: [true, 'Error falta el campo logInTime'] },
    httpAction: { type: String, required: [true, 'Error falta el campo httpAction'] },
    userRole: { type: String, required: [true, 'Error falta el campo userRole'] },
    ipAddress: { type: String, required: [true, 'Error falta el campo ipAddress'] },
    browser: { type: String, required: [true, 'Error falta el campo browser'] },
    address: { type: AddressSchema, required: [true, 'Error falta el campo address'] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
