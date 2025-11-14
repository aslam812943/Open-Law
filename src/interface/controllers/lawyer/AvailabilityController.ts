import { Request,Response } from "express";
import { ICreateAvailabilityRuleUseCase } from "../../../application/useCases/interface/lawyer/ICreateAvailabilityRuleUseCase";
import { CreateAvailabilityRuleDTO } from "../../../application/dtos/lawyer/CreateAvailabilityRuleDTO";



export class AvailabilityController{
    constructor(private readonly _createRuleUseCase:ICreateAvailabilityRuleUseCase){}
async createRule(req: Request, res: Response) {
  console.log("REQUEST BODY:", JSON.stringify(req.body, null, 2));

  try {
    const data = req.body.ruleData;   // <── FIX
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
}