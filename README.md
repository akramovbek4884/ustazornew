# USTA ZO'R - Next.js Application

A comprehensive platform for finding craftsmen (ustalar) and educational video courses in Uzbekistan.

## Features

- **Authentication**: Login and registration system
- **Home Page**: Search and filter craftsmen by region, city, and profession
- **Video Lessons**: Browse and watch educational videos
- **Courses**: Multiple course categories including:
  - Welding (Svarka/Payvand)
  - Plumbing (Santexnik)
  - Locksmith (Chilangar)
  - Drywall (Gipsokarton)
  - Sewing (Chevar)
  - Electrical (Elektrika)
  - Construction (Qurilish)
  - Roofing (Tom)
- **Material Calculators**: Calculate materials needed for:
  - Concrete (Beton)
  - Bricks (G'isht)
  - Tiles (Kafel)
  - Ceiling tiles (Patalog)
  - Flooring (Pol)
  - Roofing sheets (Tom)
- **Profile Management**: Edit and save user profile
- **Contact Page**: Multiple contact options with live chat
- **Certificate Test**: Take a test and receive a certificate

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The application will be available at `http://localhost:3000`

## Project Structure

```
ustazor-nextjs/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Auth page (login/register)
│   ├── home/              # Main home page
│   ├── kurslar/           # Courses listing
│   ├── darslar/           # Individual lesson pages
│   ├── calculator/        # Material calculators
│   ├── boglanish/         # Contact page
│   ├── profil/            # Profile editing
│   ├── sertifikat/        # Certificate test
│   └── baholash/          # Master rating
├── components/            # Reusable React components
├── lib/                   # Data and utilities
├── types/                 # TypeScript type definitions
├── public/                # Static assets
│   ├── img/              # Images
│   ├── video/            # Video files
│   └── Sertificat/       # Certificate template
└── tailwind.config.js    # Tailwind configuration
```

## Language

The application is in Uzbek language.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Export (for static hosting)

```bash
# Update next.config.js to add: output: 'export'
npm run build
# Deploy the 'out' folder to any static host
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- EmailJS credentials for contact form (optional)

## License

© 2025 USTA ZO'R. All rights reserved.
