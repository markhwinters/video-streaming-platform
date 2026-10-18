# Project guidelines

## Readable code

- Write straightforward code that a person learning the project can follow.
- Prefer clear names, small functions, and the project's existing patterns.
- Avoid clever shortcuts, unnecessary abstractions, and overly compressed code.
- Add comments only when they explain a non-obvious reason or decision.
- Keep changes focused, and explain important trade-offs in the response.

## Frontend

- Use React with TypeScript and Tailwind CSS utility classes.
- Keep reusable UI and behavior in small, clearly named components.
- Avoid custom CSS unless a feature cannot reasonably be styled with Tailwind.

## API

- Keep Express routes, database connection code, and Mongoose schemas in their
  existing folders.
- Validate inputs and return clear client errors without exposing internal
  exceptions or secrets.
- Protect account-owned data by checking ownership on every relevant request.

## Verification

- Run `npm test` from `api` for API changes.
- Run `npm run build` and `npm run lint` from `frontend` for frontend changes.
- Never read, print, or commit `.env` values.
