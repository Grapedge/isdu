export function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export function fetchAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;

    if (!types) {
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      type: requestType,
      payload
    });

    return callAPI().then(
      response =>
        dispatch({
          payload: response.data,
          type: successType
        }),
      error =>
        dispatch({
          error,
          type: failureType
        })
    );
  };
}
