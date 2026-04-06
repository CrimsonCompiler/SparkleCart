import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "__876@#sparklecart__00";

export interface DecodedToken {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Typescript janei na Request er moddhe user thakte pare
 * So I made it for the typescript to see that hae bhai user thakte pare
 * But not all the time it is a token so not all the time this works so I made
 * it optional engineeringggggggggggg hihihi
 */

export interface AuthRequest extends Request {
  user?: DecodedToken;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Access denied. No token provided",
    });
    return;
  }

  const extractedToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(extractedToken, JWT_SECRET) as DecodedToken; // amader decodedToken type er
    req.user = decoded; // eije request e jaoa shei mohan bekti
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
