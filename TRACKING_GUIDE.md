# PostHog Tracking Implementation Guide

## Overview

This project implements comprehensive error tracking, success tracking, and user journey analytics using PostHog. All tracking events are captured both on the client-side and server-side to provide complete visibility into application performance and user behavior.

## Tracking Categories

### 1. Error Events

Error tracking is implemented across all critical application flows to capture and analyze failures.

#### API Errors
- `api_check_slug_error` - Slug availability check failures
- `api_check_slug_missing_param` - Missing slug parameter in requests
- `api_create_pass_error` - Pass creation API failures
- `api_create_pass_logo_fetch_error` - Logo image fetch failures
- `api_create_pass_strip_fetch_error` - Strip image fetch failures
- `api_upload_image_error` - Image upload failures
- `api_send_message_error` - Message sending failures
- `api_passkit_error` - PassKit API general errors
- `api_passkit_db_error` - Database errors in PassKit operations
- `api_passkit_template_error` - Template loading errors
- `api_passkit_image_error` - Image processing errors in PassKit
- `api_passkit_cert_error` - Certificate/key setup errors
- `api_passkit_buffer_error` - Pass buffer generation errors

#### Authentication Errors
- `auth_error` - General authentication failures
- `auth_organization_creation_error` - Organization creation failures
- `auth_session_error` - Session management errors
- `auth_webhook_error` - Webhook processing errors

#### Database Errors
- `database_error` - General database failures
- `database_connection_error` - Connection issues
- `database_query_error` - Query execution failures

#### Form/UI Errors
- `form_submission_error` - Form submission failures
- `slug_check_error` - Client-side slug validation errors
- `pass_creation_error` - Pass creation form errors
- `pass_deletion_error` - Pass deletion failures
- `organization_creation_error` - Organization setup errors
- `invitation_accept_error` - Invitation acceptance failures

#### File/Image Errors
- `image_fetch_error` - Image retrieval failures
- `image_upload_error` - Image upload processing errors
- `file_upload_error` - General file upload errors

#### System Errors
- `push_notification_error` - Push notification failures
- `apn_error` - Apple Push Notification errors
- `network_error` - Network connectivity issues
- `validation_error` - Data validation failures
- `unknown_error` - Unclassified errors

### 2. Success Events

Success tracking helps identify what's working well and measure conversion rates.

#### API Success
- `api_check_slug_success` - Successful slug checks
- `api_create_pass_success` - Successful pass creation
- `api_upload_image_success` - Successful image uploads
- `api_passkit_success` - Successful pass generation
- `api_send_message_success` - Successful message sending

#### Authentication Success
- `auth_login_success` - User login completions
- `auth_signup_success` - User registration completions
- `auth_logout_success` - User logout events
- `organization_created` - Organization setup completions
- `invitation_accepted` - Invitation acceptance completions
- `invitation_sent` - Invitation sending completions

#### Pass Operations
- `pass_created` - Pass creation completions
- `pass_updated` - Pass modification completions
- `pass_deleted` - Pass deletion completions
- `pass_installed` - Pass installation on devices
- `pass_downloaded` - Pass download events

#### User Actions
- `user_onboarded` - Onboarding flow completions
- `slug_validated` - Slug validation completions
- `image_uploaded` - Image upload completions
- `form_submitted` - Form submission completions

### 3. Performance Events

Performance tracking measures application speed and identifies bottlenecks.

- `api_response_time` - API endpoint response times
- `pass_generation_time` - Pass creation duration
- `image_processing_time` - Image processing duration
- `database_query_time` - Database operation duration
- `page_load_time` - Page loading performance
- `form_submission_time` - Form processing duration

### 4. User Journey Events

User journey tracking follows users through application flows to identify drop-off points and optimize conversion.

- Step-by-step tracking through onboarding
- Form interaction patterns
- Feature usage patterns
- Navigation flow analysis

## Implementation Details

### Server-Side Tracking

Server-side tracking is implemented using the PostHog Node.js client for API routes and server functions.

```typescript
import { trackError, ERROR_EVENTS, trackSuccess, SUCCESS_EVENTS } from "@/lib/posthog";

// Error tracking
trackError(ERROR_EVENTS.API_CREATE_PASS_ERROR, error, {
  user_id: userId,
  pass_name: passName,
  organization_id: orgId
});

// Success tracking
trackSuccess(SUCCESS_EVENTS.API_CREATE_PASS_SUCCESS, {
  user_id: userId,
  pass_name: passName,
  organization_id: orgId
});
```

### Client-Side Tracking

Client-side tracking uses the PostHog React SDK for user interactions and form submissions.

```typescript
import { usePostHog } from 'posthog-js/react';
import { ERROR_EVENTS, createClientErrorTracker } from "@/lib/posthog";

const posthog = usePostHog();
const trackError = createClientErrorTracker(posthog);

// Error tracking
trackError(ERROR_EVENTS.FORM_SUBMISSION_ERROR, error, {
  form_name: 'create_pass',
  field_name: 'logo_url'
});

// Success tracking
posthog?.capture('pass_created', {
  pass_name: passName,
  has_logo: true,
  has_barcode: false
});
```

### Performance Tracking

Performance tracking measures execution time for critical operations.

```typescript
import { createPerformanceTimer, PERFORMANCE_EVENTS } from "@/lib/posthog";

const timer = createPerformanceTimer();

// ... perform operation ...

timer.track(PERFORMANCE_EVENTS.PASS_GENERATION_TIME, {
  pass_id: passId,
  complexity: 'high'
});
```

### User Journey Tracking

User journey tracking follows users through multi-step processes.

