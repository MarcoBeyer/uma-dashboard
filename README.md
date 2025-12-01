This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Update `.env.local` with your actual values:

```env
NEXT_PUBLIC_GRAPH_API_KEY=your_api_key_here
GRAPH_API_URL=https://gateway.thegraph.com/api/your_api_key_here/subgraphs/id/your_subgraph_id
```

### Running the Development Server

First, install dependencies:

```bash
pnpm install
```

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and server-side data fetching
- `/src/helpers` - Helper functions

## Features

- **Server-Side Rendering**: All GraphQL queries are executed server-side to keep API keys secure
- **Next.js 16**: Using the latest Next.js with App Router
- **React 19**: Latest React version
- **Tailwind CSS 4**: Modern styling with Tailwind
- **TypeScript**: Full type safety
- **pnpm**: Fast and efficient package manager

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Remember to add your environment variables in the Vercel dashboard:

- `GRAPH_API_URL`

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
