// Error event constants
export const ERROR_EVENTS = {
  // API Errors
  API_CHECK_SLUG_ERROR: "api_check_slug_error",
  API_CHECK_SLUG_MISSING_PARAM: "api_check_slug_missing_param",
  API_CREATE_PASS_ERROR: "api_create_pass_error",
  API_CREATE_PASS_LOGO_FETCH_ERROR: "api_create_pass_logo_fetch_error",
  API_CREATE_PASS_STRIP_FETCH_ERROR: "api_create_pass_strip_fetch_error",
  API_UPLOAD_IMAGE_ERROR: "api_upload_image_error",
  API_SEND_MESSAGE_ERROR: "api_send_message_error",
  API_PASSKIT_ERROR: "api_passkit_error",
  API_PASSKIT_DB_ERROR: "api_passkit_db_error",
  API_PASSKIT_TEMPLATE_ERROR: "api_passkit_template_error",
  API_PASSKIT_IMAGE_ERROR: "api_passkit_image_error",
  API_PASSKIT_CERT_ERROR: "api_passkit_cert_error",
  API_PASSKIT_BUFFER_ERROR: "api_passkit_buffer_error",

  // Authentication Errors
  AUTH_ERROR: "auth_error",
  AUTH_ORGANIZATION_CREATION_ERROR: "auth_organization_creation_error",
  AUTH_SESSION_ERROR: "auth_session_error",
  AUTH_WEBHOOK_ERROR: "auth_webhook_error",

  // Database Errors
  DATABASE_ERROR: "database_error",
  DATABASE_CONNECTION_ERROR: "database_connection_error",
  DATABASE_QUERY_ERROR: "database_query_error",

  // Form/UI Errors
  FORM_SUBMISSION_ERROR: "form_submission_error",
  SLUG_CHECK_ERROR: "slug_check_error",
  PASS_CREATION_ERROR: "pass_creation_error",
  PASS_DELETION_ERROR: "pass_deletion_error",
  ORGANIZATION_CREATION_ERROR: "organization_creation_error",
  INVITATION_ACCEPT_ERROR: "invitation_accept_error",

  // File/Image Errors
  IMAGE_FETCH_ERROR: "image_fetch_error",
  IMAGE_UPLOAD_ERROR: "image_upload_error",
  FILE_UPLOAD_ERROR: "file_upload_error",

  // Push Notification Errors
  PUSH_NOTIFICATION_ERROR: "push_notification_error",
  APN_ERROR: "apn_error",

  // General Errors
  NETWORK_ERROR: "network_error",
  VALIDATION_ERROR: "validation_error",
  UNKNOWN_ERROR: "unknown_error",
} as const;

// Success event constants
export const SUCCESS_EVENTS = {
  // API Success
  API_CHECK_SLUG_SUCCESS: "api_check_slug_success",
  API_CREATE_PASS_SUCCESS: "api_create_pass_success",
  API_UPLOAD_IMAGE_SUCCESS: "api_upload_image_success",
  API_PASSKIT_SUCCESS: "api_passkit_success",
  API_SEND_MESSAGE_SUCCESS: "api_send_message_success",

  // Authentication Success
  AUTH_LOGIN_SUCCESS: "auth_login_success",
  AUTH_SIGNUP_SUCCESS: "auth_signup_success",
  AUTH_LOGOUT_SUCCESS: "auth_logout_success",
  ORGANIZATION_CREATED: "organization_created",
  INVITATION_ACCEPTED: "invitation_accepted",
  INVITATION_SENT: "invitation_sent",

  // Pass Operations
  PASS_CREATED: "pass_created",
  PASS_UPDATED: "pass_updated",
  PASS_DELETED: "pass_deleted",
  PASS_INSTALLED: "pass_installed",
  PASS_DOWNLOADED: "pass_downloaded",

  // User Actions
  USER_ONBOARDED: "user_onboarded",
  SLUG_VALIDATED: "slug_validated",
  IMAGE_UPLOADED: "image_uploaded",
  FORM_SUBMITTED: "form_submitted",

  // Performance Milestones
  PASS_GENERATION_COMPLETED: "pass_generation_completed",
  IMAGE_PROCESSING_COMPLETED: "image_processing_completed",
  DATABASE_OPERATION_COMPLETED: "database_operation_completed",
} as const;

