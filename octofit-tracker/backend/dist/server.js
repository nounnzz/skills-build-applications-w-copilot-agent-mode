import express from 'express';
import { connectToDatabase } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
const withApiContext = (payload) => ({
    apiUrl: apiBaseUrl,
    ...payload,
});
app.get('/api/health', (_req, res) => {
    res.json(withApiContext({ status: 'ok' }));
});
app.get('/api/users/', async (_req, res) => {
    const users = await User.find({}).lean();
    res.json(withApiContext({ users }));
});
app.post('/api/users/', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(withApiContext({ user }));
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await Team.find({}).lean();
    res.json(withApiContext({ teams }));
});
app.post('/api/teams/', async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json(withApiContext({ team }));
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await Activity.find({}).lean();
    res.json(withApiContext({ activities }));
});
app.post('/api/activities/', async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json(withApiContext({ activity }));
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find({}).lean();
    res.json(withApiContext({ leaderboard }));
});
app.post('/api/leaderboard/', async (req, res) => {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(withApiContext({ entry }));
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await Workout.find({}).lean();
    res.json(withApiContext({ workouts }));
});
app.post('/api/workouts/', async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json(withApiContext({ workout }));
});
async function startServer() {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
startServer();
