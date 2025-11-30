import { Response,Request } from "express";
import { IGetAllLawyersUseCase } from "../../../application/useCases/interface/admin/IGetAllLawyersUseCase";
import { success } from "zod";


export class GetAllLawyersController{
    constructor(private _getalllawyersusecase:IGetAllLawyersUseCase){}



      async GetAllLawyers(req:Request,res:Response){


         const page = Number(req.query.page) || 1;          
      const limit = Number(req.query.limit) || 10;      
      const search = String(req.query.search || ""); 

     const response=    await this._getalllawyersusecase.execute({page,limit,search})
    

     res.status(200).json({success:true,message:'done',response})
      }
}