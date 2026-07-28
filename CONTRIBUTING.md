# Contributing to Hive

Thank you for your interest in contributing to Hive. This document provides guidelines for contributing effectively.

---

## Important Notice

Hive is proprietary software. By submitting a pull request, you agree that your contribution becomes part of Hive under the [Proprietary License](LICENSE). Contributing does not grant you any ownership, license, or intellectual property rights in the project.

---

## How to Contribute

### 1. Find Something to Work On

- Check the [Roadmap](ROADMAP.md) for planned features
- Look for issues labeled `good first issue` or `help wanted`
- Propose new features by opening an issue first

### 2. Set Up Your Environment

```bash
git clone https://github.com/ShravanDeb/Hive.git
cd Hive
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev
```

### 3. Create a Branch

Use descriptive branch names:

```bash
# Feature
git checkout -b feat/add-direct-messaging

# Bug fix
git checkout -b fix/notification-read-status

# Documentation
git checkout -b docs/update-readme

# Refactor
git checkout -b refactor/dashboard-components
```

### 4. Make Your Changes

- Follow the existing code style
- Write TypeScript — no `any` types unless unavoidable
- Use Tailwind for styling, not inline styles (except for dynamic values)
- Keep components small and focused
- Write meaningful variable and function names

### 5. Commit

Use conventional commits:

```bash
feat: add direct messaging between users
fix: resolve notification count not updating
docs: add environment variable descriptions
refactor: extract dashboard stats into separate component
style: improve mobile navigation spacing
```

### 6. Submit a Pull Request

Push your branch and create a pull request against `master`.

---

## Pull Request Guidelines

### Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] No TypeScript errors
- [ ] Tested on mobile and desktop viewports
- [ ] Dark mode appearance is correct
- [ ] No console errors in browser

### PR Description

Include:

- What changed and why
- Screenshots or recordings for UI changes
- Any breaking changes or migration steps
- Related issue numbers

### Code Review

All pull requests require review before merge. Expect feedback on:

- Code quality and readability
- Performance implications
- Accessibility considerations
- Edge cases and error handling

---

## Code Style

### TypeScript

```typescript
// Prefer
const projects = await prisma.project.findMany({
  where: { status: "OPEN" },
  include: { owner: true, skills: true },
});

// Avoid
const projects = await (prisma as any).project.findMany({});
```

### Components

```tsx
// One component per file
// Named exports for components
// Client components only when interactivity is needed
"use client";

export default function ProjectCard({ project }: ProjectCardProps) {
  // ...
}
```

### CSS

```tsx
// Use Tailwind classes
// Use inline styles only for dynamic values
<div className="flex items-center gap-2">
  <span style={{ color: dynamicColor }}>Text</span>
</div>
```

---

## Issue Guidelines

### Bug Reports

Include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and device information
- Screenshots if applicable

### Feature Requests

Include:

- Problem statement
- Proposed solution
- Alternatives considered
- Mockups or examples if applicable

---

## Community

- Be respectful and constructive
- Focus on technical merit
- Help others learn
- Share knowledge generously

---

Thank you for making Hive better.
