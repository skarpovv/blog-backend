import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  roles: string;
}

const User = new Schema<IUser>({
  username: { type: String, unique: true, requied: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

export default model("User", User);
