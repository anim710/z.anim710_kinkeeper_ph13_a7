# KeenKeeper 

> Your personal tool to keep tight connections. Browse, text, and nurture the relationships that make life more rich.

## Description

KeenKeeper is a friendship relationship manager that helps you stay connected with the people who matter most. Track when you last spoke, set contact goals, log interactions, and get an analytics overview of your social life.

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | UI components and state management |
| React Router DOM | Client-side routing and navigation |
| Tailwind CSS | Utility-first styling and responsive design |
| Recharts | Friendship analytics pie chart |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| Vite | Build tool |

## Key Features

1. **Friend Dashboard** — View all your friends in a grid with status indicators (On Track, Almost Due, Overdue), tags, and days since last contact.
2. **Friend Detail & Quick Check-In** — Each friend has a dedicated page with bio, relationship goal, stats, and one-click Call / Text / Video logging that creates a timeline entry with a toast notification.
3. **Timeline & Analytics** — Filterable/sortable interaction history plus a Stats page with pie chart, top contacts, and friendship health bars.

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

For Netlify: the included `public/_redirects` file handles SPA routing.
For Vercel: add a `vercel.json` with rewrites to `index.html`.

Build command: `npm run build` → output folder: `dist/`
