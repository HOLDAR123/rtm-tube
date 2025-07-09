import {PlanEnum} from "./interfaces/plan.enum";

;

export type IntervalType = "week" | "month" | "year" | "day";


export type PlanIntervalType = {
    [key in PlanEnum]: IntervalType;
};

export const planToInterval: PlanIntervalType = {
    [PlanEnum.WEEKLY]: "week",
    [PlanEnum.MONTHLY]: "month",
    [PlanEnum.YEARLY]: "year"
};