import { Lawyer } from "../../../domain/entities/Lawyer";
import { GetAllLawyerDTO, IGetAllLawyerDTO } from "../../dtos/admin/GetAllLawyerDTO";

export class AdminLawyerMapper {
  static toAllLawyerDTO(lawyer: Lawyer): GetAllLawyerDTO {
    const dto: IGetAllLawyerDTO = {
      id: lawyer.id!,
      name: lawyer.user?.name ?? "N/A",
      email: lawyer.user?.email ?? "N/A",
      phone: String(lawyer.user?.phone ?? "0"),
      barNumber: lawyer.barNumber,
      barAdmissionDate: lawyer.barAdmissionDate,
      yearsOfPractice: lawyer.yearsOfPractice,
      practiceAreas: lawyer.practiceAreas || [],
      languages: lawyer.languages || [],
      documentUrls: lawyer.documentUrls || [],
      addresses: lawyer.addresses || [],
      verificationStatus: lawyer.verificationStatus,
      isVerified: lawyer.isVerified,
      isBlock: lawyer.user?.isBlock??false,
    };
    return new GetAllLawyerDTO(dto);
  }

  static toAllLawyerListDTO(lawyers: Lawyer[]): GetAllLawyerDTO[] {
    return lawyers.map(AdminLawyerMapper.toAllLawyerDTO);
  }
}
