import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/Companies'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home123',
  }

  componentDidMount() {
    this.props.loadCompanies()
  }

  render() {
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Text>Home!</Text>
      //   <Button
      //     title="Go to Settings"
      //     onPress={() => this.props.navigation.navigate('Settings')}
      //   />
      //   <Button
      //     title="Go to Questions"
      //     onPress={() => this.props.navigation.navigate('Questions')}
      //   />
      //   <Button
      //     title="Go to QuestionDetail"
      //     onPress={() => this.props.navigation.dispatch({ type: 'QuestionDetail' })}
      //   />
      // </View>
      <View style={styles.container}>
        <View style={styles.box1}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text}>2</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {

    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  box2: {
    position: 'absolute',
    top: 80,
    left: 80,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  box3: {
    position: 'absolute',
    top: 120,
    left: 120,
    width: 100,
    height: 100,
    backgroundColor: 'green'
  },
  text: {
    color: '#ffffff',
    fontSize: 80
  }
});

const mapStateToProps = state => ({
  companies: state.Companies.companies,
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
