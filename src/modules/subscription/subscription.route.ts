import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/client";

const router = Router();

router.post("/checkout", auth(Role.USER, Role.ADMIN, Role.AUTHOR), subscriptionController.createCheckoutSession);

export const subscriptionRouter = router