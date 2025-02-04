export default {
  providers: [
    {
      domain: process.env.CLERK_SIGNING_KEY,
      applicationID: "convex",
    },
  ]
};