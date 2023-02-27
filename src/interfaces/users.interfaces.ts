import { QueryResult } from "pg"
import {z} from 'zod'
import { createUserSchema, userSchema, allUsersSchema } from "../schemas/users.schemas"

type IUserRequest = z.infer<typeof createUserSchema> 
type Iuser = z.infer<typeof userSchema>
 
type IuserWhitoutPassword = Omit<Iuser, 'password'>
type IUserResult = QueryResult<IuserWhitoutPassword>
type IUserResultPassword = QueryResult<Iuser>


type IallUsersSchema = z.infer<typeof allUsersSchema>
 
export{
    IuserWhitoutPassword,
    IUserResult, 
    IUserRequest,
    Iuser,
    IallUsersSchema,
    IUserResultPassword
  }