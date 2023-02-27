import { Request, Response } from "express";
import { AppError } from "../errors";
import { IUserRequest } from "../interfaces/users.interfaces";
import activeUserService from "../services/users/activeUser.service";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import readAllUsersService from "../services/users/readAllusers.service";
import readUserLoggedService from "../services/users/readUserLogged.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const deleteUserControler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  if (userId !== req.user.id) {
    throw new AppError("you are not able to delete another user", 403);
  }
  await deleteUserService(userId);

  return res.status(204).send();
};

const readAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user.admin) {
    throw new AppError("only admins can read all the users", 403);
  }
  const users = await readAllUsersService();
  return res.json(users);
};

const readUserLoggedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await readUserLoggedService(req.user);
  return res.json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const atLeastKeys = ["name", "email", "admin", "active"];

  const verifyObjKeys = Object.keys(req.body);

  if (verifyObjKeys.length === 0) {
    throw new AppError(
      `at least one of those keys:${atLeastKeys}  must be send`
    );
  }

  const userData = req.body;
  const userId = parseInt(req.params.id);

  if (userId !== req.user.id) {
    throw new AppError("you are not able to update another user", 403);
  }

  const newUser = await updateUserService(userData, userId);

  return res.status(202).json(newUser);
};

const activeUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user.admin) {
    throw new AppError("only admins can active an user", 403);
  }

  const userId = parseInt(req.params.id);
  const userUpdated = await activeUserService(userId);

  return res.status(202).json(userUpdated);
};

export {
  createUserController,
  deleteUserControler,
  readAllUsersController,
  readUserLoggedController,
  updateUserController,
  activeUserController,
};
