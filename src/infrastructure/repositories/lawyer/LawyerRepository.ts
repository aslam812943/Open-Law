
import LawyerModel, { ILawyerDocument } from "../../db/models/LawyerModel";
import UserModel from "../../db/models/ UserModel";
import { VerificationLawyerDTO } from "../../../application/dtos/lawyer/VerificationLawyerDTO";
import { Lawyer } from "../../../domain/entities/Lawyer";
import { ILawyerRepository } from "../../../domain/repositories/lawyer/ILawyerRepository";
import { UserRepository } from "../user/UserRepository";
import { IUserRepository } from "../../../domain/repositories/user/ IUserRepository";
import { Types } from "mongoose";


//  LawyerRepository

export class LawyerRepository implements ILawyerRepository {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // ------------------------------------------------------------
  //  createLawyer()
  // ------------------------------------------------------------
  async createLawyer(lawyer: VerificationLawyerDTO): Promise<Lawyer> {
    try {
      const lawyerDoc = (await LawyerModel.create(lawyer)) as ILawyerDocument;

    
      await this.userRepository.markVerificationSubmitted(lawyerDoc.userId.toString());

    
      return {
        userId: lawyerDoc.userId.toString(),
        barNumber: lawyerDoc.barNumber,
        barAdmissionDate: lawyerDoc.barAdmissionDate,
        yearsOfPractice: lawyerDoc.yearsOfPractice,
        practiceAreas: lawyerDoc.practiceAreas,
        languages: lawyerDoc.languages,
        documentUrls: lawyerDoc.documentUrls,
        addresses: lawyerDoc.addresses,
        isVerified: lawyerDoc.isAdminVerified,
      };
    } catch (error: any) {
      throw new Error("Database error while creating lawyer record.");
    }
  }

  // ------------------------------------------------------------
  //  findAll(
  // ------------------------------------------------------------
  async findAll(query?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ lawyers: Lawyer[]; total: number }> {
    try {
      const page = query?.page ?? 1;
      const limit = query?.limit ?? 10;
      const search = query?.search ?? "";

      const filter = search
        ? { barNumber: { $regex: search, $options: "i" } }
        : {};

      const [lawyerDocs, total] = await Promise.all([
        LawyerModel.find(filter)
          .populate({
            path: "userId",
            select: "name email phone role isBlock",
            match: { role: { $ne: "admin" } },
          })
          .skip((page - 1) * limit)
          .limit(limit)
          .exec(),

        LawyerModel.countDocuments(filter),
      ]);

      const validLawyers = lawyerDocs.filter((doc) => doc.userId !== null);

      const lawyers = validLawyers.map((doc) => ({
        id: (doc._id as Types.ObjectId).toString(),
        userId: (doc.userId as any)._id.toString(),
        barNumber: doc.barNumber,
        barAdmissionDate: doc.barAdmissionDate,
        yearsOfPractice: doc.yearsOfPractice,
        practiceAreas: doc.practiceAreas,
        languages: doc.languages,
        documentUrls: doc.documentUrls,
        addresses: doc.addresses,
        verificationStatus: doc.verificationStatus,
        isVerified: doc.isAdminVerified,
        user: {
          name: (doc.userId as any).name,
          email: (doc.userId as any).email,
          phone: (doc.userId as any).phone,
          isBlock: (doc.userId as any).isBlock,
        },
      }));

      return { lawyers, total };
    } catch (error: any) {
      throw new Error("Database error while fetching lawyers.");
    }
  }

  // ------------------------------------------------------------
  //  blockLawyer()
  // ------------------------------------------------------------
  async blockLawyer(id: string): Promise<void> {
    try {
      const lawyer = await LawyerModel.findById(id);
      if (!lawyer) throw new Error("Lawyer not found.");

      await UserModel.findByIdAndUpdate(lawyer.userId, { isBlock: true });
    } catch (error: any) {
      throw new Error("Database error while blocking lawyer.");
    }
  }

  // ------------------------------------------------------------
  //  unBlockLawyer()
  // ------------------------------------------------------------
  async unBlockLawyer(id: string): Promise<void> {
    try {
      const lawyer = await LawyerModel.findById(id);
      if (!lawyer) throw new Error("Lawyer not found.");

      await UserModel.findByIdAndUpdate(lawyer.userId, { isBlock: false });
    } catch (error: any) {

      throw new Error("Database error while unblocking lawyer.");
    }
  }

  // ------------------------------------------------------------
  //  approveLawyer()
  // ------------------------------------------------------------
  async approveLawyer(id: string): Promise<void> {
    try {
      const lawyer = await LawyerModel.findById(id);
      if (!lawyer) throw new Error("Lawyer not found.");

      lawyer.isAdminVerified = true;
      lawyer.verificationStatus = "Approved";
      await lawyer.save();
    } catch (error: any) {
   
      throw new Error("Database error while approving lawyer.");
    }
  }

  // ------------------------------------------------------------
  //  rejectLawyer()
  // ------------------------------------------------------------
  async rejectLawyer(id: string): Promise<void> {
    try {
      const lawyer = await LawyerModel.findById(id);
      if (!lawyer) throw new Error("Lawyer not found.");

      lawyer.isAdminVerified = false;
      lawyer.verificationStatus = "Rejected";
      await lawyer.save();
    } catch (error: any) {
      throw new Error("Database error while rejecting lawyer.");
    }
  }
}
