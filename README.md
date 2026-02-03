# Blood Donation App

React + Tailwind client and Express + MongoDB backend to register donors and search by blood group, city, and availability.

## Quick start

1. **Backend**
   - `cd server`
   - `cp .env.example .env` (or create `.env`) and set `MONGO_URI`.
   - Install deps: `npm install`
   - Run: `npm run dev`

2. **Frontend**
   - `cd client`
   - Install deps: `npm install`
   - Run: `npm run dev`
   - If your API is on another host/port, create `client/.env` with `VITE_API_URL=http://localhost:5000/api` (adjust as needed).

## API
- `GET /api/donors` — query with `q`, `bloodGroup`, `city`, `state`, `available`.
- `POST /api/donors` — create donor `{ name*, bloodGroup*, phone*, city*, state*, email, available, lastDonationDate }`.
- `PUT /api/donors/:id` — update donor.

## UI
- Hero with CTA and metrics.
- Filters by blood group, availability, city, state plus free-text search.
- Donor cards with call/email quick actions.
- Registration form with availability and last donation date.

## Notes
- Requires a running MongoDB instance.
- Uses Tailwind CSS, Axios, Express, and Mongoose.
