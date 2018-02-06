import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation'
import { addListener } from './navigation/redux'

import Home from './components/screens/Home'
import Settings from './components/screens/Settings'
import QuestionDetail from './components/screens/QuestionDetail'
import Questions from './components/screens/Questions'

/**
TODO: FIX ANDROID BACK BUTTON
* */

const HomeStack = StackNavigator({
  Home: { screen: Home },
  Questions: { screen: Questions },
  QuestionDetail: { screen: QuestionDetail },
});

const SettingsStack = StackNavigator({
  Settings: { screen: Settings }
})

export const AppNavigator = TabNavigator({
  Home: { screen: HomeStack },
  Settings: { screen: SettingsStack }
})

class CareerDoor extends React.Component {

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener,
    });

    return (
      <AppNavigator
        navigation={navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.Navigation,
});

export default connect(mapStateToProps)(CareerDoor);
