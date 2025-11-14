import { CreateAvailabilityRuleDTO } from "../../../application/dtos/lawyer/CreateAvailabilityRuleDTO";
import { IAvailabilityRuleRepository } from "../../../domain/repositories/lawyer/IAvailabilityRuleRepository";
import AvailabilityRuleModel from "../../db/models/AvailabilityRuleModel";
import SlotModel from "../../db/models/SlotModel";



export class AvailabilityRuleRepository  implements IAvailabilityRuleRepository{
    async createRule(rule: CreateAvailabilityRuleDTO): Promise<any> {
        return AvailabilityRuleModel.create(rule)
    }


    async createSlots(ruleId: string, slots: any[]): Promise<any> {
        const formatted = slots.map(s=>({...s,ruleId}))
        return SlotModel.insertMany(formatted)
    }
}