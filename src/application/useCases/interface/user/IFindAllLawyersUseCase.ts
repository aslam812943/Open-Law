



export interface IGetAllLawyersUseCase{
    execute(query?: { page?: number; limit?: number; search?: string }):Promise<any>
}