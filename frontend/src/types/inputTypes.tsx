export type Tag =
  | 'Career'
  | 'Learning'
  | 'Physical health'
  | 'Creativity'
  | 'Social life'
  | 'Family'
  | 'Romance'
  | 'Friendship'
  | 'Personal development'
  | 'Spirituality'
  | 'Mental health';

export interface InputValuesFormat {
  nameValue: string;
  colorValue: string;
  activityValue: string;
  frequencyValue: number;
  targetDaysValue: number[];
  tagValue: Tag;
}
