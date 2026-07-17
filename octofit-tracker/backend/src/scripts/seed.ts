import { connectToDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        role: 'Captain',
        fitnessGoal: 'Marathon training',
      },
      {
        name: 'Grace Hopper',
        email: 'grace@example.com',
        role: 'Member',
        fitnessGoal: 'Strength and mobility',
      },
      {
        name: 'Katherine Johnson',
        email: 'katherine@example.com',
        role: 'Coach',
        fitnessGoal: 'Consistency and endurance',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Marathon Squad',
        description: 'A fast-paced team focused on long runs and recovery.',
        members: users.slice(0, 2).map((user) => user.name),
      },
      {
        name: 'Strength Crew',
        description: 'A strength-focused team that loves HIIT and resistance work.',
        members: [users[2].name],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        date: '2026-07-17',
        caloriesBurned: 420,
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        date: '2026-07-16',
        caloriesBurned: 380,
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 40,
        date: '2026-07-15',
        caloriesBurned: 210,
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        name: users[0].name,
        score: 1320,
        streak: 7,
      },
      {
        userId: users[1]._id,
        name: users[1].name,
        score: 1180,
        streak: 4,
      },
      {
        userId: users[2]._id,
        name: users[2].name,
        score: 1250,
        streak: 6,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Blast',
        durationMinutes: 25,
        difficulty: 'Intermediate',
        focusArea: 'Cardio',
        description: 'A fast-paced interval workout designed to elevate heart rate.',
      },
      {
        name: 'Core Stability Flow',
        durationMinutes: 30,
        difficulty: 'Beginner',
        focusArea: 'Core',
        description: 'A low-impact session focused on posture and balance.',
      },
      {
        name: 'Long Run Builder',
        durationMinutes: 45,
        difficulty: 'Advanced',
        focusArea: 'Endurance',
        description: 'A steady endurance workout for race preparation.',
      },
    ]);

    console.log('Database seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
