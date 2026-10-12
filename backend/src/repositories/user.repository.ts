import { User } from "../models";
import { IUser } from "../types";
import { SignupDTO, UpdateProfileDTO } from "../dtos";

export class UserRepository {
  async create(data: SignupDTO): Promise<IUser> {
    return await User.create(data);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async updateById(id: string, data: UpdateProfileDTO): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await User.findByIdAndUpdate(id, { password: hashedPassword });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await User.findOne({ email }).select("_id");
    return !!user;
  }
}

export default new UserRepository();