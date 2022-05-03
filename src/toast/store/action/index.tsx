export const addSuccessAlert = (message: string) => {
  return (dispatch: any) => {
    dispatch({
      type: 'error',
      payload: message,
    });
  };
};

export const addErrorAlert = (message: string) => {
  return (dispatch: any) => {
    dispatch({
      type: 'error',
      payload: message,
    });
  };
};
