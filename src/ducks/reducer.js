const initialState = {
  user: {},
  employees: {}
}

const GET_USER_DATA = 'GET_USER_DATA';

export function getUserData(userInfo) {
  return {
    type: GET_USER_DATA,
    payload: userInfo
  }
}
// export function moveEmployeeData()

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER_DATA:
    return Object.assign({}, state, {user: action.payload})
    default: return state
  }
}