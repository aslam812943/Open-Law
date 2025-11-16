import { CreateAvailabilityRuleDTO } from "../../../application/dtos/lawyer/CreateAvailabilityRuleDTO";
import { UpdateAvailabilityRuleDTO } from "../../../application/dtos/lawyer/UpdateAvailabilityRuleDTO";
import { IAvailabilityRuleRepository } from "../../../domain/repositories/lawyer/IAvailabilityRuleRepository";
import AvailabilityRuleModel from "../../db/models/AvailabilityRuleModel";
import SlotModel from "../../db/models/SlotModel";
import { AvailabilityRule } from "../../../domain/entities/AvailabilityRule";
import mongoose from "mongoose";

export class AvailabilityRuleRepository  implements IAvailabilityRuleRepository{
    async createRule(rule: CreateAvailabilityRuleDTO): Promise<any> {
        return AvailabilityRuleModel.create(rule)
    }


    async createSlots(ruleId: string, slots: any[]): Promise<any> {
        const formatted = slots.map(s=>({...s,ruleId}))
        return SlotModel.insertMany(formatted)
    }


    async updateRule(ruleId: string, updated: UpdateAvailabilityRuleDTO): Promise<any> {
        return AvailabilityRuleModel.findByIdAndUpdate(ruleId,updated,{new:true})
    }

    async deleteSlotsByRuleId(ruleId: string): Promise<void> {
        await SlotModel.deleteMany({ruleId})
    }

     async getRuleById(ruleId: string): Promise<any> {
        return AvailabilityRuleModel.findById(ruleId)
    }


    async getAllRules(id:string): Promise<AvailabilityRule[]> {
        const docs = await AvailabilityRuleModel.find({
    lawyerId: new mongoose.Types.ObjectId(id)
  });
      
            return docs.map((doc: any) =>
      new AvailabilityRule(
        doc._id.toString(),
        doc.title,
        doc.startTime,
        doc.endTime,
        doc.startDate,
        doc.endDate,
        doc.availableDays,
        doc.bufferTime,
        doc.slotDuration,
        doc.maxBookings,
        doc.sessionType,
        doc.exceptionDays,
        doc.lawyerId.toString(),
      )
    );
    }
}