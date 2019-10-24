export default {
  handleActions
};

function handleActions(state: any, action: any, handlers: any) {
  if (!handlers) return state;

  let handler = handlers[action.type];

  if (!handler) return state;

  let newState = {...state};

  handler(newState, action.payload);

  return newState;
}
