import { Schema, Types, model } from "mongoose";
import { genSalt, hash as _hash, compare } from "bcryptjs";

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(), // Esto generará un nuevo ObjectId único por defecto
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  userUrlPhoto: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);
  const hash = await _hash(user.password, salt);

  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

export default model("User", userSchema);
