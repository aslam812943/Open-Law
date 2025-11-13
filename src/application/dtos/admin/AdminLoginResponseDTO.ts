export default class AdminLoginResponseDTO {
  id: string;
  name: string;
  email: string;
  token: string;
refreshToken:string;
  constructor(data: Partial<AdminLoginResponseDTO>) {
    this.id = data.id!;
    this.name = data.name!;
    this.email = data.email!;
    this.token = data.token!;
    this.refreshToken = data.refreshToken!
  }
}
