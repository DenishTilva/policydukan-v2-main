import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface JwtPayload {
  userId: string;
  role: string;
  tenantId: string | null;
}

export const signJwt = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyJwt = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
