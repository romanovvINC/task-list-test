import { $api } from '@/shared/api/api'

export const fetchDeleteTodo = async (id: number) => {
  try {
    const response = await $api.delete(`/todos/${id}`);

    if (!response.data) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return new Error();
  }
};

export default fetchDeleteTodo;
