// src/interface/middlewares/verifyToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}



/**
 * Middleware to verify JWT and (optionally) check user role.
 */


export const verifyToken = (allowedRoles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {

      const token =
         req.cookies?.adminAccessToken ||
        req.cookies?.lawyerAccessToken ||
        req.cookies?.userAccessToken ||
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ success: false, message: "No token provided. Access denied." });
        return;
      }

  
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

  
      req.user = decoded;

  
      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        res.status(403).json({ success: false, message: "Access denied. Insufficient permissions." });
        return;
      }

    
      next();

    } catch (error: any) {
    
      res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
  };
};
