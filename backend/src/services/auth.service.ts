import bcrypt from "bcrypt";
import crypto from "crypto";
import { userRepository } from "../repositories";
import { signToken } from "../utils/jwt";
import { sendEmail, passwordResetEmailTemplate } from "../utils/email";
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} from "../errors";
import {
  SignupDTO,
  LoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  UpdateProfileDTO,
} from "../dtos";
import { IUser, IUserPayload } from "../types";

// In-memory store for reset tokens (use Redis in production)
const resetTokenStore = new Map<string, { email: string; expiresAt: number }>();

export class AuthService {
  async signup(data: SignupDTO): Promise<{ user: Partial<IUser>; token: string }> {
    const exists = await userRepository.existsByEmail(data.email);
    if (exists) {
      throw new ConflictError("Email already registered");
    }

    const user = await userRepository.create(data);

    const payload: IUserPayload = {
      id: (user._id as unknown as string).toString(),
      email: user.email,
      role: user.role,
    };

    const token = signToken(payload);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    };
  }

  async login(data: LoginDTO): Promise<{ user: Partial<IUser>; token: string }> {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const payload: IUserPayload = {
      id: (user._id as unknown as string).toString(),
      email: user.email,
      role: user.role,
    };

    const token = signToken(payload);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    };
  }

  async forgotPassword(data: ForgotPasswordDTO): Promise<void> {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      // Don't reveal if email exists or not
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    resetTokenStore.set(resetToken, {
      email: user.email,
      expiresAt,
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request — Dr. Sudan Puri",
      html: passwordResetEmailTemplate(user.name, resetLink),
    });
  }

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    const tokenData = resetTokenStore.get(data.token);

    if (!tokenData) {
      throw new BadRequestError("Invalid or expired reset token");
    }

    if (Date.now() > tokenData.expiresAt) {
      resetTokenStore.delete(data.token);
      throw new BadRequestError("Reset token has expired");
    }

    const user = await userRepository.findByEmail(tokenData.email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);
    await userRepository.updatePassword(
      (user._id as unknown as string).toString(),
      hashedPassword
    );

    resetTokenStore.delete(data.token);
  }

  async getProfile(userId: string): Promise<IUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileDTO
  ): Promise<IUser> {
    const user = await userRepository.updateById(userId, data);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}

export default new AuthService();