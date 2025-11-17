

export class Slot {
  constructor(
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly date: string,
    public readonly sessionType: string,
    public readonly ruleId: string,
    public isBooked: boolean = false,
    public bookingId?: string | null
  ) {}
}
