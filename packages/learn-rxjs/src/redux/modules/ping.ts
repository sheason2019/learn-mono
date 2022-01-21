import { Epic } from "redux-observable";
import { filter, mapTo } from "rxjs";

export const pingEpic: Epic = (action$, state$) =>
  action$.pipe(
    filter((action) => 
      action.type === 'PING' || action.type === 'PONG'
    ),
    mapTo({ type: 'APPLY_TEXT', payload: {} }),
  );

const pingReducer = (
  state = { isPinging: false, buttonText: "PING", nowStateText: "PONG" },
  action: any
) => {
  switch (action.type) {
    case "PING":
      return { ...state, isPinging: true };
    case "PONG":
      return { ...state, isPinging: false };
    case "APPLY_TEXT":
      const newState: typeof state = {...state};
      newState.buttonText = state.isPinging ? 'PONG' : 'PING';
      newState.nowStateText = state.isPinging ? 'PING' : 'PONG';
      return newState;      
    default:
      return state;
  }
};

export default pingReducer;
