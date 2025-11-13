export interface IGetAllUserDTO {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlock: boolean;
}

export class GetAllUserDTO implements IGetAllUserDTO {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlock: boolean;

  constructor(data: IGetAllUserDTO) {
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.isBlock = data.isBlock;
  }
}
