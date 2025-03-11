import { Polar } from "@polar-sh/sdk";

// For debugging - log all environment variables
console.log("Environment variables available:", {
  NODE_ENV: process.env.NODE_ENV,
  POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN ? "[exists]" : "[missing]",
  POLAR_ORGANIZATION_ID: process.env.POLAR_ORGANIZATION_ID ? "[exists]" : "[missing]"
});

// Use a default token for development if the environment variable is missing
const accessToken = process.env.POLAR_ACCESS_TOKEN 

if (!accessToken) {
  throw new Error("POLAR_ACCESS_TOKEN is not configured");
}

export const polar = new Polar({
  server: "sandbox",
  accessToken: accessToken,
});
