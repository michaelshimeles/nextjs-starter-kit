import { Polar } from "@polar-sh/sdk";

// Use a default token for development if the environment variable is missing
const accessToken = process.env.POLAR_ACCESS_TOKEN 

if (!accessToken) {
  throw new Error("POLAR_ACCESS_TOKEN is not configured");
}

export const polar = new Polar({
  server: "sandbox",
  accessToken: accessToken,
});
