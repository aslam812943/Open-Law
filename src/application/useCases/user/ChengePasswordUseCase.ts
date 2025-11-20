import { IUserRepository } from "../../../domain/repositories/user/ IUserRepository";
import { IChangePasswordUseCase } from "../../useCases/interface/user/IGetProfileUseCase";
import { ChangePasswordDTO } from "../../dtos/user/ChangePasswordDTO";


export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(private readonly _user_repo: IUserRepository) {}

  async execute(dto: ChangePasswordDTO): Promise<{ message: string }> {
    console.log("Change password use case triggered:", dto);

    try {
    
      if (!dto.id) {
        throw new Error("User ID is missing.");
      }
      if (!dto.oldPassword || !dto.newPassword) {
        throw new Error("Both old and new passwords are required.");
      }
      if (dto.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters long.");
      }


      const result = await this._user_repo.changePassword(
        dto.id,
        dto.oldPassword,
        dto.newPassword
      );

  
      return { message: "Password changed successfully." };

    } catch (err: any) {
    
      console.error("Error in ChangePasswordUseCase:", err.message);

      throw new Error(err.message || "Password change failed.");
    }
  }
}
