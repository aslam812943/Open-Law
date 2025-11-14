import { CreateAvailabilityRuleDTO } from "../../../application/dtos/lawyer/CreateAvailabilityRuleDTO";
export interface IAvailabilityRuleRepository{
    createRule(rule:CreateAvailabilityRuleDTO):Promise<any>;
    createSlots(ruleId:string,slots:any[]):Promise<any>;
}