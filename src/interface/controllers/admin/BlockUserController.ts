
import { Request, Response } from "express";
import { IBlockUserUseCase } from "../../../application/useCases/interface/admin/IBlockUserUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";


//  BlockUserController

export class BlockUserController {
    constructor(private _blockuserUseCase: IBlockUserUseCase) { }


    async handle(req: Request, res: Response): Promise<void> {
        try {

            const id = req.params.id;


            await this._blockuserUseCase.execute(id);


            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "User blocked successfully.",
            });

        } catch (err: any) {
          


            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: err.message || "An unexpected error occurred while blocking the user.",
            });
        }
    }
}
