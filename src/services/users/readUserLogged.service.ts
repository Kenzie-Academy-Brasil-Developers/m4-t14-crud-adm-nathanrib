import { client } from "../../database";
import { IallUsersSchema } from "../../interfaces/users.interfaces";

const readUserLoggedService = async (
  userReq: any
): Promise<IallUsersSchema> => {
  const queryString = `
        SELECT  * FROM users WHERE id = $1;
    `;

  const queryConfig = {
    text: queryString,
    values: [userReq.id],
  };
  const queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default readUserLoggedService;
