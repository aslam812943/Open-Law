
import { UserRegisterDTO } from "../../../application/dtos/user/ RegisterUserDTO";
import { User } from "../../../domain/entities/ User";
import { IUserRepository } from "../../../domain/repositories/user/ IUserRepository";
import UserModel, { IUserDocument } from "../../db/models/ UserModel";
import { BaseRepository } from "../user/BaseRepository";


//  UserRepository

export class UserRepository
  extends BaseRepository<IUserDocument>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  // ------------------------------------------------------------
  //  verifyUser()
  // ------------------------------------------------------------

  async verifyUser(userId: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(userId, { isVerified: true });
    } catch (error: any) {
      throw new Error("Database error while verifying user.");
    }
  }

  // ------------------------------------------------------------
  //  findByEmail()
  // ------------------------------------------------------------

  async findByEmail(email: string): Promise<User | null> {
    try {
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
        isBlock: userDoc.isBlock,
        hasSubmittedVerification: userDoc.hasSubmittedVerification ?? false,
      };
    } catch (error: any) {

      throw new Error("Database error while fetching user by email.");
    }
  }

  // ------------------------------------------------------------
  //  createUser()
  // ------------------------------------------------------------
  async createUser(user: UserRegisterDTO): Promise<User> {
    try {
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
        isBlock: userDoc.isBlock,
        hasSubmittedVerification: userDoc.hasSubmittedVerification ?? false,
      };
    } catch (error: any) {
    

      if (error.code === 11000) {
    
        throw new Error("A user with this email already exists.");
      }

      throw new Error("Database error while creating a new user.");
    }
  }

  // ------------------------------------------------------------
  // updateUserPassword()
  // ------------------------------------------------------------
  async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
    try {
      await this.update(userId, { password: hashedPassword });
    } catch (error: any) {
  
      throw new Error("Database error while updating user password.");
    }
  }

  // ------------------------------------------------------------
  //  markVerificationSubmitted()
  // ------------------------------------------------------------
  async markVerificationSubmitted(userId: string): Promise<void> {
    try {
      await this.update(userId, { hasSubmittedVerification: true });
    } catch (error: any) {
      throw new Error("Database error while marking verification submission.");
    }
  }

  // ------------------------------------------------------------
  //  findAll()
  // ------------------------------------------------------------
  async findAll(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    try {
      const skip = (page - 1) * limit;

      const [docs, total] = await Promise.all([
        UserModel.find({ role: "user" }).skip(skip).limit(limit).exec(),
        UserModel.countDocuments({ role: "user" }),
      ]);

      const users = docs.map((doc) => this.mapToDomain(doc));
      return { users, total };
    } catch (error: any) {
  
      throw new Error("Database error while fetching paginated users.");
    }
  }

  // ------------------------------------------------------------
  //  blockUser()
  // ------------------------------------------------------------
  async blockUser(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, { isBlock: true });
    } catch (error: any) {

      throw new Error("Database error while blocking user.");
    }
  }

  // ------------------------------------------------------------
  // 🧩unBlockUser()
  // ------------------------------------------------------------
  async unBlockUser(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, { isBlock: false });
    } catch (error: any) {

      throw new Error("Database error while unblocking user.");
    }
  }

  // ------------------------------------------------------------
  //  mapToDomain()
  // ------------------------------------------------------------
  private mapToDomain(doc: IUserDocument): User {
    return {
      id: String(doc._id),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      phone: doc.phone,
      isVerified: doc.isVerified,
      role: doc.role,
      isBlock: doc.isBlock,
      hasSubmittedVerification: doc.hasSubmittedVerification ?? false,
    };
  }
}
