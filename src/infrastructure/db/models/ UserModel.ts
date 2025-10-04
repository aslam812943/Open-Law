import mongoose, { Document, Schema } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  role: string;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: "user" },
});

export default mongoose.model<IUserDocument>("User", UserSchema);
