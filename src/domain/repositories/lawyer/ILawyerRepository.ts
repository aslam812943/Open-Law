import { Lawyer } from "../../entities/Lawyer";
import { VerificationLawyerDTO } from "../../../application/dtos/lawyer/VerificationLawyerDTO";

export interface ILawyerRepository {
  createLawyer(lawyer: VerificationLawyerDTO): Promise<Lawyer>;
findAll(query?: { page?: number; limit?: number; search?: string }): Promise<{ lawyers: Lawyer[]; total: number }>;
  blockLawyer(id:string):Promise<void>;
  unBlockLawyer(id:string):Promise<void>;
  approveLawyer(id:string):Promise<void>;
  rejectLawyer(id:string):Promise<void>;
}
