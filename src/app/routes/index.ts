import { Router } from "express";
import authRouter from "../module/auth/auth.routes";
import userRouter from "../module/User/User.routes";
import DestinationRouter from "../module/Destination/Destination.routes";
import ExperienceRouter from "../module/Experience/Experience.routes";
import FuturePlanRouter from "../module/FuturePlan/FuturePlan.routes";

const allRouter = Router();


const moduleRoutes = [
    {
        path: '/auth',
        router: authRouter,
    },
    {
        path: '/user',
        router: userRouter,
    },
    {
        path: '/destination',
        router: DestinationRouter,
    },
    {
        path: '/experience',
        router: ExperienceRouter,
    },
    {
        path: '/future',
        router: FuturePlanRouter,
    },
    
];

moduleRoutes.forEach((route) => allRouter.use(route.path, route.router));

export default allRouter;