import { z } from "zod";

export type userCreateProps = z.infer<typeof userCreateSchema>;

const userCreateSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .min(3, { message: "First name is required" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .min(3, { message: "Last name is required" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});

export type userUpdateProps = z.infer<typeof userUpdateSchema>;

const userUpdateSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty({ message: "Email is required" })
    .describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});

export interface EventCreateProps {
  title: string;
  description?: string;
  location: string;
  eventDate: string;
  userId: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  location: string;
  event_date: string;
  short_code: string;
  user_id: string;
}

export interface Gift {
  id: string;
  name: string;
  price: number;
  store?: string | null;
  url?: string | null;
  is_reserved: boolean;
  event_id: string;
  guest_id?: string | null;
}

export interface GiftCreateProps {
  name: string;
  price: number;
  store?: string | null;
  url?: string | null;
  event_id: string;
}

export interface EventUpdateProps {
  eventId: string;
  userId: string;
  title?: string;
  description?: string;
  location?: string;
  eventDate?: string;
}