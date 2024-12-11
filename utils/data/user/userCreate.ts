"server only";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { userCreateProps } from "@/utils/types";

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userCreateProps) => {
  try {
    const result = db.insert(users).values({
      email,
      firstName: first_name,
      lastName: last_name,
      profileImageUrl: profile_image_url,
      userId: user_id,
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
