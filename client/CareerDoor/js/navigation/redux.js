import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.Navigation,
);
const addListener = createReduxBoundAddListener('root');

export {
  navMiddleware,
  addListener,
}
