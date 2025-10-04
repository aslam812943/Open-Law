export class VerifyOTPDTO {
    email: string;
    otp: string;

    constructor(data: Partial<VerifyOTPDTO>) {
        if (!data.email) throw new Error('Email is required');
        if (data.otp || data.otp?.length !== 6) throw new Error('valid 6-digit OTP is required')
        this.email = data.email;
        this.otp = data.otp

        
    }
   
}