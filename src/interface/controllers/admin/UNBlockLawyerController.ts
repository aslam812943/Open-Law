
import { Request, Response } from "express";
import { IUNBlockLawyerUseCase } from "../../../application/useCases/interface/admin/IUnBlockLawyerUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";


//  UNBlockLawyerController

export class UNBlockLawyerController {
  constructor(private readonly _unblockLawyerUseCase: IUNBlockLawyerUseCase) {}


  async handle(req: Request, res: Response): Promise<void> {
 

    try {
     
      const id = req.params.id;

      //
      await this._unblockLawyerUseCase.execute(id);

      
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Lawyer unblocked successfully.",
      });
    } catch (error: any) {
    

      
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          error.message ||
          "An unexpected error occurred while unblocking the lawyer.",
      });
    }
  }
}
