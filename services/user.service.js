import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import User from "../models/User.js";

const register = async ({ userName, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
    role,
  });
  await newUser.save();

  const token = JWT.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email and Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Email and Password");
  }

  const token = JWT.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
  };
};

export default { register, login };
