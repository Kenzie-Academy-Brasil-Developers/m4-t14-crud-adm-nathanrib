import { client } from "../../database";
import { IallUsersSchema } from "../../interfaces/users.interfaces";

const readAllUsersService = async (): Promise<IallUsersSchema> => {
  const queryString = `SELECT  *  FROM users;`;
  const queryResult = await client.query(queryString);

  return queryResult.rows;
};

export default readAllUsersService;
