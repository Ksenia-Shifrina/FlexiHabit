import { Tag } from '../types/inputTypes';

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

export const startingInputValues = {
  nameValue: '',
  colorValue: '#9BB1FF',
  activityValue: '',
  frequencyValue: 1,
  targetDaysValue: [],
  tagValue: setRandomTagValue(),
};
