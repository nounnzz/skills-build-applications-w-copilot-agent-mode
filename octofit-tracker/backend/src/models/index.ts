import mongoose, { Schema, type Model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
}

interface ITeam {
  name: string;
  description: string;
  members: string[];
}

interface IActivity {
  userId: mongoose.Types.ObjectId | string;
  type: string;
  durationMinutes: number;
  date: string;
  caloriesBurned: number;
}

interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId | string;
  name: string;
  score: number;
  streak: number;
}

interface IWorkout {
  name: string;
  durationMinutes: number;
  difficulty: string;
  focusArea: string;
  description: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: String, required: true }],
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: String, required: true },
  caloriesBurned: { type: Number, required: true },
}, { timestamps: true });

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  focusArea: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema, 'users');
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema, 'teams');
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema, 'activities');
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema, 'leaderboard');
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema, 'workouts');

export type { IUser, ITeam, IActivity, ILeaderboardEntry, IWorkout };