// Performance tracking constants
export const PERFORMANCE_EVENTS = {
  API_RESPONSE_TIME: "api_response_time",
  PASS_GENERATION_TIME: "pass_generation_time",
  IMAGE_PROCESSING_TIME: "image_processing_time",
  DATABASE_QUERY_TIME: "database_query_time",
  PAGE_LOAD_TIME: "page_load_time",
  FORM_SUBMISSION_TIME: "form_submission_time",
} as const;

// PostHog client interface
interface PostHogClient {
  capture: (event: string, properties?: Record<string, unknown>) => void;
}

// Client-side error tracking helper (to be used with usePostHog hook)
export function createClientErrorTracker(posthog: PostHogClient | null) {
  return function trackClientError(
    eventType: string,
    error: unknown,
    properties: Record<string, unknown> = {},
  ) {
    try {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      posthog?.capture(eventType, {
        error_message: errorMessage,
        error_stack: errorStack,
        error_type:
          error instanceof Error ? error.constructor.name : typeof error,
        timestamp: new Date().toISOString(),
        user_agent:
          typeof navigator !== "undefined" ? navigator?.userAgent : undefined,
        url: typeof window !== "undefined" ? window?.location?.href : undefined,
        ...properties,
      });
    } catch (trackingError) {
      console.error("Failed to track client error:", trackingError);
    }
  };
}

// Client-side success tracking helper
export function createClientSuccessTracker(posthog: PostHogClient | null) {
  return function trackClientSuccess(
    eventType: string,
    properties: Record<string, unknown> = {},
  ) {
    try {
      posthog?.capture(eventType, {
        timestamp: new Date().toISOString(),
        user_agent:
          typeof navigator !== "undefined" ? navigator?.userAgent : undefined,
        url: typeof window !== "undefined" ? window?.location?.href : undefined,
        success: true,
        ...properties,
      });
    } catch (trackingError) {
      console.error("Failed to track client success:", trackingError);
    }
  };
}

// Client-side performance tracking helper
export function createClientPerformanceTracker(posthog: PostHogClient | null) {
  return function trackClientPerformance(
    eventType: string,
    startTime: number,
    properties: Record<string, unknown> = {},
  ) {
    try {
      const duration = Date.now() - startTime;

      posthog?.capture(eventType, {
        duration_ms: duration,
        timestamp: new Date().toISOString(),
        user_agent:
          typeof navigator !== "undefined" ? navigator?.userAgent : undefined,
        url: typeof window !== "undefined" ? window?.location?.href : undefined,
        ...properties,
      });
    } catch (trackingError) {
      console.error("Failed to track client performance:", trackingError);
    }
  };
}

// Utility to create a client-side performance timer
export function createClientPerformanceTimer() {
  const startTime = Date.now();

  return {
    startTime,
    track: (
      posthog: PostHogClient | null,
      eventType: string,
      properties: Record<string, unknown> = {},
    ) => {
      const trackPerformance = createClientPerformanceTracker(posthog);
      trackPerformance(eventType, startTime, properties);
    },
    getDuration: () => Date.now() - startTime,
  };
}

// Client-side user journey tracking
export function trackClientUserJourney(
  posthog: PostHogClient | null,
  step: string,
  properties: Record<string, unknown> = {},
) {
  try {
    posthog?.capture("user_journey_step", {
      journey_step: step,
      timestamp: new Date().toISOString(),
      user_agent:
        typeof navigator !== "undefined" ? navigator?.userAgent : undefined,
      url: typeof window !== "undefined" ? window?.location?.href : undefined,
      ...properties,
    });
  } catch (trackingError) {
    console.error("Failed to track user journey:", trackingError);
  }
}

// Utility to extract common error properties (client-side)
export function getClientErrorProperties(
  error: unknown,
  context: Record<string, unknown> = {},
) {
  return {
    error_message: error instanceof Error ? error.message : String(error),
    error_stack: error instanceof Error ? error.stack : undefined,
    error_type: error instanceof Error ? error.constructor.name : typeof error,
    error_code: error?.code,
    error_status: error?.status,
    timestamp: new Date().toISOString(),
    user_agent:
      typeof navigator !== "undefined" ? navigator?.userAgent : undefined,
    url: typeof window !== "undefined" ? window?.location?.href : undefined,
    ...context,
  };
}
