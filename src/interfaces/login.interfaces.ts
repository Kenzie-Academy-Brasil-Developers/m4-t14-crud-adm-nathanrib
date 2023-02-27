
import {z} from 'zod'
import { createLoginSchema } from '../schemas/login.schemas'

type IloginRequest = z.infer<typeof createLoginSchema>

export {
    IloginRequest
}