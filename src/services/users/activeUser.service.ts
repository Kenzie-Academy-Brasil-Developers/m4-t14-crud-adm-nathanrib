import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";

const activeUserService = async (userId: number): Promise<void> => {
  let queryString: string = `
    SELECT * FROM users WHERE id = $1;
    `;
  let queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const QueryResult = await client.query(queryConfig);

  if (QueryResult.rowCount === 0) {
    throw new AppError("user not found", 404);
  }

  if (QueryResult.rows[0].active) {
    throw new AppError("user already actived", 400);
  }

  queryString = `
    UPDATE users SET "active" = true WHERE id = $1;
    `;
  queryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);
};

export default activeUserService;
