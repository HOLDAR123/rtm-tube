import {PlanEnum} from "../types/interfaces/plan.enum";
import {IntervalType, planToInterval} from "../types/plan";


export default function getInterval(plan: PlanEnum): IntervalType {
  return planToInterval[plan];
}
