export interface Lawyer {
  id?: string;
  userId: string;
  barNumber: string;
  barAdmissionDate: string;
  yearsOfPractice: number;
  practiceAreas: string[];
  languages: string[];
  documentUrls: string[];
  addresses?: string[];
  verificationStatus?: string;
  isVerified: boolean;
  


  user?: {
    name: string;
    email: string;
    phone: number;
    isBlock: boolean;
  };
}
