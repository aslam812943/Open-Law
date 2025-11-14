import { CreateAvailabilityRuleDTO } from "../../../dtos/lawyer/CreateAvailabilityRuleDTO";
import { AvailabilityRule } from "../../../../domain/entities/AvailabilityRule";
import { Slot } from "../../../../domain/entities/Slot";



export interface ICreateAvailabilityRuleUseCase{
    execute(dto:CreateAvailabilityRuleDTO):Promise<{rule:AvailabilityRule;slots:any}>
}