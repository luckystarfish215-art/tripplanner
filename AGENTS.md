<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

- Use Next.js 16 with the App Router, TypeScript, and Tailwind CSS.
- Build mobile-first interfaces with dark mode as the default appearance.
- Use functional React components and extract reusable UI into `src/components`.
- Prefer Server Components; add `"use client"` only when browser APIs, state, or event handlers require it.
- Keep user-facing copy in data or constants instead of inline component strings.
- Use the `@/*` import alias and keep modules focused and small.
- Keep dependencies minimal and favor built-in platform and framework capabilities.
- Place unit and integration tests in `tests`, and supporting documentation in `docs`.
