import { InitialState, StatusDefault, User } from './types'

const initialState: InitialState = {
  users: [],
  pagination: {
    page: 1,
    perPage: 5,
    total: 0,
    totalPage: 1,
  },
  status: StatusDefault.NEW
};

const FETCH_PENDING = "FETCH_PENDING";
const FAILED_PENDING = "FAILED_PENDING";

interface PayloadUser  {
  users: Array<User>
}

interface ActionFetchUsers {
  type: typeof FETCH_PENDING
  payload: PayloadUser
}


const userReducer = (state = initialState, action: ActionFetchUsers) => {
  switch (action.type) {
    case FETCH_PENDING:
      return {
        ...state,
        status: StatusDefault.READY,
        users: action.payload.users,
      };

    default:
      return state;
  }
};

export const getUsers = () => async (dispatch: any) => {
         try {
           const response = await fetch("https://reqres.in/api/users?page=1");
           const { data } = await response.json();
           console.log("getUsers -> data", data);
           dispatch({
             type: FETCH_PENDING,
             payload: {
               users: data,
             },
           });
         } catch (e) {
           dispatch({
             type: FAILED_PENDING,
             payload: {},
           });
         }
       };

export default userReducer;
