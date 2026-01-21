# Security Policy

## Supported Versions

The following table outlines which versions of **Lumina Dental Care** are currently supported with security updates.

| Version | Supported |
|--------|-----------|
| Latest (main branch) | ✅ Yes |
| Older releases | ❌ No |

Only the **latest version available on the `main` branch** receives security updates.

---

## Reporting a Vulnerability

We take security seriously and appreciate responsible disclosure.

If you discover a security vulnerability, please follow the steps below:

### 📧 Contact
Report security issues **privately** by emailing:

**Email:** qovaise@gmail.com  

Please **do not** create public GitHub issues for security-related reports.

---

## What to Include in Your Report

When reporting a vulnerability, include as much detail as possible:

- A clear description of the issue
- Steps to reproduce the vulnerability
- Potential impact (data exposure, auth bypass, etc.)
- Screenshots or proof-of-concept (if applicable)

---

## Response Timeline

- **Initial response:** within 48 hours  
- **Status update:** within 3–5 business days  
- **Fix or mitigation:** as soon as reasonably possible, depending on severity

---

## Scope

This security policy applies to:

- Authentication flows (Firebase Auth)
- Protected routes and access control
- Client-side data handling
- Configuration and deployment related to this repository

The following are **out of scope**:
- Issues caused by modified or self-hosted deployments
- Vulnerabilities resulting from improper Firebase rules set by third parties
- Social engineering attacks

---

## Responsible Disclosure

We kindly request that you:
- Allow reasonable time to investigate and fix the issue
- Avoid public disclosure until a fix is released
- Act in good faith and avoid data misuse

---

## Security Notes

- Firebase API keys are **public by design** and protected via Firebase Security Rules
- Sensitive configuration values are managed using environment variables
- No credentials or secrets are intentionally stored in this repository

---

## Acknowledgements

We appreciate the efforts of security researchers and developers who help keep this project secure.

Thank you for helping improve **Lumina Dental Care**.
