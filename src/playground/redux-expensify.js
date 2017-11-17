import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
  {
    description='', 
    note='',
    amount=0,
    createdAt=0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount, 
    createdAt
  }
});
// REMOVE_EXPENSE
const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
// SET_TEXT_FILTER
const setTextFilter = (filter = '') => ({
  type: 'SET_TEXT_FILTER',
  text: filter
})
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer - START //

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_EXPENSE':
      return [...state, action.expense];

    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !== action.id);

    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return {
            ...expense,
            ...action.updates
          }
        }else {
          return expense;
        }
      });

    default: 
      return state;
  }
};

// Expenses Reducer - END //
// Filters Reducer - START //

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type){
    case 'SET_TEXT_FILTER':
      return  {
        ...state,
        text: action.text
      }

    case 'SORT_BY_DATE':
      return{
        ...state,
        sortBy: 'date'
      }

    case 'SORT_BY_AMOUNT':
      return{
        ...state,
        sortBy: 'amount'
      }

    default: 
      return state;
  }
};

// Filters Reducer - END //

// Store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  }
));

store.subscribe(() => {
  console.log(store.getState())
});

const expenseOne = store.dispatch(addExpense({description: 'rent', amount: 100}));
const expenseTwo = store.dispatch(addExpense({description: 'car', amount: 1500}));

store.dispatch(removeExpense(expenseOne.expense.id));
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 2000, note: 'price went up' }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

const demoState = {
  expenses: [{
    id: '35456fdsdssf6',
    description: 'January rent',
    note: 'This was the final payment for that address',
    amount: 54500, //in pennies
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};