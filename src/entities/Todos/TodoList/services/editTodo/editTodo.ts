import { $api } from '@/shared/api/api'
import type { EditFormType } from '../../../TodoItem/model/types/todoItem';

export const fetchEditTodo = async (formData: EditFormType, id: number) => {
  console.log(formData);
  try {
    const response = await $api.patch(`/todos/${id}`, formData);
    if (!response.data) {
      throw new Error();
    }

    return response;
  } catch (error) {
    return new Error();
  }
};

export const updateCompletedTodo = async (complete: boolean, id: number) => {
  try {
    const response = await $api.patch(`/todos/${id}`, { complete: complete });
    if (!response.data) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return new Error();
  }
};
