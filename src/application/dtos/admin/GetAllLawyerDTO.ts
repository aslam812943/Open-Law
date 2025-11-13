export interface IGetAllLawyerDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  barNumber: string;
  barAdmissionDate: string;
  yearsOfPractice: number;
  practiceAreas: string[];
  languages: string[];
  documentUrls: string[];
  addresses: string[];
  verificationStatus?: string;
  isVerified: boolean;
  isBlock: boolean;
}

export class GetAllLawyerDTO implements IGetAllLawyerDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  barNumber: string;
  barAdmissionDate: string;
  yearsOfPractice: number;
  practiceAreas: string[];
  languages: string[];
  documentUrls: string[];
  addresses: string[];
  verificationStatus?: string;
  isVerified: boolean;
  isBlock: boolean;

  constructor(data: IGetAllLawyerDTO) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.barNumber = data.barNumber;
    this.barAdmissionDate = data.barAdmissionDate;
    this.yearsOfPractice = data.yearsOfPractice;
    this.practiceAreas = data.practiceAreas;
    this.languages = data.languages;
    this.documentUrls = data.documentUrls;
    this.addresses = data.addresses;
    this.verificationStatus = data.verificationStatus;
    this.isVerified = data.isVerified;
    this.isBlock = data.isBlock;
  }
}
