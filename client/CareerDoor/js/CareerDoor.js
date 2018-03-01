import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation'
import { addListener } from './navigation/redux'

import Home from './components/screens/Home'
import Settings from './components/screens/Settings'
import QuestionDetail from './components/screens/QuestionDetail'
import Questions from './components/screens/Questions'
import BookmarkQuestions from './components/screens/BookmarkQuestions'

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

const LibraryStack = StackNavigator({
  MyBookmarks: { screen: BookmarkQuestions, navigationOptions: { title: 'Bookmarks' } },
  MyBookmarksDetail: { screen: QuestionDetail }
})

export const AppNavigator = TabNavigator({
  Home: { screen: HomeStack, navigationOptions: { title: 'Header title' } },
  MyLibrary: { screen: LibraryStack, navigationOptions: { title: 'My Library' } },
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
        // all these props get passed to all child screens from here
        screenProps={{ title: 'Home' }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.Navigation
});

export default connect(mapStateToProps)(CareerDoor);
