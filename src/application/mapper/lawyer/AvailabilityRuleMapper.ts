import { AvailabilityRule } from "../../../domain/entities/AvailabilityRule";
import { CreateAvailabilityRuleDTO } from "../../dtos/lawyer/CreateAvailabilityRuleDTO";
import { GetAvailabilityRuleDTO } from "../../dtos/lawyer/ResponseGetAllRuleDTO";


export class AvailabilityRuleMapper{
    static toEntity(dto:CreateAvailabilityRuleDTO):AvailabilityRule{
        return new AvailabilityRule(
            '',
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


    static toDTO(entity: AvailabilityRule): GetAvailabilityRuleDTO {
    return new GetAvailabilityRuleDTO(
      entity.id,
      entity.title,
      entity.startTime,
      entity.endTime,
      entity.startDate,
      entity.endDate,
      entity.availableDays,
      entity.bufferTime,
      entity.slotDuration,
      entity.maxBookings,
      entity.sessionType,
      entity.exceptionDays,
      entity.lawyerId,
    
    );
  }


    static toDTOList(entities: AvailabilityRule[]): GetAvailabilityRuleDTO[] {
    return entities.map((e) => this.toDTO(e));
  }
}