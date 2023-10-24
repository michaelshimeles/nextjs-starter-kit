import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const userCreateSchema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string(),
  profile_image_url: z.string(),
  user_id: z.string(),
});

type userCreateProps = z.infer<typeof userCreateSchema>;

export const userCreate = async ({
  email,
  first_name,
  last_name,
  gender,
  profile_image_url,
  user_id,
}: userCreateProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("User")
      .insert([
        {
          email,
          first_name,
          last_name,
          gender,
          profile_image_url,
          user_id,
        },
      ])
      .select();

    if (data) return data;

    if (error) return error;
  } catch (error: any) {
    throw new Error(error.message)
  }
};
