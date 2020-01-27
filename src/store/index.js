import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchAPIMiddleware } from '@/actions/makeActionCreator';
import rootReducer from '../reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middlewares = [thunkMiddleware, fetchAPIMiddleware];

if (
  process.env.NODE_ENV === 'development' &&
  process.env.TARO_ENV !== 'quickapp'
) {
   middlewares.push(require('redux-logger').createLogger());
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export function configStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}

export default configStore();