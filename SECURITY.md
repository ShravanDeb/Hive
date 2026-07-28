# Security Policy

The Hive team takes the security of our platform seriously. We appreciate your help in reporting vulnerabilities responsibly.

---

## Reporting a Vulnerability

If you discover a security vulnerability in Hive, please report it privately.

**Do not** open a public GitHub issue for security vulnerabilities.

### How to Report

Email **official.hive.collab@gmail.com** with:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (optional)

### What to Include

```
Subject: [Security] Brief description

- Vulnerability type (e.g., XSS, SQL injection, auth bypass)
- Affected endpoint or component
- Reproduction steps
- Expected vs actual behavior
- Severity assessment (Critical / High / Medium / Low)
```

---

## Response Timeline

| Stage | Timeline |
|-------|----------|
| **Acknowledgment** | Within 48 hours |
| **Initial Assessment** | Within 5 business days |
| **Fix Development** | Depends on severity (Critical: 24-72 hours, High: 1 week, Medium: 2 weeks) |
| **Disclosure** | After fix is deployed |

---

## Scope

### In Scope

- Authentication and authorization bypass
- SQL injection or database access vulnerabilities
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Server-side request forgery (SSRF)
- Remote code execution
- Privilege escalation
- Data exposure or leakage
- Denial of service vulnerabilities

### Out of Scope

- Social engineering attacks
- Denial of service via rate limiting abuse
- Issues in third-party dependencies (report to the dependency maintainer)
- UI/UX issues that do not affect security

---

## Safe Harbor

We will not pursue legal action against researchers who:

- Make a good faith effort to avoid privacy violations and data destruction
- Only interact with accounts you own or have explicit permission to test
- Do not exploit a vulnerability beyond what is necessary to prove it exists
- Report vulnerabilities promptly and do not publicly disclose until a fix is deployed

---

## Supported Versions

Security updates are applied to the latest production deployment on Vercel. Previous versions are not supported.

---

## Recognition

Security researchers who report valid vulnerabilities will be credited (with permission) in the changelog and security acknowledgments.

---

Thank you for helping keep Hive and its users safe.
