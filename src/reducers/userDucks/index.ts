import { Status, typedAction, StatusValue } from '../types'
import { AnyAction, Dispatch } from 'redux'

export interface User {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
export interface BaseReducer {
  user: User;
  status: StatusValue;
}

const initialState: BaseReducer = {
  user: {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  },
  status: Status.NEW
};

const resolveGetUser = (data: User) => {
  return typedAction("FETCH_USER", { user: data });
};

const failedRequest = () => {
  return typedAction('ERROR_REQUEST')
}

type UserAction = ReturnType<typeof resolveGetUser | typeof failedRequest>

const userReducer = (
  state = initialState,
  action: UserAction
): BaseReducer => {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        status: Status.READY,
        user: action.payload.user,
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

export const getUser = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await fetch("https://reqres.in/api/users/2");
    const { data } = await response.json();
    dispatch(resolveGetUser(data))
  } catch (e) {
    dispatch(failedRequest())
  }
};

export default userReducer;
