import { model, Schema, models } from "mongoose";
import { IFuturePlan } from "./FuturePlan.interface";

const FuturePlanSchema = new Schema<IFuturePlan>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    label: { type: String, required: true },
    description: { type: String, required: true },
    steps: [
        {
            content: {type: String, default: ""},
            isCompleted: {type: Boolean, default: false}
        }
    ],
    completionPercentage: { type: Number, default: 0},
    isPrivate: { type: Boolean, default: false}
}, { timestamps: true });


//middleware to calculate percentage
FuturePlanSchema.pre("save", function (next) {

  const totalSteps = this.steps.length;

  if (totalSteps === 0) {
    this.completionPercentage = 0;
  } else {

    const completedSteps = this.steps.filter(
      (step: any) => step.isCompleted
    ).length;

    this.completionPercentage = (completedSteps / totalSteps) * 100;
  }

  next();
});

const FuturePlanModel = models.FuturePlan || model<IFuturePlan>("FuturePlan", FuturePlanSchema);

export default FuturePlanModel;