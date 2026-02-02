# Clickable Floor Map

A minimal, interactive, TypeScript-powered Next.js application that renders a clickable floor plan and shows shop details in a modal. The project demonstrates a small, practical example of building an interactive map UI using Next.js (app router), Tailwind CSS, and React client components.

Demo

- Run locally: `http://localhost:3000` after starting the dev server.

**Features**

- ✨ **Interactive Map**: Clickable floor plan with polygon-based shop regions defined in `src/app/page.tsx`.
- 🧭 **Shop Details Modal**: Accessible modal that shows shop metadata (name, size, status, rent status) in `src/components/ShopModal.tsx`.
- 🧩 **TypeScript-first**: Domain types in `src/components/types.ts` for predictable data modeling.
- 🎨 **Tailwind CSS**: Utility-first styling (project includes `globals.css` and Tailwind config dependency).
- ♿ **Accessible UI**: Keyboard-focusable UI elements and semantic markup where applicable.
- 📱 **Responsive**: Layout and modal are responsive and work across screen sizes.

**Tech Stack**

- Framework: `Next.js` (app router)
- Language: `TypeScript`
- UI: `React` 19
- Styling: `Tailwind CSS` (devDependency `tailwindcss`)
- Icons: `lucide-react`
- Deployment: Vercel (recommended)

Project Structure

/
├── `src/app/`           # Next.js app router pages and layout
│   ├── `page.tsx`      # Main page; contains shop data & map rendering
│   └── `layout.tsx`    # Root layout (fonts, global styles)
├── `src/components/`   # Reusable UI components
│   ├── `ShopModal.tsx` # Modal displaying shop details
│   └── `types.ts`      # TypeScript interfaces (Shop, PolygonPoint)
├── `public/`           # Static assets (images, icons)
├── `next.config.ts`    # Next.js configuration
├── `tsconfig.json`     # TypeScript config
└── `package.json`      # Scripts & dependencies

Getting Started

**Prerequisites**

- Node.js >= 18
- npm (or yarn/pnpm)

**Installation**

Open a terminal in the project root and run:

```powershell
npm install
```

**Run development server**

```powershell
npm run dev
# Open http://localhost:3000
```

**Build for production**

```powershell
npm run build
npm run start
```

Project Details & Content Management

- Data source: The shop data is defined inline in `src/app/page.tsx` as a `SHOPS` array of `Shop` objects (see `src/components/types.ts`). Each shop includes a `polygon` describing clickable coordinates on the floor plan.
- Adding a new shop:
	- Add or update an object in the `SHOPS` array in `src/app/page.tsx`.
	- Provide `id`, `name`, `size`, `status` (`rented` or `vacant`), `rentStatus` (`paid`, `unpaid`, or `n/a`), and `polygon` coordinates.
	- Coordinates are objects with `{ x, y }` and should match the image/map coordinate system used in the page.

Scripts

- `npm run dev` Runs the Next.js development server.
- `npm run build` Builds the app for production.
- `npm run start` Starts the production server after build.
- `npm run lint` Runs ESLint.

Build & Deployment

Vercel (recommended):

- Push to GitHub/GitLab/Bitbucket and import the repo in Vercel.
- Vercel will run `npm install` and `npm run build` automatically.

Manual deployment:

```powershell
npm run build
npm run start
```

Configuration Files

- `next.config.ts` Next.js configuration
- `tsconfig.json` TypeScript compiler settings
- `tailwind.config.mjs` / `postcss.config.mjs` Tailwind + PostCSS (tailwind is a devDependency)

Notes on SEO & Accessibility

- Root layout uses `next/font` to load Google fonts; add page-specific `metadata` (Open Graph/Twitter) in route files via Next.js `metadata` export when needed.
- Use semantic HTML and provide `alt` text for images when adding assets to `public/`.

Troubleshooting

- If you hit TypeScript path-resolution issues, ensure `tsconfig.json` paths align with imports that use `@/*`.
- If Tailwind utilities don't appear, confirm PostCSS/Tailwind config are present and `globals.css` imports `@tailwind base; @tailwind components; @tailwind utilities;`.

License

- No license is specified. Add a `LICENSE` file if you want to open-source this project (MIT is common).

Credits

- Built by `umairarshad-dev`.

Want changes?

- I can: add a sample `LICENSE`, wire MDX for content, or extract the `SHOPS` data into a JSON file / API. Tell me which you'd like next.
