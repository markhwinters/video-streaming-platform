# Streamlab frontend

The frontend is a React and TypeScript app styled with Tailwind CSS.

## Development

From this folder, run:

```powershell
npm run dev
```

## Build and lint

```powershell
npm run build
npm run lint
```

Tailwind is loaded through the Vite plugin in `vite.config.ts`. Keep styles in
Tailwind utility classes in the React components; `src/index.css` is only the
Tailwind entry point.
