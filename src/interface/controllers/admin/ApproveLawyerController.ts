
import { Request, Response } from "express";
import { IApproveLawyerUseCase } from "../../../application/useCases/interface/admin/IApproveLawyerUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";


//  ApproveLawyerController

export class ApproveLawyerController {
  constructor(private readonly _approveLawyerUseCase: IApproveLawyerUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
   

      const id = req.params.id;
      const {email} = req.body;
     
      await this._approveLawyerUseCase.execute(id,email);

   
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Lawyer approved successfully.",
      });

    } catch (error: any) {
   

      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          error.message || "An unexpected error occurred while approving the lawyer.",
      });
    }
  }
}
