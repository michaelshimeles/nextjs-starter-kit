export default {
  providers: [
    {
      domain: process.env.NODE_ENV === 'production' ? process.env.CLERK_SIGNING_KEY : "https://trusty-rabbit-71.clerk.accounts.dev",
    },
    {
      applicationID: "convex",
    },
  ]
};