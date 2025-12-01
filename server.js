// Blood Ruby Empire - Backend Server
// Handles automation, cron jobs, and API endpoints

require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { sendDailyUpdate } = require('./daily-update');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({ 
        status: 'Blood Ruby Empire Backend Running',
        version: '1.0.0',
        uptime: process.uptime()
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

// Schedule daily update at 8 PM PKT (3 PM UTC)
cron.schedule('0 15 * * *', () => {
    console.log('Running daily update...');
    sendDailyUpdate();
}, {
    timezone: "Asia/Karachi"
});

app.listen(PORT, () => {
    console.log(`🩸 Blood Ruby Backend running on port ${PORT}`);
    console.log('📅 Daily updates scheduled for 8 PM PKT');
});

module.exports = app;