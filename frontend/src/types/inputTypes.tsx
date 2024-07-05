import { Tag } from '../../../shared/types/tagType';

export type TargetDay = {
  [key: number]: boolean;
};

export interface InputValuesFormat {
  nameValue: string;
  colorValue: string;
  statementValue: string;
  frequencyValue: number;
  targetDaysValue: TargetDay;
  tagValue: Tag;
}
