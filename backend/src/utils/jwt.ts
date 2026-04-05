import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "aquafina_water_bottle_ekhane";

export const generateToken = (userId: String, role: String) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
};
