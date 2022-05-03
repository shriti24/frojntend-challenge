const initialState = {
  title: '',
  message: '',
  status: 'success' as const,
};
const reducer = (state = initialState, action: { payload: string; type: string }) => {
  const message = action.payload;
  switch (action.type) {
    case 'error':
      return {
        title: message,
        message: message,
        status: 'error' as const,
      };

    case 'success':
      return {
        title: message,
        message: message,
        status: 'success' as const,
      };

    default:
      return state;
  }
};
export default reducer;
