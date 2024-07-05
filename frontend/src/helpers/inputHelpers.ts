import { TargetDay } from '../types/inputTypes';
import { Tag } from '../../../shared/types/tagType';

export const validTags: Tag[] = [
  'Career',
  'Learning',
  'Physical health',
  'Creativity',
  'Social life',
  'Family',
  'Romance',
  'Friendship',
  'Personal development',
  'Spirituality',
  'Mental health',
];

const setRandomTagValue = () => {
  const randomIndex = Math.floor(Math.random() * validTags.length);
  return validTags[randomIndex];
};

export const validFrequency: number[] = [1, 2, 3, 4, 5, 6, 7];

export const colorOptions: string[] = ['#FF8B57', '#9BB1FF', '#47BE93', '#EDCB53', '#ED5353', '#BA72F3'];

export const initialTargetDaysValue: TargetDay = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
};

export const startingInputValues = {
  nameValue: '',
  colorValue: '#9BB1FF',
  statementValue: '',
  frequencyValue: 1,
  targetDaysValue: initialTargetDaysValue,
  tagValue: setRandomTagValue(),
};
