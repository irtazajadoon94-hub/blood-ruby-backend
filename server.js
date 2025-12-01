// Blood Ruby Empire - Backend Server
// Handles automation, cron jobs, and API endpoints

require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { sendDailyUpdate } = require('./daily-update');
const { runMarketingCycle } = require('./marketing-bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({ 
        status: 'Blood Ruby Empire Backend Running',
        version: '1.0.0',
        uptime: process.uptime(),
        features: [
            'Daily Telegram updates',
            'Auto-marketing (Twitter/TikTok)',
            'Revenue tracking',
            'Leaderboard management'
        ]
    });
});

// Manual trigger for daily update
app.post('/trigger-update', async (req, res) => {
    try {
        await sendDailyUpdate();
        res.json({ success: true, message: 'Update sent' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Manual trigger for marketing post
app.post('/trigger-marketing', async (req, res) => {
    try {
        await runMarketingCycle();
        res.json({ success: true, message: 'Marketing post sent' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get game metrics
app.get('/metrics', (req, res) => {
    // Mock data - will connect to real DB
    res.json({
        totalRevenue: (Math.random() * 5000).toFixed(2),
        todayRevenue: (Math.random() * 500).toFixed(2),
        nftsMinted: Math.floor(Math.random() * 100),
        activePlayers: Math.floor(Math.random() * 50),
        totalPlayers: Math.floor(Math.random() * 500),
        rubiesMined: Math.floor(Math.random() * 10000)
    });
});

// Schedule daily update at 8 PM PKT (3 PM UTC)
cron.schedule('0 15 * * *', () => {
    console.log('Running daily update...');
    sendDailyUpdate();
}, {
    timezone: "Asia/Karachi"
});

// Schedule marketing posts every 4 hours
cron.schedule('0 */4 * * *', () => {
    console.log('Running marketing cycle...');
    runMarketingCycle();
});

app.listen(PORT, () => {
    console.log(`🩸 Blood Ruby Backend running on port ${PORT}`);
    console.log('📅 Daily updates scheduled for 8 PM PKT');
    console.log('📱 Marketing posts every 4 hours');
    
    // Run marketing immediately on startup
    runMarketingCycle();
});

module.exports = app;