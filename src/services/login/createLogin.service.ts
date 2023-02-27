import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { IloginRequest } from "../../interfaces/login.interfaces";
import { IUserResultPassword } from "../../interfaces/users.interfaces";

const createLoginService = async (
  loginData: IloginRequest
): Promise<string> => {
  const queryString: string = `
        SELECT * FROM users WHERE email = $1;
    `;
  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };

  const queryResult: IUserResultPassword = await client.query(QueryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("email or password are wrong", 401);
  }

  if (!queryResult.rows[0].active) {
    throw new AppError("user account disabled", 401);
  }

  const isPasswordCorrect: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!isPasswordCorrect) {
    throw new AppError("email or password are wrong", 401);
  }

  const token = jwt.sign(
    {
      role: queryResult.rows[0].admin,
    },
    "casasacverbscxf32v",
    {
      expiresIn: "24h",
      jwtid: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default createLoginService;
