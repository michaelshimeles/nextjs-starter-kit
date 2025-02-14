# Next.js 15 Starter Kit

A modern, feature-rich starter template for building production-ready applications with Next.js 15, Tailwind CSS, and TypeScript.

![Next Starter Kit](https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c)

## Features

### Core Technologies
- ⚡ **Next.js 15** - The latest version with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📘 **TypeScript** - Type-safe code
- 🔒 **Authentication** - Clerk integration with persistent authorization toggle
- 🎭 **Shadcn/ui** - Beautiful and accessible components
- 💾 **Convex DB** - Real-time database with built-in file storage and serverless functions
- 💳 **Polar.sh** - Open-source solution for managing subscriptions and payments

### Performance Optimizations
- 🚀 **Route Prefetching** - Instant page transitions for dashboard, playground, and auth pages
- 🖼️ **Optimized Images** - Eager loading for critical images
- 🌓 **Dark/Light Mode** - System-aware theme switching with custom gradients
- 📱 **Responsive Design** - Mobile-first approach
- 🔄 **Real-time Updates** - Powered by Convex DB's real-time capabilities

### Developer Experience
- 🧩 **Component Library** - Pre-built, customizable components
- 🎮 **AI Playground** - Built-in AI chat interface
- 📊 **Dashboard Template** - Ready-to-use admin interface with subscription management
- 🔍 **SEO Optimized** - Meta tags and sitemap generation

## Convex DB Integration

