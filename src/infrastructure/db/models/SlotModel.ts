import { Schema,Document,Types,model } from "mongoose";

export interface ISlotModel extends Document{
    ruleId:Types.ObjectId,
      date: string,
  startTime: string,
  endTime: string,
  sessionType: string,
  maxBookings: number,
  bookedCount: number
}


const SlotSchema = new Schema<ISlotModel>({
  ruleId: { type: Schema.Types.ObjectId, ref: "AvailabilityRule" },
  date: String,
  startTime: String,
  endTime: String,
  sessionType: String,
  maxBookings: Number,
  bookedCount: { type: Number, default: 0 }
},{timestamps:true})


export default model('Slot',SlotSchema)