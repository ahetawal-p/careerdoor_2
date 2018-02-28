import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../CareerDoor'
import * as types from '../actions/types'

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export default function reducer(state = null, action) {
  let nextState;
  switch (action.type) {
    case types.QUESTION_DETAILS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'QuestionDetail' }),
        state
      )
      break
    case types.OPEN_QUESTIONS:
      nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Questions', params: { title: action.companyName } }),
          state
        )
      break
    case types.OPEN_QUESTION_DETAIL:
      nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'QuestionDetail', params: { title: 'QuestionDetail' } }),
            state
          )
      break
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
