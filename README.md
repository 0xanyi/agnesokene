# In Loving Memory of Mama Agnes Okene (1939–2026)

A memorial tribute website built to honor and celebrate the life of Mama Agnes Okene. Visitors can read her biography, browse a photo gallery, and submit heartfelt tributes and memories.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui (Radix UI), tw-animate-css
- **Database:** PostgreSQL via [Prisma 7](https://www.prisma.io/)
- **Media:** [Cloudinary](https://cloudinary.com/) (next-cloudinary)
- **Fonts:** Montserrat, Cormorant (via `next/font`)

## Features

- **Hero & Biography** – Landing page with a hero section and biography
- **Gallery** – Photo gallery with captions and categories
- **Tributes** – Public tribute submission with name, message, and optional photo
- **Admin Dashboard** – Approve/manage tributes and gallery images
- **API Routes** – REST endpoints for tributes, gallery, and admin operations

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Cloudinary account (for image uploads)

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/agnesokene"
   # Cloudinary credentials
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
   ```

3. **Run database migrations**

   ```bash
   npx prisma migrate deploy
   ```

4. **Seed the database** (optional)

   ```bash
   npx tsx prisma/seed.ts
   ```

5. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── admin/         # Admin dashboard
│   ├── api/           # API routes (admin, gallery, tributes)
│   ├── gallery/       # Gallery page
│   ├── tributes/      # Tributes page
│   ├── layout.tsx     # Root layout with navbar & footer
│   └── page.tsx       # Home page (hero, biography, tribute preview)
├── components/        # Reusable UI components
├── generated/         # Prisma generated client
└── lib/               # Utilities
prisma/
├── schema.prisma      # Database schema (Tribute, GalleryImage)
├── migrations/        # Database migrations
└── seed.ts            # Seed script
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
