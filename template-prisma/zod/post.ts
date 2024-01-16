import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteUser, UserModel } from "./index"

export const _PostModel = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.string(),
})

export interface CompletePost extends z.infer<typeof _PostModel> {
  createdBy: CompleteUser
}

/**
 * PostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const PostModel: z.ZodSchema<CompletePost> = z.lazy(() => _PostModel.extend({
  createdBy: UserModel,
}))
