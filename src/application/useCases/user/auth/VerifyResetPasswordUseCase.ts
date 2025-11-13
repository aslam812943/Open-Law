
import { IUserRepository } from "../../../../domain/repositories/user/ IUserRepository";
import { OtpService } from "../../../../infrastructure/services/otp/OtpService";
import { ResetPasswordDTO } from "../../../dtos/user/ResetPasswordDTO";
import bcrypt from "bcrypt";


//  VerifyResetPasswordUseCase

export class VerifyResetPasswordUseCase {
    constructor(
        private _userRepository: IUserRepository,
        private _otpService: OtpService
    ) { }


    async execute(data: ResetPasswordDTO): Promise<string> {
        try {



            if (!data.email || !data.otp || !data.newPassword) {
                throw new Error("Email, OTP, and new password are required.");
            }


            const stored = await this._otpService.verifyOtp(data.email, data.otp);
            if (!stored) {
                throw new Error("Invalid or expired OTP. Please request a new one.");
            }


            const hashedPassword = await bcrypt.hash(data.newPassword, 10);


            await this._userRepository.updateUserPassword(stored.userId, hashedPassword);




            return "Password reset successfully.";
        } catch (error: any) {



            throw new Error(
                error.message || "Failed to reset password. Please try again later."
            );
        }
    }
}
