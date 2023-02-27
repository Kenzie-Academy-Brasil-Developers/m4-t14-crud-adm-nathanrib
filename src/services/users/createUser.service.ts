import {
  IUserRequest,
  IUserResult,
  IuserWhitoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { AppError } from "../../errors";
import { QueryConfig } from "pg";
import { userSchemaWhitoutPassword } from "../../schemas/users.schemas";

const createUserService = async (
  userData: IUserRequest
): Promise<IuserWhitoutPassword> => {
  const queryStringUserExist: string = `
        SELECT * FROM users WHERE email = $1;
    `;

  const queryConfigUserExists: QueryConfig = {
    text: queryStringUserExist,
    values: [userData.email],
  };

  const queryResultUserExists = await client.query(queryConfigUserExists);

  if (queryResultUserExists.rowCount > 0) {
    throw new AppError("User already exists", 409);
  }

  const queryString = format(
    `
        INSERT INTO  users(%I) VALUES(%L) RETURNING *;
        `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(queryString);

  const newUser = userSchemaWhitoutPassword.parse(queryResult.rows[0]);

  return newUser;
};

export default createUserService;
