import { useCallback } from 'react';
import { useApi } from './useAPI';
import { Habit } from '../types/habitTypes';

interface HabitsApiResponse {
  habits: Habit[];
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
  const { data, error, loading, request } = useApi<HabitsApiResponse>();
  const createHabit = useCallback(
    (habitName: string, habitColor: string, habitActivity: string, habitTargetDays: number[], habitTag: string) => {
      request({
        endpoint: 'create-habit',
        method: 'POST',
        body: {
          habitName,
          habitColor,
          habitActivity,
          habitTargetDays,
          habitTag,
        },
      });
    },
    [request]
  );
  return { data, error, loading, createHabit };
};

// export const tryCreateNewHabit = async (
//   habitName: string,
//   habitColor: string,
//   habitActivity: string,
//   habitTargetDays: number[],
//   habitTag: string
// ) => {
//   const url = 'http://localhost:3001/flexihabit/create-habit';
//   try {
//     console.log('request received');
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         habitName,
//         habitColor,
//         habitActivity,
//         habitTargetDays,
//         habitTag,
//       }),
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     await response.json();
//   } catch (error) {
//     console.error('Error creating habit:', error);
//   }
// };
