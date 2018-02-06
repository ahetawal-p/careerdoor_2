import { combineReducers } from 'redux'
import Companies from './Companies'
import Navigation from './Navigation'

export default combineReducers({
  Companies,
  Navigation
})

// import { REHYDRATE } from 'redux-persist';
// const reducers =  combineReducers({
//   Companies
//
// })
//
// const createRehydrateRootReducer = reducer => (state, action) => {
//   if (action.type === REHYDRATE) {
//     return { ...state, ...action.payload, rehidrate: true };
//   }
//   return reducer(state, action);
// };
//
// export default createRehydrateRootReducer(reducers);
