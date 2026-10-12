import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types";
import { ForbiddenError, UnauthorizedError } from "../errors";

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError("You are not logged in");
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError("You do not have permission to perform this action");
    }

    next();
  };
};