
import { IBlockLawyerUseCase } from "../../../application/useCases/interface/admin/IBlockLawyerUseCase";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";


//  BlockLawyerController

export class BlockLawyerController {
  constructor(private readonly _blockLawyerUseCase: IBlockLawyerUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
    

      const { id } = req.params;

      await this._blockLawyerUseCase.execute(id);

      
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Lawyer blocked successfully.",
      });
    } catch (error: any) {
     

      
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "An unexpected error occurred while blocking the lawyer.",
      });
    }
  }
}
