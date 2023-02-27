import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email(),
  password: z.string().transform((password) => {
    return hashSync(password, 10);
  }),
  admin: z.boolean(),
});

const userSchema = createUserSchema.extend({
  id: z.number(),
  active: z.boolean(),
});

const userUpdateSchema = createUserSchema.partial();

const userSchemaWhitoutPassword = userSchema.omit({ password: true });

const allUsersSchema = z.array(userSchemaWhitoutPassword);

export {
  createUserSchema,
  userSchema,
  userSchemaWhitoutPassword,
  allUsersSchema,
  userUpdateSchema,
};
