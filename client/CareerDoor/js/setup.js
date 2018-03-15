import React, { Component } from 'react'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Splash from './components/splash/Splash'
import CareerDoor from './CareerDoor'


export default function setup() {
  console.disableYellowBox = true;

  class App extends Component {
    constructor(props) {
      super(props);
      const { persistor, store } = configureStore();
      this.persistor = persistor;
      this.store = store;
      this.state = {
        storeCreated: false,
        dismissSplash: false
      }
      // show splash screen for 1 sec
      setTimeout(() => {
        this.setState({ dismissSplash:true })
      }, 2000);
    }

    onBeforeLift = () => {
      this.setState({ storeCreated:true })
    }

    render() {
      return (
        <Provider store={this.store}>
          <PersistGate
            onBeforeLift={this.onBeforeLift}
            persistor={this.persistor}
          >
            {this.state.dismissSplash && this.state.storeCreated ?
              <CareerDoor {...this.props} />
            :
              <Splash />
          }
          </PersistGate>
        </Provider>
      );
    }
  }
  return App
}
