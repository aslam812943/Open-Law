
import { UserRegisterDTO } from "../../../dtos/user/ RegisterUserDTO";
import { OtpService } from "../../../../infrastructure/services/otp/OtpService";


//  GenerateOtpUseCase

export class GenerateOtpUseCase {
  constructor(private otpService: OtpService) {}


  async execute(email: string, data: UserRegisterDTO): Promise<string> {
    try {
     
      if (!email || !data) {
        throw new Error("Email and user data are required to generate OTP.");
      }

      const otp = await this.otpService.generateOtp(email, data);

      if (!otp) {
        throw new Error("Failed to generate OTP. Please try again.");
      }

  
      return otp;
    } catch (error: any) {
     

      throw new Error(error.message || "Unexpected error while generating OTP.");
    }
  }
}
