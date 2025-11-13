export class LoginUserDTO {
  email: string;
  password: string;

  constructor(data: Partial<LoginUserDTO>) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      throw new Error("A valid email address is required");
    }
    if (!data.password) {
      
      throw new Error("Password must be provided");
    }
    this.email = data.email;
    this.password = data.password;

  }
}