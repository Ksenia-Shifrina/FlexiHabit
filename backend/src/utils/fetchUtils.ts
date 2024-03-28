import { HabitModel } from '../models/habitModel';
import { adjustDateForTimezone } from '../utils/dateUtils';
import { Day, HabitBasicData, IHabit } from '../interfaces/habitInterfaces';

export const getHabitsWeeklyData = async (startDate: string | undefined, endDate: string | undefined) => {
  try {
    if (startDate && endDate) {
      const parsedStartDate = adjustDateForTimezone(new Date(startDate));
      parsedStartDate.setUTCHours(0, 0, 0, 0);
      const parsedEndDate = adjustDateForTimezone(new Date(endDate));
      parsedEndDate.setUTCHours(23, 59, 59, 999);
      const habits = await HabitModel.aggregate([
        {
          $unwind: '$days',
        },
        {
          $match: {
            'days.date': {
              $gte: parsedStartDate,
              $lte: parsedEndDate,
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            days: { $push: '$days' },
            habitName: { $first: '$habitName' },
            statement: { $first: '$statement' },
            tag: { $first: '$tag' },
            targetDaysDefault: { $first: '$targetDaysDefault' },
          },
        },
      ]);
      const habitsWeeklyData = habits.map((habit) => {
        const completedDays = habit.days.filter((day: Day) => day.completed).map((day: Day) => day.date);
        const targetDays = habit.days.filter((day: Day) => day.target).map((day: Day) => day.date);
        return {
          id: habit._id,
          completedDays,
          targetDays,
        };
      });
      return { habitsWeeklyData };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getHabitsDataWithStreak = async () => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const habits: IHabit[] = await HabitModel.find({});
    const streakBreakDays = await HabitModel.aggregate([
      {
        $unwind: '$days',
      },
      {
        $match: {
          'days.target': true,
          'days.completed': false,
          'days.date': { $lte: today },
        },
      },
      {
        $group: {
          _id: '$_id',
          streakBreakDay: { $max: '$days.date' },
        },
      },
    ]);
    const habitStreakBreakDaysMap = new Map<string, Date>();
    streakBreakDays.forEach((streakBreakDay: { _id: string; streakBreakDay: Date }) => {
      habitStreakBreakDaysMap.set(streakBreakDay._id.toString(), streakBreakDay.streakBreakDay);
    });
    const habitsBasicData: HabitBasicData[] = [];
    habits.forEach((habit: IHabit) => {
      const streakBreakDay = habitStreakBreakDaysMap.get(habit._id.toString());
      const completedDates = habit.days.filter((day) => day.completed).map((day) => day.date);
      let streak = 0;
      if (streakBreakDay) {
        const validDates = completedDates.filter((date) => date > streakBreakDay);
        streak = validDates.length;
      }
      habitsBasicData.push({
        id: habit._id,
        streak: streak,
        habitName: habit.habitName,
        statement: habit.statement,
        tag: habit.tag,
        color: habit.color,
        targetDaysDefault: habit.targetDaysDefault,
      });
    });
    return { habitsBasicData };
  } catch (error) {
    console.error(error);
  }
};
