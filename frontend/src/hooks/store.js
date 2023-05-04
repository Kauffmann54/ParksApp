import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const getInitialState = () => {

  return {
    locationUser: {
      data: {
        latitude: 0,
        longitude: 0
      }
    }
  };
}

const composeEnhancer = (process.env.REACT_APP_NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  reducers,
  getInitialState(),
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
  