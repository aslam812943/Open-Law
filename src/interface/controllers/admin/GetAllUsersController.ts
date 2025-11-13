
import { Response, Request } from "express";
import { IGetAllUsersUseCase } from "../../../application/useCases/interface/admin/IGetAllUsersUseCase";
import { GetAllUserDTO } from "../../../application/dtos/admin/GetAllUserDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";

interface PaginationInput {
  page: number;
  limit: number;
}

//  GetAllUsersController

export class GetAllUsersController {
  constructor(
    private _getAllUserUseCase: IGetAllUsersUseCase<
      PaginationInput,
      { users: GetAllUserDTO[]; total: number }
    >
  ) {}


  async handle(req: Request, res: Response): Promise<Response> {
    try {


      const page = parseInt(req.query.page as string) || 1; 
      const limit = parseInt(req.query.limit as string) || 10; 


      const { users, total } = await this._getAllUserUseCase.execute({ page, limit });

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Users fetched successfully.",
        users,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });

    } catch (err: any) {
     

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "An unexpected error occurred while fetching users.",
      });
    }
  }
}
