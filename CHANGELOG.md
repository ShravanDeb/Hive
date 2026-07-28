# Changelog

All notable changes to Hive are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [0.1.0] — 2026-01-28

### Added

- Google OAuth authentication with institutional email verification (`.edu`, `.ac.in`)
- Student ID verification flow with admin review and email notifications
- Project creation, editing, and deletion
- Project explorer with search, filters (department, skills, status)
- Application system (apply to projects, accept/reject)
- Invitation system (send and respond to collaboration invitations)
- Real-time notification inbox (read, delete, mark all read)
- User profiles with skills, bio, GitHub, LinkedIn
- Admin console with:
  - User management (view, ban, delete)
  - Project management (view, delete)
  - ID verification review (approve/reject with notes)
  - Allowed email management
  - Abuse log viewer
  - Event and hackathon import
- Email notifications via Gmail SMTP:
  - Admin alerts for new ID verification requests
  - User notifications for verification results
  - Application status emails
- Dark mode with system preference detection and manual toggle
- Responsive design (mobile bottom nav, adaptive layouts)
- Cinematic landing page with GSAP ScrollTrigger pinned timeline
- Lenis smooth scrolling integration
- Auth pages with split editorial layout (login, signup, onboarding)
- Dashboard with tabs (home, projects, applications, invitations, bookmarks, events, notifications, profile, settings)
- Bookmarks system for saving projects
- Skill-based project categorization
- Abuse detection and content moderation system

### Infrastructure

- Next.js 16 with App Router and Turbopack
- TypeScript 5.x throughout
- Tailwind CSS 4.x
- Prisma 6.x ORM with Neon PostgreSQL
- Auth.js v5 (NextAuth) with JWT sessions
- GSAP 3.15 + Lenis 1.3 for animations
- Radix UI + shadcn/ui component primitives
- Lucide React icon system
- Deployed on Vercel with Neon serverless Postgres
