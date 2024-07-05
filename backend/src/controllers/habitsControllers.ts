import { Request, Response } from 'express';
import { HabitModel } from '../models/habitModel';
import { HabitDay, HabitEditData, ManageHabitRequest } from '../interfaces/habitInterfaces';
import { createInitialTargetDays, getHabitsDataWithStreak, getHabitsWeeklyData } from '../utils/fetchUtils';
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
        statement: habit.habitStatement,
        tag: habit.habitTag,
        color: habit.habitColor,
        streak: habit.streakCount,
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

    const dayIndex = habit.habitDays.findIndex(
      (day: HabitDay) => day.date.setUTCHours(0, 0, 0, 0) === parsedDate.getTime()
    );

    if (dayIndex > -1) {
      habit.habitDays[dayIndex].completed = true;
    } else {
      habit.habitDays.push({ date: parsedDate, target: false, completed: true });
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

    const dayIndex = habit.habitDays.findIndex(
      (day: HabitDay) => day.date.setUTCHours(0, 0, 0, 0) === parsedDate.getTime()
    );

    if (dayIndex > -1) {
      if (!habit.habitDays[dayIndex].target) {
        habit.habitDays.splice(dayIndex, 1);
      } else {
        habit.habitDays[dayIndex].completed = false;
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
  req: Request<{ habitId: string }, {}, { dateToDelete: string; dateToAdd: string }>,
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

    const dayIndexToDelete = habit.habitDays.findIndex(
      (day: HabitDay) => day.date.setUTCHours(0, 0, 0, 0) === parsedDateToDelete.getTime()
    );

    if (dayIndexToDelete > -1) {
      if (!habit.habitDays[dayIndexToDelete].completed) {
        habit.habitDays.splice(dayIndexToDelete, 1);
      } else {
        habit.habitDays[dayIndexToDelete].target = false;
      }
    }

    const dayIndexToAdd = habit.habitDays.findIndex(
      (day: HabitDay) => day.date.setUTCHours(0, 0, 0, 0) === parsedDateToDelete.getTime()
    );

    if (dayIndexToAdd > -1) {
      habit.habitDays[dayIndexToAdd].target = true;
    } else {
      habit.habitDays.push({ date: parsedDateToAdd, target: true, completed: false });
    }

    await habit.save();

    res.status(200).json({ message: 'Target updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const createHabit = async (req: Request<{}, {}, ManageHabitRequest>, res: Response) => {
  try {
    const { habitName, habitColor, habitStatement, targetDaysDefault, habitTag } = req.body;

    if (!habitName || !habitColor || !habitStatement || !targetDaysDefault || !habitTag) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const initialTargetDays = createInitialTargetDays(targetDaysDefault);

    const newHabit = new HabitModel({
      habitName,
      habitColor,
      habitStatement,
      habitTag,
      streakCount: 0,
      targetDaysDefault,
      habitDays: initialTargetDays,
    });

    await newHabit.save();
    res.status(201).json({ message: 'Habit created successfully', habit: newHabit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendHabitDetails = async (req: Request<{ habitId: string }, {}, {}>, res: Response) => {
  try {
    const { habitId } = req.params;
    const habit = await HabitModel.findOne({ _id: habitId });

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    const habitEditData: HabitEditData = {
      id: habit._id,
      habitName: habit.habitName,
      habitColor: habit.habitColor,
      habitStatement: habit.habitStatement,
      habitTag: habit.habitTag,
      targetDaysDefault: habit.targetDaysDefault,
    };
    res.json({ habit: habitEditData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateHabitDetails = async (req: Request<{ habitId: string }, {}, ManageHabitRequest>, res: Response) => {
  try {
    const { habitId } = req.params;
    const habit = await HabitModel.findOne({ _id: habitId });

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    const { habitName, habitColor, habitStatement, targetDaysDefault, habitTag } = req.body;

    if (!habitName || !habitColor || !habitStatement || !targetDaysDefault || !habitTag) {
      return res.status(400).json({ error: 'Missing required fields' });
    } else {
      habit.habitName = habitName;
      habit.habitStatement = habitStatement;
      habit.habitTag = habitTag;
      habit.habitColor = habitColor;
      habit.targetDaysDefault = targetDaysDefault;
    }

    await habit.save();
    res.status(201).json({ message: 'Habit updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteHabit = async (req: Request<{ habitId: string }, {}, {}>, res: Response) => {
  try {
    const { habitId } = req.params;
    const habit = await HabitModel.findOne({ _id: habitId });

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }
    await habit.deleteOne();
    res.status(201).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  sendHabitDashboardData,
  sendWeeklyHabitData,
  updateTargetDays,
  markDayAsCompleted,
  unmarkDayAsCompleted,
  createHabit,
  sendHabitDetails,
  updateHabitDetails,
  deleteHabit,
};
