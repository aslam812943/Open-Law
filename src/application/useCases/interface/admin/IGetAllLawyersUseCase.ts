import { IUseCase } from "../../common/IUseCase";
import { GetAllLawyerDTO } from "../../../dtos/admin/GetAllLawyerDTO";

export interface IGetAllLawyersUseCase
  extends IUseCase<{ page?: number; limit?: number; search?: string }, { lawyers: GetAllLawyerDTO[]; total: number }> {}