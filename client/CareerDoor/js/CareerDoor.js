import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { bindActionCreators } from 'redux'
import * as COLOR from './utils/colors'
import { addListener } from './navigation/redux'
import Home from './components/screens/Home'
import Settings from './components/screens/Settings'
import QuestionDetail from './components/screens/QuestionDetail'
import Questions from './components/screens/Questions'
import BookmarkQuestions from './components/screens/BookmarkQuestions'
import * as Actions from './actions/Filter'

/**
TODO: FIX ANDROID BACK BUTTON
* */

const HomeStack = StackNavigator({
  Home: { screen: Home },
  Questions: { screen: Questions },
  QuestionDetail: { screen: QuestionDetail },
},{
  navigationOptions:{
    headerStyle: {
      // backgroundColor: COLOR.lightBlue500,
     // backgroundColor: COLOR.yellow50,
    },
    // headerTintColor: '#fff',
    // headerTintColor: COLOR.lightBlue600,
    headerTitleStyle: {
      fontFamily: 'Roboto-Bold',
    }
  }
});

const SettingsStack = StackNavigator({
  Settings: { screen: Settings }
},
  {
    navigationOptions:{
      headerStyle: {
        backgroundColor: COLOR.lightBlue500,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Roboto-Bold',
      }
    }
  })


const LibraryStack = StackNavigator({
  MyBookmarks: { screen: BookmarkQuestions, navigationOptions: { title: 'Bookmarks' } },
  MyBookmarksDetail: { screen: QuestionDetail }
},
  {
    navigationOptions:{
      headerStyle: {
        // backgroundColor: COLOR.lightBlue500,
      },
     // headerTintColor: COLOR.white,
      headerTitleStyle: {
        fontFamily: 'Roboto-Bold',
      }
    }
  })

const tabBarConfiguration = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : '-outline'}`
      } else if (routeName === 'Settings') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`
      } else if (routeName === 'MyLibrary') {
        iconName = `ios-book${focused ? '' : '-outline'}`
      }
      return <Ionicons name={iconName} size={28} color={tintColor} />
    }
  }),
  tabBarOptions:{
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: COLOR.blue600,
    inactiveTintColor: 'black',
    // background color is for the tab component
    // activeBackgroundColor: COLOR.blue100,
    // inactiveBackgroundColor: 'white',
    labelStyle:{
      fontFamily: 'Roboto-Medium',
    },
    style: {
      backgroundColor: 'white',
    }
  }
}

export const AppNavigator = TabNavigator({
  Home: { screen: HomeStack, navigationOptions: { title: 'Home' } },
  MyLibrary: { screen: LibraryStack, navigationOptions: { title: 'My Library' } },
  Settings: { screen: SettingsStack, navigationOptions: { title: 'About' } }

}, tabBarConfiguration)

class CareerDoor extends React.Component {

  componentDidMount() {
    this.props.loadFilter()
  }

  _onFilterSelect = (value) => {
    this.props.onFilterUpdate(value)
  }

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener,
    });

    const { currentSelectedFilter, filterOptions } = this.props.filter
    const filterProps = {
      filterTitle : currentSelectedFilter,
      filterOptions,
      filterOnSelect: this._onFilterSelect
    }

    return (
      <AppNavigator
        navigation={navigation}
        // all these props get passed to all child screens from here
        screenProps={{ title: currentSelectedFilter, filterProps,  onRetry: this.props.loadFilter }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.Navigation,
  filter: state.HomeFilter
});

const mapDispatchToProps = dispatch => (
   Object.assign({ dispatch }, bindActionCreators(Actions, dispatch))
);

export default connect(mapStateToProps, mapDispatchToProps)(CareerDoor);
