export interface TodoItemType {
  id: number;
  title: string;
  details: string;
  complete: boolean;
  date?: string;
}

export type EditFormType = Omit<TodoItemType, 'id' | 'complete' | 'date'>;
