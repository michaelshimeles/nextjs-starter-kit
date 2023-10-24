import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const template = () => {
    const supabase = createServerComponentClient({ cookies });

    try {
        
    } catch (error) {
        
    }
}