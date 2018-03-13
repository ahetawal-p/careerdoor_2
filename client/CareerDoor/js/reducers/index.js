import { combineReducers } from 'redux'
import Companies from './Companies'
import Navigation from './Navigation'
import Questions from './Questions'
import Topics from './Topics'
import HomeFilter from './HomeFilter'

export default combineReducers({
  Companies,
  Questions,
  Navigation,
  Topics,
  HomeFilter
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