```typescript
import { trackUserJourney } from "@/lib/posthog";

trackUserJourney('onboarding_step2_started', {
  user_id: userId,
  step: 'organization_creation'
});
```

## Event Properties

All events include standard properties for consistent analysis:

### Standard Properties
- `timestamp` - Event occurrence time
- `user_id` - User identifier (when available)
- `environment` - Development/production environment
- `user_agent` - Browser information
- `ip` - Client IP address
- `url` - Current page URL

### Error-Specific Properties
- `error_message` - Error description
- `error_stack` - Stack trace (when available)
- `error_type` - Error class/type
- `error_code` - Error code (when available)
- `error_status` - HTTP status code (for API errors)

### Context Properties
- `component` - React component name
- `action` - Specific action being performed
- `context` - Additional context information
- `organization_id` - Organization identifier
- `pass_id` - Pass identifier (for pass-related events)

## Usage Examples

### API Route Error Tracking

```typescript
export async function POST(request: NextRequest) {
  try {
    // API logic here
    const result = await createPass(data);
    
    trackSuccess(SUCCESS_EVENTS.API_CREATE_PASS_SUCCESS, {
      user_id: userId,
      pass_name: data.name,
      organization_id: data.organization_id
    });
    
    return NextResponse.json(result);
  } catch (error) {
    trackError(ERROR_EVENTS.API_CREATE_PASS_ERROR, error, {
      user_id: userId,
      pass_name: data.name,
      organization_id: data.organization_id,
      action: 'pass_creation_failed'
    });
    
    return NextResponse.json({ error: 'Failed to create pass' }, { status: 500 });
  }
}
```

### React Component Error Tracking

```typescript
export function CreatePassForm() {
  const posthog = usePostHog();
  const trackError = createClientErrorTracker(posthog);
  
  const handleSubmit = async (data) => {
    try {
      const result = await createPass(data);
      
      posthog?.capture('pass_created', {
        pass_name: data.name,
        organization_id: data.organization_id,
        has_logo: !!data.logo_url,
        component: 'create_pass_form'
      });
      
    } catch (error) {
      trackError(ERROR_EVENTS.PASS_CREATION_ERROR, error, {
        pass_name: data.name,
        organization_id: data.organization_id,
        component: 'create_pass_form',
        action: 'form_submission_failed'
      });
    }
  };
}
```

### Database Operation Tracking

```typescript
async function createPassInDatabase(passData) {
  const timer = createPerformanceTimer();
  
  try {
    const result = await db.insert(passes).values(passData);
    
    timer.track(PERFORMANCE_EVENTS.DATABASE_QUERY_TIME, {
      operation: 'insert',
      table: 'passes',
      record_count: 1
    });
    
    return result;
  } catch (error) {
    trackError(ERROR_EVENTS.DATABASE_ERROR, error, {
      operation: 'insert',
      table: 'passes',
      action: 'pass_creation_failed'
    });
    throw error;
  }
}
```

## Analytics and Monitoring

### Error Analysis
Monitor error rates and patterns using PostHog dashboards:
- Error frequency by type
- Error trends over time
- User impact analysis
- Geographic error distribution

### Performance Monitoring
Track application performance metrics:
- API response time percentiles
- Pass generation performance
- Image processing efficiency
- Database query optimization opportunities

### User Journey Analysis
Analyze user behavior and conversion:
- Onboarding completion rates
- Form abandonment points
- Feature adoption patterns
- User flow optimization opportunities

### Success Metrics
Measure application health and user satisfaction:
- API success rates
- Feature usage statistics
- User engagement metrics
- Performance improvements

## Best Practices

### Error Tracking
1. Always include relevant context in error properties
2. Use consistent event naming conventions
3. Avoid logging sensitive information
4. Include user and organization identifiers when available
5. Provide actionable error messages

### Performance Tracking
1. Track critical user journey steps
2. Measure both client and server performance
3. Include relevant context for performance analysis
4. Set up alerts for performance degradation
5. Track before and after optimization changes

### User Journey Tracking
1. Track meaningful user actions
2. Include conversion-relevant properties
3. Follow users through complete workflows
4. Identify drop-off points in multi-step processes
5. Measure feature adoption and usage patterns

### Data Privacy
1. Avoid tracking personally identifiable information
2. Use user IDs instead of email addresses
3. Comply with privacy regulations
4. Implement proper data retention policies
5. Provide opt-out mechanisms when required

## Configuration

### Environment Variables
Ensure these environment variables are set:
```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### PostHog Client Configuration
The PostHog client is configured in `/lib/posthog.ts` with:
- Error capturing enabled
- Performance monitoring enabled
- Page view tracking disabled (handled manually)
- Debug mode in development

### Event Constants
All event names are defined as constants in `/lib/posthog.ts` to ensure consistency and prevent typos.

## Troubleshooting

### Common Issues
1. **Events not appearing**: Check PostHog key and network connectivity
2. **Duplicate events**: Ensure proper event deduplication
3. **Missing context**: Verify all required properties are included
4. **Performance impact**: Monitor tracking overhead in production

### Debugging
1. Enable debug mode in development
2. Use browser network tab to verify event sending
3. Check PostHog ingestion logs
4. Verify event structure in PostHog dashboard

## Maintenance

### Regular Tasks
1. Review error patterns weekly
2. Update event properties as features change
3. Clean up unused event types
4. Monitor tracking performance impact
5. Update documentation as tracking evolves

### Event Lifecycle
1. Plan new events during feature development
2. Implement tracking during feature implementation
3. Validate events in staging environment
4. Monitor events in production
5. Archive obsolete events when features are deprecated