import { Tag } from '../../../shared/types/tagType';
import { TargetDay } from '../types/inputTypes';
import { validTags } from './inputHelpers';

export const getTrueKeys = (targetDays: TargetDay): number[] => {
  return Object.entries(targetDays)
    .filter(([key, value]) => value)
    .map(([key]) => parseInt(key));
};

export const createTargetDaysFromKeys = (keys: number[]): TargetDay => {
  const targetDays: TargetDay = {};
  keys.forEach((key) => {
    targetDays[key] = true;
  });
  return targetDays;
};

export const isValidTag = (tag: string): tag is Tag => {
  return validTags.includes(tag as Tag);
};
