import { ICreateAvailabilityRuleUseCase } from "../interface/lawyer/ICreateAvailabilityRuleUseCase";
import { IAvailabilityRuleRepository } from "../../../domain/repositories/lawyer/IAvailabilityRuleRepository";
import { AvailabilityRule } from "../../../domain/entities/AvailabilityRule";
import { CreateAvailabilityRuleDTO } from "../../dtos/lawyer/CreateAvailabilityRuleDTO";
import { AvailabilityRuleMapper } from "../../mapper/lawyer/AvailabilityRuleMapper";
import { SlotGeneratorService } from "../../../infrastructure/services/SlotGenerator/SlotGeneratorService";
import { Slot } from "../../../domain/entities/Slot";
export class CreateAvailabilityRuleUseCase implements ICreateAvailabilityRuleUseCase{
    constructor(private readonly _repo:IAvailabilityRuleRepository){}

    async execute(dto: CreateAvailabilityRuleDTO): Promise<{ rule: AvailabilityRule; slots: Slot[]; }> {
        const rule = AvailabilityRuleMapper.toEntity(dto)
        const createRule = await this._repo.createRule(rule);
        const generateSlots = SlotGeneratorService.generateSlots(rule)
      
        await this._repo.createSlots(createRule._id.toString(),generateSlots)
        return {rule:createRule,slots:generateSlots}
    }
}