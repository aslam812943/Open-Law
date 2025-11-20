import { Request, Response } from "express";
import { IGetProfileUseCase, IChangePasswordUseCase } from "../../../application/useCases/interface/user/IGetProfileUseCase";
import { ChangePasswordDTO } from "../../../application/dtos/user/ChangePasswordDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
export class GetProfileController {
  constructor(
    private readonly _getprofileusecase: IGetProfileUseCase,
    private readonly _chengepasswordusecase: IChangePasswordUseCase
  ) {}

  async getprofiledetils(req: Request, res: Response) {
    try {
      const id = req.user?.id;
          if (!id) {
        return res.status(HttpStatusCode.FORBIDDEN).json({
          success: false,
          message: 'Unauthorized: User ID missing'
        });
      }
      const data = await this._getprofileusecase.execute(id);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: 'Profile fetch successful',
        data
      });
    } catch (error: any) {
      console.error('Error fetching profile:', error);

      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Failed to fetch profile details',
        error: error.stack || undefined
      });
    }
  }

  async chengePassword(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(HttpStatusCode.FORBIDDEN).json({
          success: false,
          message: 'Unauthorized: User ID missing'
        });
      }

      const dto = new ChangePasswordDTO(userId, req.body.oldPassword, req.body.newPassword);
      await this._chengepasswordusecase.execute(dto);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error: any) {
    

      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Failed to change password',
     
      });
    }
  }
}
