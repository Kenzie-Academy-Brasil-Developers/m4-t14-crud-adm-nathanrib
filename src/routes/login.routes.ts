import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import ensuranceDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensuranceDataIsValidMiddleware(createLoginSchema),
  createLoginController
);

export default loginRoutes;