To set up your Convex database, visit: [https://convex.link/rasmicstarter](https://convex.link/rasmicstarter)

## Quick Start

> For detailed setup instructions, please refer to the complete setup guide and video tutorial sections below.

1. Clone the repository:
```bash
git clone https://github.com/michaelshimeles/nextjs-starter-kit.git
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Convex
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=
CONVEX_ADMIN_KEY=

# Polar.sh
POLAR_WEBHOOK_SECRET=

# Frontend
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: AI Integration
OPENAI_API_KEY=
```

5. Run the development server:
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
├── app/
│   ├── (auth)/         # Authentication routes
│   ├── (marketing)/    # Marketing pages
│   ├── api/           # API routes
│   ├── dashboard/     # Dashboard pages
│   └── playground/    # AI Playground
├── components/
│   ├── homepage/     # Landing page components
│   ├── shared/       # Shared UI components
│   └── wrapper/      # Layout wrappers and navigation
├── config/           # Configuration files
├── convex/          # Convex DB schema and functions
├── lib/             # Utility functions
├── public/          # Static assets
│   ├── images/      # Image assets
│   └── svg/         # SVG assets
└── styles/          # Global styles
```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier

## Setup Tutorial

Watch this video for a complete walkthrough of setting up the starter kit:

[![Next.js Starter Kit Setup Tutorial](https://img.youtube.com/vi/UzpGzbDQP7k/maxresdefault.jpg)](https://www.youtube.com/watch?v=UzpGzbDQP7k)

The video covers:
- Complete setup process from start to finish
- Authentication setup with Clerk
- Database setup with Convex
- Payment integration with Polar.sh
- Local development with ngrok
- Testing the subscription flow
- Troubleshooting common issues

## Setup Guide

### 1. Initial Setup
1. Clone the repository:
```bash
git clone https://github.com/michaelshimeles/nextjs-starter-kit.git
```

2. Install dependencies:
```bash
bun install
```

3. Create environment variables file:
```bash
cp .env.example .env.local
```

### 2. Service Setup

#### Clerk Authentication
1. Go to [clerk.com](https://clerk.com) and create a new project
2. Name your project (e.g., "next-starter")
3. Select authentication methods (Email and Google recommended)
4. Copy these environment variables to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```
5. Go to JWT Templates in Clerk dashboard
6. Create a new template selecting Convex
7. Copy the issuer URL for the next step
8. **Important**: Click Save on the JWT template

#### Convex Backend
1. Run the following command to create a new Convex project:
```bash
npx convex dev
```
2. When prompted, create a new project and name it in the Convex dashboard
3. The command will automatically add the `NEXT_PUBLIC_CONVEX_URL` to your `.env.local`
4. Add these environment variables in the Convex dashboard:
   - `CLERK_SIGNING_KEY` (from Clerk JWT issuer URL)
   - `FRONTEND_URL` (your app URL, will be set in Local Development)
   - `POLAR_ACCESS_TOKEN` (will get this in next step)
   - `POLAR_WEBHOOK_SECRET` (will get this in Polar setup)

#### Polar.sh Payments
1. Go to [sandbox.polar.sh](https://sandbox.polar.sh) for testing (use this instead of production polar.sh)
2. Create a new organization
3. Create a new product:
   - Set name and description
   - Add monthly pricing (e.g., $12/month)
   - Add yearly pricing (e.g., $100/year)
   - Copy the product ID and price IDs (click the three dots next to the product)
4. Generate an access token:
   - Go to Settings
   - Create new access token with full permissions
   - Set no expiration date for testing
   - Add the token to Convex environment variables as `POLAR_ACCESS_TOKEN`
5. Set up webhook:
   - Go to Settings > Webhooks
   - Add endpoint: Your Convex HTTP Actions URL + `/payment-webhook`
     - Find your Convex HTTP Actions URL in the Convex dashboard under "Settings > URL & Deploy Key"
     - It looks like: `https://<your-deployment-id>.convex.site`
     - The final webhook URL should be: `https://<your-deployment-id>.convex.site/payment-webhook`
   - Select "Raw" format
   - Select all event types
   - Click "Generate" to create a webhook secret
   - Copy the webhook secret
   - Add it to Convex environment variables as `POLAR_WEBHOOK_SECRET`
   - Click "Create" to save the webhook

### 3. Database Setup
When you run `npx convex dev`, these tables will be automatically created:
- `users`: Stores user information
- `subscriptions`: Stores subscription details
- `plans`: Stores your product plans
- `webhookEvents`: Tracks webhook events from Polar

In your Convex dashboard, add a plan to the `plans` table:
```json
{
  "description": "<your-description>",
  "key": "pro",
  "name": "<your-plan-name>",
  "polarProductId": "<your-product-id>",
  "prices": {
    "month": {
      "usd": {
        "amount": "<monthly-amount>",
        "polarId": "<monthly-price-id>"
      }
    },
    "year": {
      "usd": {
        "amount": "<yearly-amount>",
        "polarId": "<yearly-price-id>"
      }
    }
  }
}
```

### 4. Development vs Production Setup

#### Local Development
1. Install [ngrok](https://ngrok.com/) for local webhook testing
2. Start the development server:
```bash
bun run dev
```
3. In a new terminal, run ngrok:
```bash
ngrok http 3000
```
4. Copy the ngrok URL (e.g., `https://xxxx-xx-xx-xxx-xx.ngrok.io`)
5. Set this URL as `FRONTEND_URL` in your Convex environment variables

#### Production Setup
When deploying to production:
1. Replace the `FRONTEND_URL` in Convex environment variables with your production URL
2. Update the webhook URL in Polar.sh dashboard to use your production Convex URL
3. Consider creating a new organization in production Polar.sh instead of sandbox

### 5. AI Playground Setup (Optional)
Add these environment variables to `.env.local` to enable the AI chat feature:
```env
OPENAI_API_KEY=your_key
DEEPSEEK_API_KEY=your_key
GROQ_API_KEY=your_key
```

### Testing Your Setup
1. Start the development server and visit [http://localhost:3000](http://localhost:3000)
2. Try signing up and accessing the dashboard
3. Test the subscription flow with these test card details:
   - Card number: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3 digits for CVC
   - Any name and address
4. After subscribing:
   - Check the Convex dashboard's Data section
   - Verify that the `subscriptions` table has been updated
   - Check the `webhookEvents` table for successful webhook delivery
5. Test subscription cancellation:
   - Go to dashboard settings
   - Cancel your subscription
   - Verify that you lose access to protected routes
   - Check that the subscription status is updated in Convex

### Troubleshooting
1. If subscription isn't working:
   - Verify webhook is properly configured in Polar
   - Check Convex webhook secret is correct
   - Ensure plan IDs match in Polar and Convex plans table
   - Check the `webhookEvents` table in Convex for any errors
   - Verify the `FRONTEND_URL` matches your current environment
2. If authentication isn't working:
   - Verify Clerk JWT template is saved
   - Check Clerk signing key in Convex
   - Ensure all Clerk environment variables are set correctly
3. If AI playground isn't responding:
   - Verify API keys are correctly set in environment variables
   - Check for any console errors in the browser

## Sponsors and Supporters

Special thanks to [Convex](https://www.convex.dev/) for their sponsorship and support in making this starter kit possible. Their real-time database and file storage solutions have been instrumental in creating a powerful foundation for modern web applications.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this template helpful, please give it a ⭐️ on GitHub!
