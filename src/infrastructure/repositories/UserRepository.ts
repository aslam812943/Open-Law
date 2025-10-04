import { UserRegisterDTO } from "../../application/dtos/user/ RegisterUserDTO"; 
import { User } from "../../domain/entities/ User"; 
import { IUserRepository } from "../../domain/repositories/user/ IUserRepository";
import UserModel from "../db/models/ UserModel";

export class UserRepository implements IUserRepository {
   async verifyUser(userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId,{isVerified:true});
  }
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return {
      id: String(userDoc._id),
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password,
      phone: userDoc.phone,
      isVerified: userDoc.isVerified,
      role: userDoc.role,
    };
  }

  async createUser(user: UserRegisterDTO): Promise<User> {
    const userDoc = new UserModel(user);
    await userDoc.save();
    return {
      id: String(userDoc._id),
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password,
      phone: userDoc.phone,
      isVerified: userDoc.isVerified,
      role: userDoc.role,
    };
  }
}
