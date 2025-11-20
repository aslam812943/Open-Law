import { ResponseGetProfileDTO } from "../../../dtos/user/ResponseGetProfileDTO"
import { ChangePasswordDTO } from "../../../dtos/user/ChangePasswordDTO"

export interface IGetProfileUseCase{
    execute(id:string) :Promise<ResponseGetProfileDTO>
}



export interface IChangePasswordUseCase{
    execute(data:ChangePasswordDTO):Promise<any>
}