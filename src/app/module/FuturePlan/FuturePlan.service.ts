import mongoose from "mongoose";
import ApiError from "../../../error/ApiError";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { IFuturePlan } from "./FuturePlan.interface";
import FuturePlanModel from "./FuturePlan.model";


const addFuturePlanService = async (userDetails: IJwtPayload, payload: Partial<IFuturePlan>) => {

    const {profileId} = userDetails;

    const newPlan = await FuturePlanModel.create({
        user: profileId, ...payload
    });

    if(!newPlan){
        throw new ApiError(500,"Failed to add new plan");
    }

    return newPlan;
};

const addnewStepsToPlanService = async (id: string, payload: {content: string}) => {

    // const planId = "PLAN_ID_HERE";

    const newStep = {
        content: payload.content,
        isCompleted: false
    };

    const plan = await FuturePlanModel.findByIdAndUpdate(
        id,
        {
            $push: { steps: newStep }
        },
        { new: true } // returns the updated document
    );

    // console.log(updatedPlan);

    // const plan = await FuturePlanModel.findById(id);

    // if (plan) {
    //     plan.steps.push({
    //         content: payload.content,
    //         isCompleted: false
    //     });

    //     await plan.save();
    // }

    if(!plan){
        throw new ApiError(500,"Failed to add new step in the plan.");
    }

    return null;

    
}

const markStepAsCompletedService = async (query: Record<string,unknown>) => {

    const {planId, stepId} = query;

    const plan = await FuturePlanModel.findOne({
        _id: planId,
        "steps._id": stepId
    });

    if (plan) {
        const step = plan.steps.id(stepId);
        step.isCompleted = !step.isCompleted;
        await plan.save(); //middleware runs here
    }

    if(!plan){
        throw new ApiError(500,"Failed to mark a plan as completed.");
    }

    // //calculate the completed plan percentage percentage
    // const result = await FuturePlanModel.aggregate([

    //     { $match: { _id: new mongoose.Types.ObjectId(planId as string) } },
    //     {
    //         $project: {
    //         totalSteps: { $size: "$steps" },
    //         completedSteps: {
    //             $size: {
    //             $filter: {
    //                 input: "$steps",
    //                 as: "step",
    //                 cond: { $eq: ["$$step.isCompleted", true] }
    //             }
    //             }
    //         }
    //         }
    //     }
    // ]);
}

const getMyPlanService = async (query: Record<string,unknown>) => {

    const {coupleId} = query;

    const plans = await FuturePlanModel.find({couple: coupleId}).sort({createdAt: -1}).lean();

    return plans;
}


const FuturePlanServices = { 
    addFuturePlanService,
    addnewStepsToPlanService,
    markStepAsCompletedService,
    getMyPlanService
 };

export default FuturePlanServices;