import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../CareerDoor'

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export default function reducer(state = null, action) {
  let nextState;
  switch (action.type) {
    case 'QuestionDetail':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'QuestionDetail' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
