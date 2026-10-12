import { Document } from "mongoose";

export type UserRole = "admin" | "user";
export type Gender = "male" | "female" | "other" | "prefer-not-to-say";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;

  // Contact
  phone?: string;
  country?: string;

  // Patient profile
  dateOfBirth?: Date;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  medicalHistory?: string;
  profileImage?: string;

  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserPayload {
  id: string;
  email: string;
  role: UserRole;
}