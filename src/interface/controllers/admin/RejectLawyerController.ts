
import { Request, Response } from "express";
import { IRejectLawyerUseCase } from "../../../application/useCases/interface/admin/IRejectLawyerUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";


//  RejectLawyerController

export class RejectLawyerController {
  constructor(private readonly _rejectLawyerUseCase: IRejectLawyerUseCase) {}


  async handle(req: Request, res: Response): Promise<void> {
    try {
      

      const id = req.params.id;
const {reason,email} = req.body;

      await this._rejectLawyerUseCase.execute(id,email,reason);

   
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Lawyer rejected successfully.",
      });
    } catch (err: any) {
     

     
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          err.message ||
          "An unexpected error occurred while rejecting the lawyer.",
      });
    }
  }
}
