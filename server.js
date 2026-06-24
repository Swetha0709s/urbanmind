import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_PATH = path.resolve('db.json');
const HISTORY_LIMIT = 50;

// Default initial state
const DEFAULTS = {
    config: {
        aiMode: true,
        autoRefresh: true,
        aiOpt: true,
        predictive: true,
        maintenance: false,
        security: true,
        globalSync: true
    },
    markers: [
        { id: 1, name: 'Central District', lat: 13.0418, lng: 80.2341, traffic: 88, status: 'incident' },
        { id: 2, name: 'North Harbor', lat: 13.0033, lng: 80.2550, traffic: 42, status: 'normal' },
        { id: 3, name: 'Tech Park', lat: 13.0850, lng: 80.2101, traffic: 65, status: 'traffic' },
        { id: 4, name: 'Riverside', lat: 12.9796, lng: 80.2185, traffic: 72, status: 'traffic' },
        { id: 5, name: 'Southern Hub', lat: 12.8913, lng: 80.2241, traffic: 92, status: 'incident' }
    ],
    history: []
};

// Read database
const readDB = () => {
    try {
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULTS, null, 2), 'utf8');
            return DEFAULTS;
        }
        const raw = fs.readFileSync(DB_PATH, 'utf8');
        const db = JSON.parse(raw);
        if (!db.config) db.config = DEFAULTS.config;
        if (!db.markers) db.markers = DEFAULTS.markers;
        if (!db.history) db.history = DEFAULTS.history;
        return db;
    } catch (error) {
        console.error("Error reading db.json, using defaults:", error);
        return DEFAULTS;
    }
};

// Write database
const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing to db.json:", error);
    }
};

const WEATHER_OPTIONS = ["Sunny", "Rain", "Cloudy"];
const EVENTS_POOL = ["Concert", "Festival", "Roadwork", "VIP Movement"];

// Autonomous Simulation Tick
const tickSimulation = () => {
    try {
        const db = readDB();
        const config = db.config;
        const currentMarkers = db.markers;

        let traffic;
        let weather;
        let temperature;
        let humidity;
        let aqi;

        if (config.maintenance) {
            traffic = 20;
            weather = "Sunny";
            temperature = 22;
            humidity = 48;
            aqi = 25;
        } else {
            const targetBase = config.aiMode ? 45 : 75;
            traffic = Math.floor(Math.random() * 26) + (targetBase - 10);
            traffic = Math.min(100, Math.max(0, traffic));

            weather = WEATHER_OPTIONS[Math.floor(Math.random() * WEATHER_OPTIONS.length)];
            temperature = Math.floor(Math.random() * 15) + 22;
            humidity = Math.floor(Math.random() * 41) + 45;
            
            aqi = Math.floor(traffic * 1.6) + Math.floor(Math.random() * 20);
            if (config.aiOpt) {
                aqi = Math.max(10, aqi - 30);
            }
            aqi = Math.min(300, aqi);
        }

        let pollutionLevel = "Good";
        if (aqi > 150) pollutionLevel = "Unhealthy";
        else if (aqi > 75) pollutionLevel = "Moderate";

        const alerts = [];
        if (config.maintenance) {
            alerts.push("System Maintenance Active - AI active control bypassed");
        } else {
            if (traffic > 80) alerts.push("Heavy congestion detected in central corridors");
            if (weather === "Rain") alerts.push("Weather delay risk alert");
            if (aqi > 130) alerts.push("Elevated pollution index detected");
            if (temperature > 35) alerts.push("Heatwave warnings active");
            if (Math.random() > 0.88) alerts.push("Minor accident reported near Riverside node");
        }

        const events = [];
        if (!config.maintenance && Math.random() > 0.75) {
            events.push(EVENTS_POOL[Math.floor(Math.random() * EVENTS_POOL.length)]);
        }

        // Simulating marker updates
        const updatedMarkers = currentMarkers.map(m => {
            let t = m.traffic;
            if (config.maintenance) {
                t = 20;
            } else {
                const delta = Math.floor(Math.random() * 17) - 8;
                t = Math.min(100, Math.max(15, m.traffic + delta));
            }

            let status = 'normal';
            if (t > 80) {
                status = 'incident';
            } else if (t > 55) {
                status = 'traffic';
            }

            return { ...m, traffic: t, status };
        });

        const newTickData = {
            traffic,
            weather,
            temperature,
            humidity,
            airQualityIndex: aqi,
            pollutionLevel,
            alert: alerts.length > 0 ? alerts[0] : "All systems operational",
            allAlerts: alerts,
            events,
            markers: updatedMarkers,
            timestamp: new Date().toLocaleTimeString(),
            id: Date.now()
        };

        db.markers = updatedMarkers;
        
        // Push to history logs
        db.history.push(newTickData);
        if (db.history.length > HISTORY_LIMIT) {
            db.history.shift();
        }

        writeDB(db);
    } catch (err) {
        console.error("Error running simulation tick:", err);
    }
};

// Start autonomous simulator ticks every 5 seconds
setInterval(tickSimulation, 5000);
// Run initial tick immediately on load
tickSimulation();

// Endpoints
app.get('/urban-data', (req, res) => {
    const db = readDB();
    if (db.history.length === 0) {
        res.status(503).json({ error: "Simulator warming up. Please retry." });
        return;
    }
    res.json(db.history[db.history.length - 1]);
});

app.get('/urban-history', (req, res) => {
    const db = readDB();
    res.json(db.history);
});

app.get('/config', (req, res) => {
    const db = readDB();
    res.json(db.config);
});

app.post('/config', (req, res) => {
    try {
        const db = readDB();
        db.config = { ...db.config, ...req.body };
        writeDB(db);
        tickSimulation();
        res.json({ success: true, config: db.config });
    } catch (error) {
        res.status(500).json({ error: "Failed to update configuration." });
    }
});

app.get('/markers', (req, res) => {
    const db = readDB();
    res.json(db.markers);
});

// Toggle individual incidents manually
app.post('/markers/:id/toggle-incident', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const db = readDB();
        db.markers = db.markers.map(m => {
            if (m.id === id) {
                const newStatus = m.status === 'incident' ? 'normal' : 'incident';
                const newTraffic = newStatus === 'incident' ? 95 : 30;
                return { ...m, status: newStatus, traffic: newTraffic };
            }
            return m;
        });
        writeDB(db);
        res.json({ success: true, markers: db.markers });
    } catch (error) {
        res.status(500).json({ error: "Failed to toggle incident." });
    }
});

app.listen(PORT, () => {
    console.log(`Urban Intelligence Hub active on http://localhost:${PORT}`);
});
