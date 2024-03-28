import express, { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
// import {isLoggedIn, validatehabit} from '../middleware';
import habits from '../controllers/habitsControllers';

const habitsRouter: Router = express.Router();

habitsRouter.route('/dashboard').get(asyncHandler(habits.sendHabitDashboardData));

habitsRouter.route('/weekly-data').get(asyncHandler(habits.sendWeeklyHabitData));

habitsRouter.route('/:habitId/mark-completed').patch(asyncHandler(habits.markDayAsCompleted));

habitsRouter.route('/:habitId/mark-uncompleted').patch(asyncHandler(habits.unmarkDayAsCompleted));

habitsRouter.route('/:habitId/target-dates').patch(asyncHandler(habits.updateTargetDays));

habitsRouter.route('/add-habit').post(asyncHandler(habits.addNewHabit));

habitsRouter
  .route('/:habitId/edit')
  .put(asyncHandler(habits.updateHabitDetails))
  .delete(asyncHandler(habits.deleteHabit));

export default habitsRouter;
