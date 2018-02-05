// import { REHYDRATE } from 'redux-persist';
import { combineReducers } from 'redux'
import Companies from './Companies'


export default combineReducers({
  Companies

})

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
