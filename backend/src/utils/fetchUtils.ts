import { HabitModel } from '../models/habitModel';
import { adjustDateForTimezone, calculateWeekDatesStartMonday } from '../utils/dateUtils';
import { HabitDay, HabitBasicData, IHabit, HabitEditData } from '../interfaces/habitInterfaces';

export const getHabitsWeeklyData = async (startDate: string | undefined, endDate: string | undefined) => {
  try {
    if (startDate && endDate) {
      const parsedStartDate = adjustDateForTimezone(new Date(startDate));
      parsedStartDate.setUTCHours(0, 0, 0, 0);
      const parsedEndDate = adjustDateForTimezone(new Date(endDate));
      parsedEndDate.setUTCHours(23, 59, 59, 999);
      const habits = await HabitModel.aggregate([
        {
          $unwind: '$habitDays',
        },
        {
          $match: {
            'habitDays.date': {
              $gte: parsedStartDate,
              $lte: parsedEndDate,
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            habitDays: { $push: '$habitDays' },
            habitName: { $first: '$habitName' },
            habitStatement: { $first: '$habitStatement' },
            habitTag: { $first: '$habitTag' },
            targetDaysDefault: { $first: '$targetDaysDefault' },
          },
        },
      ]);
      const habitsWeeklyData = habits.map((habit) => {
        const completedDays = habit.habitDays.filter((day: HabitDay) => day.completed).map((day: HabitDay) => day.date);
        const targetDays = habit.habitDays.filter((day: HabitDay) => day.target).map((day: HabitDay) => day.date);
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
        $unwind: '$habitDays',
      },
      {
        $match: {
          'habitDays.target': true,
          'habitDays.completed': false,
          'habitDays.date': { $lte: today },
        },
      },
      {
        $group: {
          _id: '$_id',
          streakBreakDay: { $max: '$habitDays.date' },
        },
      },
    ]);

    const habitStreakBreakDaysMap = new Map<string, { streakBreakDay: Date | null; noStreakBreaks: boolean }>();
    streakBreakDays.forEach((habitData: { _id: string; streakBreakDay: Date }) => {
      habitStreakBreakDaysMap.set(habitData._id.toString(), {
        streakBreakDay: habitData.streakBreakDay,
        noStreakBreaks: false,
      });
    });

    habits.forEach((habit) => {
      if (!habitStreakBreakDaysMap.has(habit._id.toString())) {
        habitStreakBreakDaysMap.set(habit._id.toString(), { streakBreakDay: null, noStreakBreaks: true });
      }
    });

    const habitsBasicData: HabitBasicData[] = [];
    habits.forEach((habit: IHabit) => {
      const habitData = habitStreakBreakDaysMap.get(habit._id.toString());
      const completedDates = habit.habitDays.filter((day) => day.completed).map((day) => day.date);
      let streak = 0;
      if (habitData) {
        const { streakBreakDay, noStreakBreaks } = habitData;
        if (streakBreakDay !== null) {
          const validDates = completedDates.filter((date) => date > streakBreakDay);
          streak = validDates.length;
        } else if (noStreakBreaks === true) {
          streak = completedDates.length;
        }
      }
      habitsBasicData.push({
        id: habit._id,
        streakCount: streak,
        habitName: habit.habitName,
        habitColor: habit.habitColor,
        habitStatement: habit.habitStatement,
        habitTag: habit.habitTag,
        targetDaysDefault: habit.targetDaysDefault,
      });
    });
    return { habitsBasicData };
  } catch (error) {
    console.error(error);
  }
};

export const createInitialTargetDays = (targetDaysArray: number[]): HabitDay[] => {
  const currentWeekDates = calculateWeekDatesStartMonday();
  const initialTargetDays: HabitDay[] = targetDaysArray.map((dayIndex) => {
    if (dayIndex >= 0 && dayIndex < currentWeekDates.length) {
      return {
        date: adjustDateForTimezone(currentWeekDates[dayIndex]),
        target: true,
        completed: false,
      };
    } else {
      throw new Error('Day index is out of range of the dates provided');
    }
  });
  return initialTargetDays;
};
