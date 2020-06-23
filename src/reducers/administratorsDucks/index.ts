import { Status, typedAction, StatusValue } from "../types";
import { AnyAction, Dispatch } from "redux";

export interface Administrator {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface AdministratorsState {
  administrators: Array<Administrator>;
  status: StatusValue;
}

const initialState: AdministratorsState = {
  administrators: [],
  status: Status.NEW,
};

const resolveGetAdministrators = (administrators: Array<Administrator>) => {
  return typedAction("FETCH_ADMINISTRATORS", { administrators });
};

const failedRequest = () => {
  return typedAction("ERROR_REQUEST");
};

type UserAction = ReturnType<typeof resolveGetAdministrators | typeof failedRequest>;

const userReducer = (state = initialState, action: UserAction): AdministratorsState => {
  switch (action.type) {
    case "FETCH_ADMINISTRATORS":
      return {
        ...state,
        status: Status.READY,
        administrators: action.payload.administrators,
      };

    case "ERROR_REQUEST":
      return {
        ...state,
        status: Status.ERROR,
      };
    default:
      return state;
  }
};

export const getAdministrators = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await fetch("https://reqres.in/api/users?page=1");
    const { data } = await response.json();
    dispatch(resolveGetAdministrators(data));
  } catch (e) {
    dispatch(failedRequest());
  }
};

export default userReducer;
