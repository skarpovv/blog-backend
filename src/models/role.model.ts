import { Schema, model } from "mongoose";

type RoleType = "USER" | "ADMIN";

export interface IRole {
  value: RoleType;
}

const Role = new Schema<IRole>({
  value: { type: String, unique: true, default: "USER" },
});

export default model("Role", Role);
