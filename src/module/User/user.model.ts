/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { UserStatus } from "./user.constants";
import config from "../../app/config";

const userSchema = new Schema<TUser>(
  {
 
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
      select: 0,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});


export const User = model<TUser>("User", userSchema);
