import { Request, Response, NextFunction } from "express";
import { authService } from "../services";
import { sendSuccess } from "../utils";
import {
  SignupDTO,
  LoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  UpdateProfileDTO,
} from "../dtos";

export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: SignupDTO = req.body;
      const result = await authService.signup(data);
      sendSuccess(res, "Account created successfully", result, 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: LoginDTO = req.body;
      const result = await authService.login(data);
      sendSuccess(res, "Login successful", result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: ForgotPasswordDTO = req.body;
      await authService.forgotPassword(data);
      sendSuccess(res, "If this email exists, a reset link has been sent", {});
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: ResetPasswordDTO = req.body;
      await authService.resetPassword(data);
      sendSuccess(res, "Password reset successfully", {});
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const user = await authService.getProfile(userId);
      sendSuccess(res, "Profile fetched successfully", user);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const data: UpdateProfileDTO = req.body;
      const user = await authService.updateProfile(userId, data);
      sendSuccess(res, "Profile updated successfully", user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();