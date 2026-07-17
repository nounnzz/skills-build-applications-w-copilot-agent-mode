import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String, required: true }],
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    date: { type: String, required: true },
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new Schema({
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focusArea: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema, 'users');
export const Team = mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema, 'leaderboard');
export const Workout = mongoose.model('Workout', workoutSchema, 'workouts');
