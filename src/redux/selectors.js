import { createSelector } from 'reselect';

export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList;

// export const todoListSelector = (state) => {
//     const searchText = searchTextSelector(state);

//     const todoRemaining = state.todoList.filter((todo) => {
//         return todo.name.includes(state.filters.search);
//     });
//     return todoRemaining;
// }

// export const searchTextSelector = (state) => state.filters.search;
//reselect
export const todosRemainingSelector = createSelector(
    todoListSelector, 
    searchTextSelector,
    filterStatusSelector,
    filterPrioritiesSelector,
    (todoList, searchText, status, priorities) => {
        return todoList.filter(
            (todo) => {
                if(status === 'All') {
                    return priorities.length ? 
                    todo.name.includes(searchText) && 
                    priorities.includes(todo.priority) : 
                    todo.name.includes(searchText);
                }

                return todo.name.includes(searchText) && 
                (status === 'Completed' ? todo.completed : !todo.completed) && 
                (priorities.length ? priorities.includes(todo.priority) : true);
            }
        );
    }
)