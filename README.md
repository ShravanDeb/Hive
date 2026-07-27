# Hive

> **Join the hive. Build together.**

Hive is a full-stack campus collaboration platform where college students can post project ideas, discover teammates with the right skills, and collaborate — all within their campus community.

---

## Features

### Dashboard
A unified home screen that brings together everything — your projects, applications, notifications, bookmarks, recommended projects, and hackathon listings in one place. Personalized greeting, quick stats, and sidebar widgets give you a snapshot of your activity at a glance.

### Projects
- **Post your project** — Describe your idea, tag required skills (React, Python, Figma, etc.), and publish to the community
- **Discover projects** — Browse and filter by department, skill, and status (Open / Closed / Full)
- **Search** — Full-text search across project titles and descriptions
- **Project detail pages** — View full descriptions, owner profiles, skill tags, and apply to join

### Applications
- **Apply to collaborate** — Send a message to project owners explaining why you'd be a good fit
- **Accept / Reject** — Project owners can review applications and accept or reject them
- **Status tracking** — Track all your outgoing applications (Pending / Accepted / Rejected)

### People Directory
- Browse all registered users on the platform
- Filter by department, skill, and availability
- View profiles with bio, GitHub, LinkedIn, and skill tags

### Bookmarks
Save interesting projects to revisit later.

### Notifications
Real-time in-app notifications for application events — when someone applies to your project, when your application gets accepted or rejected, and system announcements. Mark as read individually or all at once.

### Profiles
- Public profiles with avatar, bio, department, year, and skill tags
- GitHub and LinkedIn links
- View a user's published projects directly from their profile

### Hackathons
Browse a curated list of upcoming hackathons with dates, locations, team sizes, prizes, and registration links.

### Admin Panel
- **Overview dashboard** — Platform-wide stats (users, projects, applications, notifications)
- **User management** — View, search, promote to admin, or delete users
- **Project management** — Browse and manage all projects
- **Hackathon management** — Add hackathons manually or bulk-import via Excel/CSV upload

### Authentication
- **Google OAuth** sign-in via Auth.js (NextAuth v5)
- **Edu-only access** — Only `.edu`, `.edu.in`, and `.ac.in` email domains are allowed
- **Onboarding flow** — New users complete their profile (name, department, year) before accessing the dashboard

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [GSAP](https://gsap.com/) + [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling |
| **UI Components** | [Magic UI](https://magicui.design/) + [React Bits](https://reactbits.dev/) |
| **Database** | PostgreSQL via [Prisma ORM](https://www.prisma.io/) |
| **Auth** | [Auth.js / NextAuth v5](https://authjs.dev/) (Google OAuth + JWT sessions) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Validation** | [Zod](https://zod.dev/) |
| **Typography** | Bricolage Grotesque (display) + Manrope (body) + Space Grotesk (mono) |

---

## Getting Started

### Prerequisites
- **Node.js** 18+
- **PostgreSQL** database (local or hosted — e.g. [Neon](https://neon.tech/), [Supabase](https://supabase.com/))
- **Google OAuth** credentials from [Google Cloud Console](https://console.cloud.google.com/)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your database URL, auth secret, and Google OAuth credentials

# 3. Set up the database
npx prisma generate
npx prisma db push

# 4. (Optional) Seed sample data
npx prisma db seed

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with a Google account that has an `.edu` email address.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Random secret for Auth.js session encryption |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `NEXTAUTH_URL` | Base URL (e.g. `http://localhost:3000`) |

---

## Project Structure

```
hive/
├── prisma/
│   ├── schema.prisma          # Database schema (11 models)
│   └── seed.ts                # Database seed script
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login, Signup, Onboarding
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # REST API routes
│   │   ├── dashboard/         # Main dashboard (tabbed views)
│   │   ├── profile/[id]/      # Public user profiles
│   │   ├── projects/          # Browse, Create, Detail
│   │   └── new-landing/       # Landing page
│   ├── components/
│   │   ├── animated/          # GSAP animation components
│   │   ├── ui/                # Magic UI + shadcn components
│   │   ├── AppShell.tsx       # Authenticated layout shell
│   │   ├── AnimatedText.tsx   # GSAP text reveal
│   │   ├── MagneticButton.tsx # Magnetic hover effect
│   │   ├── StaggerGrid.tsx    # Staggered grid animations
│   │   └── TextScramble.tsx   # Text scramble effect
│   ├── hooks/
│   │   ├── useTextReveal.ts   # GSAP text reveal hook
│   │   ├── useParallax.ts     # Parallax scroll effect
│   │   ├── useStagger.ts      # Stagger children animation
│   │   ├── useMagnetic.ts     # Magnetic cursor follow
│   │   └── useTextScramble.ts # Text scramble animation
│   └── lib/
│       ├── auth.ts            # Auth.js config
│       ├── prisma.ts          # Prisma client singleton
│       ├── utils.ts           # cn() utility
│       └── email.ts           # Email utilities
└── package.json
```

---

## Database Models

| Model | Purpose |
|-------|---------|
| **User** | Accounts with name, email, department, year, bio, skills, GitHub/LinkedIn, and role (USER/ADMIN) |
| **Project** | Project listings with title, description, status (OPEN/FULL/CLOSED), and owner |
| **Skill** | Shared skill tags — many-to-many with both Users and Projects |
| **Application** | Collaboration requests linking a User to a Project (PENDING/ACCEPTED/REJECTED) |
| **Notification** | In-app notifications for application events and system messages |
| **Bookmark** | Saved/bookmarked projects per user (composite primary key) |
| **Hackathon** | Hackathon event listings with title, date, location, team size, prize, and link |

---

## License

This is a personal project built for learning and portfolio purposes.
