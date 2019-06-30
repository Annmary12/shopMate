import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from  'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import thunk from 'redux-thunk';

import http from '../utils/helpers/http';

import rootReducer from './rootReducer';

const devMiddleWare = composeWithDevTools(
  applyMiddleware(
    thunk.withExtraArgument(http),
    reduxImmutableStateInvariant()
  )
);
const prodMiddleware = applyMiddleware(thunk.withExtraArgument(http));

const middleware = process.env.NODE_ENV === 'development' ? devMiddleWare : prodMiddleware;

const store = createStore(
  rootReducer,
  {},
  middleware
)

export default store;