import { Router } from "express";
import {
  activeUserController,
  createUserController,
  deleteUserControler,
  readAllUsersController,
  readUserLoggedController,
  updateUserController,
} from "../controllers/users.controllers";
import { createUserSchema, userUpdateSchema } from "../schemas/users.schemas";
import ensuranceDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import validateToken from "../middlewares/validateToken";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensuranceDataIsValidMiddleware(createUserSchema),
  createUserController
);
userRoutes.delete("/:id", validateToken, deleteUserControler);
userRoutes.get("", validateToken, readAllUsersController);
userRoutes.get("/profile", validateToken, readUserLoggedController);
userRoutes.patch(
  "/:id",
  validateToken,
  ensuranceDataIsValidMiddleware(userUpdateSchema),
  updateUserController
);
userRoutes.put(
  "/:id/recover",
  validateToken,
  ensuranceDataIsValidMiddleware(createUserSchema),
  activeUserController
);

export default userRoutes;
