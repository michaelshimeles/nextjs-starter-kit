import { httpRouter } from "convex/server";
import {  paymentWebhook } from "./subscriptions";

const http = httpRouter();

http.route({
    path: "/payments/webhook",
    method: "POST",
    handler: paymentWebhook,
});

// Log that routes are configured
console.log("HTTP routes configured");

// Convex expects the router to be the default export of `convex/http.js`.
export default http;