import { AvailabilityRule } from "../../../domain/entities/AvailabilityRule";
import { CreateAvailabilityRuleDTO } from "../../dtos/lawyer/CreateAvailabilityRuleDTO";



export class AvailabilityRuleMapper{
    static toEntity(dto:CreateAvailabilityRuleDTO):AvailabilityRule{
        return new AvailabilityRule(
                dto.title,
      dto.startTime,
      dto.endTime,
      dto.startDate,
      dto.endDate,
      dto.availableDays,
      dto.bufferTime,
      dto.slotDuration,
      dto.maxBookings,
      dto.sessionType,
      dto.exceptionDays,
      dto.lawyerId
        )
    }
}