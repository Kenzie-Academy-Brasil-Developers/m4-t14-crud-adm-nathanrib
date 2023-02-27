import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import {
  IUserResult,
  IuserWhitoutPassword,
} from "../../interfaces/users.interfaces";
import { userSchemaWhitoutPassword } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: any,
  userID: number
): Promise<IuserWhitoutPassword> => {
  const queryStringUserExist: string = `
        SELECT * FROM users WHERE id = $1;
    `;

  const queryConfigUserExists: QueryConfig = {
    text: queryStringUserExist,
    values: [userID],
  };

  const queryResultUserExists = await client.query(queryConfigUserExists);

  if (queryResultUserExists.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  const queryStringVerifyMail: string = `
        SELECT * FROM users WHEREemail = $1;
    `;
  const QueryConfigVerifyMail: QueryConfig = {
    text: queryStringVerifyMail,
    values: [queryResultUserExists.rows[0].email],
  };

  const queryResultVerifyMail = await client.query(QueryConfigVerifyMail);
  if (queryResultVerifyMail.rowCount > 0) {
    throw new AppError("this email is already in use", 409);
  }

  const queryString = format(
    `
        UPDATE  users SET (%I) = ROW(%L) WHERE id = $1 RETURNING *;
        `,
    Object.keys(userData),
    Object.values(userData)
  );
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [queryResultUserExists.rows[0].id],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  const newUser = userSchemaWhitoutPassword.parse(queryResult.rows[0]);

  return newUser;
};

export default updateUserService;
