import { Schema, model } from "mongoose";
import { IRole } from "./role.model";

export interface IUser {
  username: string;
  password: string;
  roles: IRole[];
}

const User = new Schema({
  username: { type: String, unique: true, requied: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

export default model("User", User);
