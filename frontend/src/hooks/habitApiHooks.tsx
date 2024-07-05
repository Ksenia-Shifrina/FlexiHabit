import { useCallback } from 'react';
import { useApi } from './useAPI';
import { EditHabitData, Habit } from '../types/habitTypes';

interface HabitsApiResponse {
  habits: Habit[];
}

interface HabitApiResponse {
  habit: EditHabitData;
}

interface UpdateResponse {
  message?: string;
  error?: string;
}

export const useFetchHabits = () => {
  const { data, error, loading, request } = useApi<HabitsApiResponse>();
  const fetchHabits = useCallback(
    (startDate: Date, endDate: Date) => {
      request({
        endpoint: 'dashboard',
        method: 'GET',
        queryParams: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
    },
    [request]
  );
  return { habits: data?.habits, error, loading, fetchHabits };
};

export const useFetchNewWeekHabits = () => {
  const { data, error, loading, request } = useApi<HabitsApiResponse>();
  const fetchNewWeekHabits = useCallback(
    (startDate: Date, endDate: Date) => {
      request({
        endpoint: 'weekly-data',
        method: 'GET',
        queryParams: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
    },
    [request]
  );
  return { habits: data?.habits, error, loading, fetchNewWeekHabits };
};

export const useMarkDayAsCompleted = () => {
  const { data, error, loading, request } = useApi<UpdateResponse>();
  const markDayAsCompleted = useCallback(
    (completedDate: Date, habitId: string) => {
      request({
        endpoint: ':habitId/mark-completed',
        method: 'PATCH',
        body: {
          date: completedDate.toISOString(),
        },
        pathParams: { habitId },
      });
    },
    [request]
  );
  return { data, error, loading, markDayAsCompleted };
};

export const useUnmarkDayAsCompleted = () => {
  const { data, error, loading, request } = useApi<UpdateResponse>();
  const unmarkDayAsCompleted = useCallback(
    (cancelledDate: Date, habitId: string) => {
      request({
        endpoint: ':habitId/mark-uncompleted',
        method: 'PATCH',
        body: {
          date: cancelledDate.toISOString(),
        },
        pathParams: { habitId },
      });
    },
    [request]
  );
  return { data, error, loading, unmarkDayAsCompleted };
};

export const useUpdateTargetDays = () => {
  const { data, error, loading, request } = useApi<UpdateResponse>();
  const updateTargetDays = useCallback(
    (dateToDelete: Date, dateToAdd: Date, habitId: string) => {
      request({
        endpoint: ':habitId/target-dates',
        method: 'PATCH',
        body: {
          dateToDelete: dateToDelete.toISOString(),
          dateToAdd: dateToAdd.toISOString(),
        },
        pathParams: { habitId },
      });
    },
    [request]
  );
  return { data, error, loading, updateTargetDays };
};

export const useCreateNewHabit = () => {
  const { data, error, loading, request } = useApi<UpdateResponse>();
  const createHabit = useCallback(
    (habitName: string, habitColor: string, habitStatement: string, targetDaysDefault: number[], habitTag: string) => {
      request({
        endpoint: 'create-habit',
        method: 'POST',
        body: {
          habitName,
          habitColor,
          habitStatement,
          targetDaysDefault,
          habitTag,
        },
      });
    },
    [request]
  );
  return { data, error, loading, createHabit };
};

export const useFetchHabitDetails = () => {
  const { data, error, loading, request } = useApi<HabitApiResponse>();
  const fetchHabitDetails = useCallback(
    (habitId: string) => {
      request({
        endpoint: ':habitId/edit',
        method: 'GET',
        pathParams: { habitId },
      });
    },
    [request]
  );
  return { habit: data?.habit, error, loading, fetchHabitDetails };
};

export const useUpdateHabitDetails = () => {
  const { data, error, loading, request } = useApi<UpdateResponse>();
  const updateHabitDetails = useCallback(
    (
      habitId: string,
      habitName: string,
      habitColor: string,
      habitStatement: string,
      targetDaysDefault: number[],
      habitTag: string
    ) => {
      request({
        endpoint: ':habitId/edit',
        method: 'PUT',
        pathParams: { habitId },
        body: {
          habitName,
          habitColor,
          habitStatement,
          targetDaysDefault,
          habitTag,
        },
      });
    },
    [request]
  );
  return { data, error, loading, updateHabitDetails };
};

export const useDeleteHabit = () => {
  const { data, error, loading, request } = useApi<UpdateResponse>();
  const deleteHabit = useCallback(
    (habitId: string) => {
      request({
        endpoint: ':habitId/edit',
        method: 'DELETE',
        pathParams: { habitId },
      });
    },
    [request]
  );
  return { data, error, loading, deleteHabit };
};
