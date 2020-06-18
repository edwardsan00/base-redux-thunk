import { Status, typedAction, StatusValue } from '../types'
import { AnyAction, Dispatch } from 'redux'

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
}

export interface BaseReducer {
  users: Array<User>;
  pagination: Pagination;
  status: StatusValue;
}

const initialState: BaseReducer = {
  users: [],
  pagination: {
    page: 1,
    perPage: 5,
    total: 0,
    totalPage: 1,
  },
  status: Status.NEW
};

const resolveGetUsers = (data: Array<User>) => {
  return typedAction("FETCH_USERS", { users: data });
};

const failedRequest = () => {
  return typedAction('ERROR_REQUEST')
}

type UserAction = ReturnType<typeof resolveGetUsers | typeof failedRequest>

const userReducer = (
  state = initialState,
  action: UserAction
): BaseReducer => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        status: Status.READY,
        users: action.payload.users,
      };

    case 'ERROR_REQUEST': 
    return {
      ...state,
      status: Status.ERROR
    }
    default:
      return state;
  }
};

export const getUsers = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await fetch("https://reqres.in/api/users?page=1");
    const { data } = await response.json();
    dispatch(resolveGetUsers(data))
  } catch (e) {
    dispatch(failedRequest())
  }
};

export default userReducer;
