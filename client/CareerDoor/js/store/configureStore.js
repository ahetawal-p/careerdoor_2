
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import { navMiddleware } from '../navigation/redux'

const persistConfig = {
  key: 'rooter',
  storage,
  blacklist: ['Navigation'],
  whitelist: ['Questions', 'Companies', 'Topics', 'HomeFilter']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(onComplete) {
  const middleware = [
    thunk,
    navMiddleware,
    __DEV__ && createLogger(),
  ].filter(Boolean)

  const store = createStore(
        persistedReducer,
        applyMiddleware(...middleware)
    )
  const persistor = persistStore(store, null, () => {
    if (onComplete) {
      onComplete()
    } })

  // clear storage when app is reloaded.
  if (__DEV__) {
    persistor.purge();
  }

  // if (module.hot) {
  //   module.hot.accept(() => {
  //     let nextRootReducer = require('../reducers');
  //     if (REDUX_PERSIST.active) {
  //       const persistConfig1 = REDUX_PERSIST.storeConfig;
  //       nextRootReducer = persistReducer(persistConfig1, reducers);
  //     }
  //
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return { persistor, store }
}
