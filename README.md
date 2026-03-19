# 🌾 BioPaddy

**Convert agricultural waste into eco-friendly utensils.** BioPaddy connects farmers, businesses, and operations through a unified digital platform.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, Recharts, Framer Motion |
| Backend | Node.js, Express, Sequelize ORM |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |

## Quick Start

### Frontend
```bash
npm install
npm run dev        # → http://localhost:5173
```

### Backend
```bash
cd server
npm install
cp .env.example .env   # Edit with your DB credentials
npm run seed           # Populate database
npm run dev            # → http://localhost:5000
```

### Demo Logins (password: `password123`)
| Role | Login |
|------|-------|
| Admin | admin@biopaddy.com |
| Farmer | +919876543210 |
| Customer | greenplate@corp.com |

## Project Structure

```
├── src/                    # React frontend (27 pages)
│   ├── pages/farmer/       # 7 farmer pages
│   ├── pages/customer/     # 9 customer pages
│   ├── pages/admin/        # 11 admin pages
│   ├── services/           # Axios API layer
│   └── hooks/              # Custom hooks (useApi)
├── server/                 # Express backend
│   ├── src/models/         # 8 Sequelize models
│   ├── src/routes/         # 7 route files (25+ endpoints)
│   ├── src/middleware/      # JWT auth
│   └── src/seeders/        # Demo data
└── vercel.json             # Frontend deployment
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/farmer` | Register farmer |
| POST | `/api/auth/register/customer` | Register customer |
| POST | `/api/auth/login` | Login (email/phone) |
| GET | `/api/products` | Product catalog |
| POST | `/api/bookings` | Book collection slot |
| POST | `/api/orders` | Place order |
| GET | `/api/admin/dashboard` | Admin stats |

## Deploy

- **Frontend**: [Vercel](https://vercel.com) — connect this repo
- **Backend**: [Render](https://render.com) — use `server/render.yaml`
- **Database**: [Neon](https://neon.tech) — free PostgreSQL

## License

MIT
