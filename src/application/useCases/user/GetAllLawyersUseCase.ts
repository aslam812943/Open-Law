import { IGetAllLawyersUseCase } from "../interface/user/IGetAllLawyersUseCase";
import { ILawyerRepository } from "../../../domain/repositories/lawyer/ILawyerRepository";
import { UserLawyerMapper } from "../../mapper/user/UserLawyerMapper";


export class GetAllLawyersUseCase implements IGetAllLawyersUseCase{
    constructor(private _repo:ILawyerRepository){}
    async execute(query?: { page?: number; limit?: number; search?:string;sort?:string;filter?:string }): Promise<any> {
       
     const  {lawyers,total} = await this._repo.findAll(query)
      const lawyerDTOs = UserLawyerMapper.toGetLawyerListDTO(lawyers)

     return {lawyers:lawyerDTOs,total}
     
    }
}