



export interface IGetAllLawyersUseCase{
    execute(query?: { page?: number; limit?: number; search?: string ;sort?:string;filter?:string}):Promise<any>
}