export default {
  handleActions
};

function handleActions(state, action, handlers) {
  if (!handlers) return state;

  let handler = handlers[action.type];

  if (!handler) return state;

  let newState = {...state};

  handler(newState, action.payload);

  return newState;
}
