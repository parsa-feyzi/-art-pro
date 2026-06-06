import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: { type: String,
       unique: true,
       required: true
    },
    password: {
      type: String,
      required: true
    },
    followings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User"
    },
    profileImage: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;