import { Request, Response } from 'express';
import { HabitModel } from '../models/habitModel';
import { Day } from '../interfaces/habitInterfaces';
import { getHabitsDataWithStreak, getHabitsWeeklyData } from '../utils/fetchUtils';
import { adjustDateForTimezone } from '../utils/dateUtils';

const sendHabitDashboardData = async (req: Request, res: Response) => {
  try {
    const startDate: string | undefined = req.query.startDate as string | undefined;
    const endDate: string | undefined = req.query.endDate as string | undefined;

    const [habitsWeeklyDataResult, habitsBasicDataResult] = await Promise.all([
      getHabitsWeeklyData(startDate, endDate),
      getHabitsDataWithStreak(),
    ]);

    const habitsWeeklyData = habitsWeeklyDataResult?.habitsWeeklyData;
    const habitsBasicData = habitsBasicDataResult?.habitsBasicData;

    const targetDaysMap = new Map<string, Date[]>();
    habitsWeeklyData?.forEach((date) => {
      targetDaysMap.set(date.id.toString(), date.targetDays);
    });
    const completedDaysMap = new Map<string, Date[]>();
    habitsWeeklyData?.forEach((date) => {
      completedDaysMap.set(date.id.toString(), date.completedDays);
    });

    const habitsFullData = habitsBasicData?.map((habit) => {
      const completedDays = completedDaysMap.get(habit.id.toString()) || [];
      const targetDays = targetDaysMap.get(habit.id.toString()) || [];
      return {
        id: habit.id,
        habitName: habit.habitName,
        statement: habit.statement,
        tag: habit.tag,
        color: habit.color,
        streak: habit.streak,
        targetDaysDefault: habit.targetDaysDefault,
        completedDays,
        targetDays,
      };
    });

    res.json({ habits: habitsFullData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendWeeklyHabitData = async (req: Request, res: Response) => {
  try {
    const startDate: string | undefined = req.query.startDate as string | undefined;
    const endDate: string | undefined = req.query.endDate as string | undefined;

    if (!startDate) {
      return res.status(400).json({ error: 'Missing start date query parameter' });
    } else if (!endDate) {
      return res.status(400).json({ error: 'Missing end date query parameter' });
    }

    const habitsWeeklyData = await getHabitsWeeklyData(startDate, endDate);
    res.json({ habits: habitsWeeklyData?.habitsWeeklyData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const markDayAsCompleted = async (req: Request<{ habitId: string }, {}, { date: string }>, res: Response) => {
  try {
    const { habitId } = req.params;
    const { date } = req.body;

    const parsedDate = adjustDateForTimezone(new Date(date));
    parsedDate.setUTCHours(0, 0, 0, 0);
    const habit = await HabitModel.findById(habitId);

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const dayIndex = habit.days.findIndex((day: Day) => day.date.setUTCHours(0, 0, 0, 0) === parsedDate.getTime());

    if (dayIndex > -1) {
      habit.days[dayIndex].completed = true;
    } else {
      habit.days.push({ date: parsedDate, target: false, completed: true });
    }

    await habit.save();

    res.status(200).json({ message: 'Completed day added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const unmarkDayAsCompleted = async (req: Request<{ habitId: string }, {}, { date: string }>, res: Response) => {
  try {
    const { habitId } = req.params;
    const { date } = req.body;

    const parsedDate = adjustDateForTimezone(new Date(date));
    parsedDate.setUTCHours(0, 0, 0, 0);
    const habit = await HabitModel.findById(habitId);

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const dayIndex = habit.days.findIndex((day: Day) => day.date.setUTCHours(0, 0, 0, 0) === parsedDate.getTime());

    if (dayIndex > -1) {
      if (!habit.days[dayIndex].target) {
        habit.days.splice(dayIndex, 1);
      } else {
        habit.days[dayIndex].completed = false;
      }
    }

    await habit.save();

    res.status(200).json({ message: 'Completed day deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTargetDays = async (
  req: Request<{ habitId: string }, { dateToDelete: string; dateToAdd: string }>,
  res: Response
) => {
  try {
    const { habitId } = req.params;
    const { dateToDelete, dateToAdd } = req.body;

    const parsedDateToDelete = adjustDateForTimezone(new Date(dateToDelete));
    parsedDateToDelete.setUTCHours(0, 0, 0, 0);

    const parsedDateToAdd = adjustDateForTimezone(new Date(dateToAdd));
    parsedDateToAdd.setUTCHours(0, 0, 0, 0);

    const habit = await HabitModel.findById(habitId);

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const dayIndexToDelete = habit.days.findIndex(
      (day: Day) => day.date.setUTCHours(0, 0, 0, 0) === parsedDateToDelete.getTime()
    );

    if (dayIndexToDelete > -1) {
      if (!habit.days[dayIndexToDelete].completed) {
        habit.days.splice(dayIndexToDelete, 1);
      } else {
        habit.days[dayIndexToDelete].target = false;
      }
    }

    const dayIndexToAdd = habit.days.findIndex(
      (day: Day) => day.date.setUTCHours(0, 0, 0, 0) === parsedDateToDelete.getTime()
    );

    if (dayIndexToAdd > -1) {
      habit.days[dayIndexToAdd].target = true;
    } else {
      habit.days.push({ date: parsedDateToAdd, target: true, completed: false });
    }

    await habit.save();

    res.status(200).json({ message: 'Target updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const addNewHabit = async (req: Request, res: Response) => {};

const updateHabitDetails = async (req: Request, res: Response) => {};

const deleteHabit = async (req: Request, res: Response) => {};

export default {
  sendHabitDashboardData,
  sendWeeklyHabitData,
  updateTargetDays,
  markDayAsCompleted,
  unmarkDayAsCompleted,
  addNewHabit,
  updateHabitDetails,
  deleteHabit,
};
