import type { TodoItemType } from '@/entities/Todos'
import { $api } from '@/shared/api/api'
import { useDebounceFn } from '@vueuse/core'

export interface FetchArticlesListProps {
  search?: string;
  order?: 'desc' | 'asc';
  sort?: 'title' | 'date';
}

export const fetchTodoList  = async (props: FetchArticlesListProps) => {
  const { search, order, sort } = props;
  try {
    const response = await $api.get<TodoItemType[]>('/todos', {
      params: {
        _sort: sort ? sort : 'title',
        _order: order ,
        q: search,
      },
    });

    return response.data;
  } catch (e) {
    throw new Error();
  }
}

export const fetchToDoListDebounced = useDebounceFn((props: FetchArticlesListProps) => fetchTodoList(props), 1200);

export default fetchToDoListDebounced;
