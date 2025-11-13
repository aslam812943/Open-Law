
import { Request, Response } from "express";
import { IUNBlockUserUseCase } from "../../../application/useCases/interface/admin/IUNBlockUserUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";


// ✅ UNBlockUserController

export class UNBlockUserController {
  constructor(private readonly _unblockUserUseCase: IUNBlockUserUseCase) {}


  async handle(req: Request, res: Response): Promise<void> {
 

    try {
  
      const id = req.params.id;

    
      await this._unblockUserUseCase.execute(id);

  
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "User unblocked successfully.",
      });
    } catch (error: any) {
      console.log("Error in UNBlockUserController.handle:", error);

  
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          error.message ||
          "An unexpected error occurred while unblocking the user.",
      });
    }
  }
}
