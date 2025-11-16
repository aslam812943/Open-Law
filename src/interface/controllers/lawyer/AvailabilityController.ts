import { Request,Response } from "express";
import { ICreateAvailabilityRuleUseCase } from "../../../application/useCases/interface/lawyer/ICreateAvailabilityRuleUseCase";
import { CreateAvailabilityRuleDTO } from "../../../application/dtos/lawyer/CreateAvailabilityRuleDTO";
import { UpdateAvailabilityRuleDTO } from "../../../application/dtos/lawyer/UpdateAvailabilityRuleDTO";
import { IUpdateAvailabilityRuleUseCase } from "../../../application/useCases/interface/lawyer/ICreateAvailabilityRuleUseCase";
import { IGetAllAvailableRuleUseCase } from "../../../application/useCases/interface/lawyer/ICreateAvailabilityRuleUseCase";
import { success } from "zod";
export class AvailabilityController{
    constructor(private readonly _createRuleUseCase:ICreateAvailabilityRuleUseCase,private readonly _updateAvilableUseCase:IUpdateAvailabilityRuleUseCase,private readonly _gtavailableUsecase:IGetAllAvailableRuleUseCase){}
async createRule(req: Request, res: Response) {
  

  try {
    const data = req.body.ruleData;   
    const lawyerId = req.body.lawyerId;

    if (!lawyerId) {
      return res.status(400).json({ success: false, message: "lawyerId missing" });
    }

    const dto = new CreateAvailabilityRuleDTO(
      data.title,
      data.startTime,
      data.endTime,
      data.startDate,
      data.endDate,
      data.availableDays,
      data.bufferTime,
      data.slotDuration,
      data.maxBookings,
      data.sessionType,
      data.exceptionDays,
      lawyerId
    );

    const result = await this._createRuleUseCase.execute(dto);

    res.status(201).json({
      success: true,
      message: "Rule & slots created successfully",
      data: result
    });

  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}



async updateRule(req:Request,res:Response){
  try{
const dto =new UpdateAvailabilityRuleDTO(
     req.body.title,
      req.body.startTime,
      req.body.endTime,
      req.body.startDate,
      req.body.endDate,
      req.body.availableDays,
      req.body.bufferTime,
      req.body.slotDuration,
      req.body.maxBookings,
      req.body.sessionType,
      req.body.exceptionDays
)
const ruleId ='691840f3abcdac629ba54926'

const result = await this._updateAvilableUseCase.execute(ruleId,dto)
 res.status(200).json({
      success: true,
      message: "Rule updated & slots regenerated",
      data: result
    });

  }catch(error){

  }
}


async getAllRuls(req:Request,res:Response){
  console.log('ella rulsrun njn tharum ')
  try{
const lawyerId = req.params.lawyerId
console.log(lawyerId)
if(!lawyerId) {
  return res.status(400).json({success:false,message:'lawyerId missing'})

}
  const rules = await this._gtavailableUsecase.execute(lawyerId)
console.log('all ruls response :',[{...rules}])
   return res.status(200).json({
        success: true,
        message: "Rules fetched successfully",
        data: rules 
      });
  }catch(error:any){
      return res.status(500).json({ success: false, message: error.message });

  }
}
}