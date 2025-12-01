# Blood Ruby Empire - Backend

Automation server for Blood Ruby Empire game.

## Features
- 📅 Daily Telegram updates (8 PM PKT)
- 📊 Player metrics tracking
- 💰 Revenue monitoring
- 🏆 Leaderboard management
- 🤖 Auto-marketing bot

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Run locally:**
```bash
npm start
```

4. **Deploy to Railway (FREE):**
```bash
# Connect GitHub repo to Railway
# Set environment variables in Railway dashboard
# Auto-deploys on push
```

## Endpoints

- `GET /` - Health check
- `POST /trigger-update` - Manual daily update
- `GET /metrics` - Game metrics (coming soon)
- `GET /leaderboard` - Top players (coming soon)

## Cron Jobs

- **Daily Update**: 8 PM PKT (3 PM UTC)
- **Leaderboard Reset**: Sunday 12 PM PKT
- **Ruby Respawn**: Every hour

## Free Hosting Options

1. **Railway** (recommended) - 500 hours/month free
2. **Render** - Free tier available
3. **Fly.io** - Free tier available